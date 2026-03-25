/** International format, digits only (no +). */
export const WHATSAPP_PHONE_DIGITS = "919320637506";

/**
 * True for phones/tablets where WhatsApp is typically used as an app.
 * Uses UA, Chromium UA-CH when available, and iPad desktop-mode heuristics.
 */
export function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent;
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua)) {
    return true;
  }
  const nav = navigator as Navigator & { userAgentData?: { mobile?: boolean } };
  if (nav.userAgentData?.mobile) return true;
  if (navigator.maxTouchPoints > 1 && /Macintosh|Mac OS X/.test(ua)) return true;
  return false;
}

/**
 * Opens WhatsApp with a pre-filled message. Mobile: same-tab `wa.me` (deep-links to the app).
 * Desktop: WhatsApp Web in a new tab; falls back to `wa.me` if the popup is blocked.
 */
export function openWhatsAppWithMessage(
  message: string,
  phoneDigits: string = WHATSAPP_PHONE_DIGITS
): void {
  const clean = phoneDigits.replace(/\D/g, "");
  const encoded = encodeURIComponent(message);
  const waUrl = `https://wa.me/${clean}?text=${encoded}`;
  const webUrl = `https://web.whatsapp.com/send?phone=${clean}&text=${encoded}`;

  if (isMobileDevice()) {
    window.location.assign(waUrl);
    return;
  }

  const opened = window.open(webUrl, "_blank", "noopener,noreferrer");
  if (!opened) {
    window.location.assign(waUrl);
  }
}
