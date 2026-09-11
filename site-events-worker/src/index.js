const allowedEvents = new Set(["visit_start", "session_summary"]);
const exactOrigins = new Set([
  "https://kelvin-iota.vercel.app",
  "https://kelvin-cambly-works-projects.vercel.app",
]);
const previewOrigin =
  /^https:\/\/kelvin-[a-z0-9-]+-cambly-works-projects\.vercel\.app$/;

function isAllowedOrigin(origin) {
  return exactOrigins.has(origin) || previewOrigin.test(origin);
}

function corsHeaders(origin) {
  return {
    "Access-Control-Allow-Origin": isAllowedOrigin(origin) ? origin : "null",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
    Vary: "Origin",
  };
}

function clean(value, limit = 600) {
  return String(value ?? "")
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, limit);
}

function escapeHtml(value) {
  return clean(value).replace(
    /[&<>]/g,
    (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[character],
  );
}

function line(label, value) {
  const safe = clean(value);
  return safe ? `<b>${label}:</b> ${escapeHtml(safe)}` : null;
}

function duration(value) {
  const seconds = Math.max(0, Math.round(Number(value) || 0));
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return minutes ? `${minutes} мин ${rest} сек` : `${rest} сек`;
}

function locationFrom(request) {
  const cf = request.cf || {};
  return [cf.city, cf.region, cf.country].filter(Boolean).join(", ");
}

function sourceFrom(payload) {
  const campaign = payload.campaign || {};
  const tagged = [
    campaign.source,
    campaign.medium,
    campaign.campaign,
    campaign.content,
  ]
    .map((value) => clean(value))
    .filter(Boolean)
    .join(" / ");
  return tagged || clean(payload.referrer) || "Прямой переход";
}

function buildMessage(payload, request) {
  const details = payload.details || {};
  const common = [
    "<b>🧭 ВИЗИТ</b>",
    line("Сеанс", payload.visit_id),
    line("Источник", sourceFrom(payload)),
    line("Примерное гео", locationFrom(request) || "Не определено"),
    line("Устройство", [payload.device, payload.screen].filter(Boolean).join(" · ")),
    line("Язык", payload.language),
    line("Страница", payload.page),
  ];

  const summary = payload.event === "session_summary" ? [
    "<b>✅ РЕЗУЛЬТАТ</b>",
    line("Итог", details.result),
    line("Завершение", details.exit_reason),
    "",
    "<b>⏱ ВРЕМЯ</b>",
    line("Всего на сайте", duration(details.duration_seconds)),
    line("Активно", duration(details.active_seconds)),
    "",
    "<b>👀 ПРОСМОТР</b>",
    line("Прокрутка", details.max_scroll),
    line("Страницы", details.pages || "Не определены"),
    line("Разделы", details.sections || "Не определены"),
    "",
    "<b>🖱 ДЕЙСТВИЯ</b>",
    line("Что делал", details.actions || "Без кликов"),
    "",
  ] : [];

  return [
    `<b>${payload.event === "visit_start" ? "🌡 KELVIN · НОВЫЙ ВИЗИТ" : "🌡 KELVIN · ИТОГ ВИЗИТА"}</b>`,
    "",
    ...summary,
    ...common,
    "",
    `<i>${new Date().toLocaleString("ru-RU", {
      timeZone: "America/Sao_Paulo",
    })}</i>`,
  ]
    .filter((value) => value !== null && value !== undefined)
    .join("\n")
    .slice(0, 4000);
}

export default {
  async fetch(request, env) {
    const origin = request.headers.get("Origin") || "";
    const headers = corsHeaders(origin);

    if (request.method === "OPTIONS") {
      return new Response(null, {
        status: isAllowedOrigin(origin) ? 204 : 403,
        headers,
      });
    }

    const url = new URL(request.url);
    if (request.method !== "POST" || url.pathname !== "/events") {
      return new Response("Not found", { status: 404, headers });
    }
    if (!isAllowedOrigin(origin)) {
      return new Response("Forbidden", { status: 403, headers });
    }
    if (!env.TELEGRAM_BOT_TOKEN || !env.TELEGRAM_CHAT_ID) {
      return new Response("Service not configured", { status: 503, headers });
    }

    const contentLength = Number(request.headers.get("Content-Length") || 0);
    if (contentLength > 24_000) {
      return new Response("Payload too large", { status: 413, headers });
    }

    let payload;
    try {
      payload = await request.json();
    } catch {
      return new Response("Invalid JSON", { status: 400, headers });
    }

    if (!payload || !allowedEvents.has(payload.event)) {
      return new Response("Invalid event", { status: 400, headers });
    }

    const telegramResponse = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: env.TELEGRAM_CHAT_ID,
          text: buildMessage(payload, request),
          parse_mode: "HTML",
          disable_web_page_preview: true,
        }),
      },
    );

    if (!telegramResponse.ok) {
      console.error("Telegram sendMessage failed", telegramResponse.status);
      return new Response("Notification failed", { status: 502, headers });
    }

    return new Response(null, { status: 204, headers });
  },
};
