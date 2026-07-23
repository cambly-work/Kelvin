import path from "node:path";
import sharp from "sharp";

const root = process.cwd();
const assets = path.join(root, "public", "assets");
const backdrop = path.join(assets, "product-backdrop-v1.png");

const variants = [
  { input: "panel-ru-1.png", output: "product-ru-premium.png" },
  { input: "panel-pt-1.png", output: "product-pt-premium.png" },
];

const canvasWidth = 1200;
const canvasHeight = 900;
const panelWidth = 390;
const panelHeight = 800;
const panelX = Math.round((canvasWidth - panelWidth) / 2);
const panelY = 50;

const frame = Buffer.from(`
  <svg width="${canvasWidth}" height="${canvasHeight}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <filter id="shadow" x="-60%" y="-40%" width="220%" height="220%">
        <feDropShadow dx="0" dy="34" stdDeviation="34" flood-color="#000" flood-opacity=".72"/>
        <feDropShadow dx="0" dy="0" stdDeviation="24" flood-color="#58a6ff" flood-opacity=".15"/>
      </filter>
      <linearGradient id="frame" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".13"/>
        <stop offset=".42" stop-color="#9ed4ff" stop-opacity=".035"/>
        <stop offset="1" stop-color="#fff" stop-opacity=".065"/>
      </linearGradient>
    </defs>
    <rect
      x="${panelX - 14}"
      y="${panelY - 14}"
      width="${panelWidth + 28}"
      height="${panelHeight + 28}"
      rx="34"
      fill="#080b10"
      fill-opacity=".82"
      stroke="url(#frame)"
      stroke-width="2"
      filter="url(#shadow)"
    />
  </svg>
`);

const mask = Buffer.from(`
  <svg width="${panelWidth}" height="${panelHeight}" xmlns="http://www.w3.org/2000/svg">
    <rect width="${panelWidth}" height="${panelHeight}" rx="22" fill="#fff"/>
  </svg>
`);

const polish = Buffer.from(`
  <svg width="${canvasWidth}" height="${canvasHeight}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="shine" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#fff" stop-opacity=".18"/>
        <stop offset=".23" stop-color="#fff" stop-opacity=".015"/>
        <stop offset=".55" stop-color="#fff" stop-opacity="0"/>
      </linearGradient>
      <radialGradient id="ground" cx="50%" cy="50%" r="50%">
        <stop offset="0" stop-color="#58a6ff" stop-opacity=".16"/>
        <stop offset="1" stop-color="#58a6ff" stop-opacity="0"/>
      </radialGradient>
    </defs>
    <ellipse cx="600" cy="850" rx="265" ry="35" fill="url(#ground)"/>
    <rect
      x="${panelX}"
      y="${panelY}"
      width="${panelWidth}"
      height="${panelHeight}"
      rx="22"
      fill="url(#shine)"
    />
  </svg>
`);

for (const variant of variants) {
  const panel = await sharp(path.join(assets, variant.input))
    .resize({ width: panelWidth })
    .extract({ left: 0, top: 0, width: panelWidth, height: panelHeight })
    .composite([{ input: mask, blend: "dest-in" }])
    .png()
    .toBuffer();

  await sharp(backdrop)
    .resize(canvasWidth, canvasHeight, { fit: "cover" })
    .composite([
      { input: frame },
      { input: panel, left: panelX, top: panelY },
      { input: polish },
    ])
    .png({ compressionLevel: 9, adaptiveFiltering: true })
    .toFile(path.join(assets, variant.output));
}

console.log(`Created ${variants.map(({ output }) => output).join(", ")}`);
