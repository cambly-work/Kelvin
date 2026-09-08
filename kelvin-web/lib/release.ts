import config from "@/public/release.json";

/** Manual DMG distribution is separate from Sparkle's signed update feed. */
export function googleDriveDownloadUrl(value: string): string | null {
  if (!value.trim()) return null;
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.hostname !== "drive.google.com" || url.username || url.password || url.port) return null;
    const filePath = /^\/file\/d\/[a-zA-Z0-9_-]+\/view\/?$/;
    const openFile = url.pathname === "/open" && /^[a-zA-Z0-9_-]+$/.test(url.searchParams.get("id") ?? "");
    return filePath.test(url.pathname) || openFile ? url.href : null;
  } catch {
    return null;
  }
}

export const release = {
  version: config.version,
  minOS: config.minOS,
  downloadUrl: googleDriveDownloadUrl(config.googleDriveUrl),
};
