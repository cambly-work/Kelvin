"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

const EVENTS_ENDPOINT =
  "https://kelvin-site-events.cambly-studio.workers.dev/events";
const MAX_ACTIONS = 24;
const MAX_SECTIONS = 24;

type VisitSession = {
  id: string;
  startedAt: number;
  activeStartedAt: number | null;
  activeMs: number;
  maxScroll: number;
  pages: string[];
  sections: string[];
  actions: string[];
  outcome: string;
  summarySent: boolean;
  startSent: boolean;
};

let currentSession: VisitSession | null = null;

function compact(value: unknown, limit = 240) {
  return String(value ?? "").replace(/\s+/g, " ").trim().slice(0, limit);
}

function addUnique(items: string[], value: string, limit: number) {
  const clean = compact(value);
  if (clean && !items.includes(clean) && items.length < limit) items.push(clean);
}

function getSession() {
  if (currentSession) return currentSession;
  currentSession = {
    id:
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID().slice(0, 8)
        : Math.random().toString(36).slice(2, 10),
    startedAt: Date.now(),
    activeStartedAt:
      document.visibilityState === "visible" ? performance.now() : null,
    activeMs: 0,
    maxScroll: 0,
    pages: [],
    sections: [],
    actions: [],
    outcome: "Ушёл без перехода к загрузке",
    summarySent: false,
    startSent: false,
  };
  return currentSession;
}

function campaign() {
  const params = new URLSearchParams(window.location.search);
  return {
    source: compact(params.get("utm_source")),
    medium: compact(params.get("utm_medium")),
    campaign: compact(params.get("utm_campaign")),
    content: compact(params.get("utm_content")),
  };
}

function referrerHost() {
  try {
    return document.referrer
      ? new URL(document.referrer).hostname.slice(0, 160)
      : "";
  } catch {
    return "";
  }
}

function deviceType() {
  if (matchMedia("(max-width: 640px)").matches) return "mobile";
  if (matchMedia("(max-width: 1024px)").matches) return "tablet";
  return "desktop";
}

function payload(event: "visit_start" | "session_summary", details = {}) {
  const session = getSession();
  return {
    event,
    visit_id: session.id,
    page: location.pathname.slice(0, 500),
    referrer: referrerHost(),
    language: compact(navigator.language, 40),
    device: deviceType(),
    screen: `${window.innerWidth}×${window.innerHeight}`,
    campaign: campaign(),
    details,
  };
}

function send(event: "visit_start" | "session_summary", details = {}) {
  return fetch(EVENTS_ENDPOINT, {
    method: "POST",
    mode: "cors",
    keepalive: true,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload(event, details)),
  }).catch(() => null);
}

function stopActiveTimer(session: VisitSession) {
  if (session.activeStartedAt === null) return;
  session.activeMs += performance.now() - session.activeStartedAt;
  session.activeStartedAt = null;
}

function summary(session: VisitSession, reason: string) {
  stopActiveTimer(session);
  return {
    duration_seconds: Math.max(
      1,
      Math.round((Date.now() - session.startedAt) / 1000),
    ),
    active_seconds: Math.max(0, Math.round(session.activeMs / 1000)),
    max_scroll: `${session.maxScroll}%`,
    pages: session.pages.join(" → "),
    sections: session.sections.join(" → "),
    actions: session.actions.join(" → "),
    result: session.outcome,
    exit_reason: reason,
  };
}

function sendSummary(session: VisitSession, reason: string) {
  if (session.summarySent) return;
  session.summarySent = true;
  const body = JSON.stringify(payload("session_summary", summary(session, reason)));

  try {
    if (
      navigator.sendBeacon?.(
        EVENTS_ENDPOINT,
        new Blob([body], { type: "text/plain;charset=UTF-8" }),
      )
    ) {
      return;
    }
  } catch {
    // Fall through to a keepalive request.
  }

  void fetch(EVENTS_ENDPOINT, {
    method: "POST",
    mode: "cors",
    keepalive: true,
    headers: { "Content-Type": "text/plain;charset=UTF-8" },
    body,
  }).catch(() => null);
}

function clickLabel(target: HTMLElement) {
  return compact(
    target.getAttribute("aria-label") ||
      target.getAttribute("title") ||
      target.textContent,
    100,
  );
}

export default function SiteVisitReporter() {
  const pathname = usePathname();
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const session = getSession();

    if (!session.startSent) {
      session.startSent = true;
      void send("visit_start");
    }

    const updateScroll = () => {
      const height = Math.max(document.documentElement.scrollHeight, 1);
      const depth = Math.min(
        100,
        Math.round(((scrollY + innerHeight) / height) * 100),
      );
      session.maxScroll = Math.max(session.maxScroll, depth);
    };

    const onVisibility = () => {
      if (document.visibilityState === "hidden") {
        stopActiveTimer(session);
      } else if (session.activeStartedAt === null) {
        session.activeStartedAt = performance.now();
      }
    };

    const onClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement | null)?.closest<HTMLElement>(
        "a[href], button",
      );
      if (!target) return;

      const label = clickLabel(target);
      const link = target instanceof HTMLAnchorElement ? target : null;
      const href = link?.getAttribute("href") ?? "";
      const isDownload =
        href.includes("drive.google.com") ||
        /скач|download|baixar/i.test(`${label} ${href}`);
      const safeTarget =
        label || (href.startsWith("/") ? href.split(/[?#]/)[0] : "Ссылка");

      addUnique(
        session.actions,
        `${isDownload ? "Загрузка" : "Клик"}: ${safeTarget}`,
        MAX_ACTIONS,
      );
      if (isDownload) session.outcome = "Перешёл к загрузке Kelvin";
    };

    const onPageHide = () => sendSummary(session, "Закрыл или покинул сайт");
    const onBeforeUnload = () => sendSummary(session, "Закрыл или обновил сайт");

    updateScroll();
    addEventListener("scroll", updateScroll, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);
    document.addEventListener("click", onClick, true);
    addEventListener("pagehide", onPageHide, { once: true });
    addEventListener("beforeunload", onBeforeUnload, { once: true });

    return () => {
      removeEventListener("scroll", updateScroll);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("click", onClick, true);
      removeEventListener("pagehide", onPageHide);
      removeEventListener("beforeunload", onBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const session = getSession();
    addUnique(session.pages, pathname, MAX_SECTIONS);
    observerRef.current?.disconnect();

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          const section = entry.target as HTMLElement;
          const heading = section.querySelector("h1, h2");
          const label =
            section.dataset.trackSection ||
            section.id ||
            heading?.textContent ||
            "Раздел";
          addUnique(session.sections, label, MAX_SECTIONS);
        }
      },
      { threshold: 0.18 },
    );

    observerRef.current = observer;
    document.querySelectorAll("main section").forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
