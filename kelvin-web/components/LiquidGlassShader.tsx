"use client";

import { useEffect, useRef } from "react";

const vertexShader = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform vec2 u_resolution;
  uniform vec2 u_pointer;
  uniform float u_time;
  uniform float u_active;

  float roundedBoxSDF(vec2 p, vec2 b, float r) {
    vec2 q = abs(p) - b + r;
    return min(max(q.x, q.y), 0.0) + length(max(q, 0.0)) - r;
  }

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = (uv - 0.5) * vec2(aspect, 1.0);
    vec2 pointer = (u_pointer - 0.5) * vec2(aspect, 1.0);

    // Keep the optical edge well inside the canvas. Drawing at the exact
    // canvas boundary makes antialiasing look clipped at rounded corners.
    float box = roundedBoxSDF(p, vec2(aspect * 0.5 - 0.055, 0.445), 0.27);
    float innerEdge = 1.0 - smoothstep(0.004, 0.052, abs(box + 0.024));
    float outerEdge = 1.0 - smoothstep(0.002, 0.026, abs(box));

    float pointerGlow = exp(-length(p - pointer) * 2.45);
    float sweep = 0.5 + 0.5 * sin(
      p.x * 5.2 - p.y * 3.1 + u_time * 0.46 + sin(p.y * 8.0) * 0.35
    );
    float liquid = 0.5 + 0.5 * sin(
      p.x * 9.0 + p.y * 6.0 - u_time * 0.32 + sin(p.x * 3.0 + u_time * 0.2)
    );
    float grain = hash21(floor(gl_FragCoord.xy * 0.5) + floor(u_time * 8.0));

    vec3 cool = vec3(0.20, 0.72, 1.0);
    vec3 warm = vec3(1.0, 0.32, 0.68);
    vec3 pearl = vec3(0.72, 0.58, 1.0);
    vec3 spectrum = mix(cool, warm, smoothstep(0.1, 0.9, uv.x + sin(uv.y * 5.0) * 0.12));
    spectrum = mix(spectrum, pearl, liquid * 0.34);

    float lensDepth = smoothstep(0.12, -0.08, box);
    float broadCaustic = pow(max(0.0, sweep * liquid), 2.2) * lensDepth;
    float rim = outerEdge * (0.18 + pointerGlow * 0.5 + sweep * 0.16);
    float refractionLight = innerEdge * (0.055 + liquid * 0.075) * u_active;
    float surfaceLight = pointerGlow * 0.065 * lensDepth * u_active;
    float causticLight = broadCaustic * 0.045 * u_active;
    float alpha = rim + refractionLight + surfaceLight + causticLight + grain * 0.005;

    vec3 color = spectrum * rim;
    color += vec3(0.74, 0.90, 1.0) * refractionLight;
    color += vec3(0.42, 0.68, 1.0) * surfaceLight;
    color += mix(vec3(0.22, 0.56, 1.0), vec3(0.76, 0.42, 1.0), uv.x) * causticLight;

    float mask = 1.0 - smoothstep(-0.004, 0.024, box);
    gl_FragColor = vec4(color, alpha * mask);
  }
`;

export default function LiquidGlassShader({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      antialias: false,
      premultipliedAlpha: true,
      powerPreference: "low-power",
    });
    if (!gl) {
      canvas.dataset.fallback = "true";
      return;
    }

    const compile = (type: number, source: string) => {
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vertex = compile(gl.VERTEX_SHADER, vertexShader);
    const fragment = compile(gl.FRAGMENT_SHADER, fragmentShader);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "u_resolution");
    const pointer = gl.getUniformLocation(program, "u_pointer");
    const time = gl.getUniformLocation(program, "u_time");
    const activeUniform = gl.getUniformLocation(program, "u_active");
    const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
    const pointerTarget = { x: 0.5, y: 0.5 };
    const pointerCurrent = { x: 0.5, y: 0.5 };
    let frame = 0;
    let visible = true;
    let settleUntil = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.round(rect.width * dpr));
      const height = Math.max(1, Math.round(rect.height * dpr));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointerTarget.x = (event.clientX - rect.left) / rect.width;
      pointerTarget.y = 1 - (event.clientY - rect.top) / rect.height;
      settleUntil = performance.now() + 500;
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const onPointerLeave = () => {
      pointerTarget.x = 0.5;
      pointerTarget.y = 0.5;
      settleUntil = performance.now() + 500;
      if (!frame) frame = requestAnimationFrame(draw);
    };
    const onVisibility = () => {
      visible = !document.hidden;
      if (visible && !frame) frame = requestAnimationFrame(draw);
    };

    const draw = (now: number) => {
      frame = 0;
      resize();
      pointerCurrent.x += (pointerTarget.x - pointerCurrent.x) * 0.075;
      pointerCurrent.y += (pointerTarget.y - pointerCurrent.y) * 0.075;
      gl.uniform2f(resolution, canvas.width, canvas.height);
      gl.uniform2f(pointer, pointerCurrent.x, pointerCurrent.y);
      gl.uniform1f(time, reducedMotion.matches ? 0 : now * 0.001);
      gl.uniform1f(activeUniform, active ? 1 : 0.42);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      // A continuously running WebGL loop for a small header is wasteful and
      // can monopolize the main thread on low-power devices. Animate only
      // while the pointer highlight is settling, then keep the last frame.
      if (visible && !reducedMotion.matches && now < settleUntil) {
        frame = requestAnimationFrame(draw);
      }
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);
    canvas.parentElement?.addEventListener("pointermove", onPointerMove);
    canvas.parentElement?.addEventListener("pointerleave", onPointerLeave);
    document.addEventListener("visibilitychange", onVisibility);
    frame = requestAnimationFrame(draw);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      canvas.parentElement?.removeEventListener("pointermove", onPointerMove);
      canvas.parentElement?.removeEventListener("pointerleave", onPointerLeave);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
    };
  }, [active]);

  return (
    <canvas
      ref={canvasRef}
      className="liquid-glass-shader absolute inset-0 h-full w-full rounded-[inherit]"
      aria-hidden="true"
    />
  );
}
