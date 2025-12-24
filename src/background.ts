import type { AppMessage, CookieSyncResponse } from "./shared/messages";

chrome.runtime.onInstalled.addListener(() => {
  console.log("[imi] extension installed");
});

const isIpAddress = (hostname: string) => {
  if (!hostname) return false;
  const ipv4 = /^(\d{1,3}\.){3}\d{1,3}$/;
  if (ipv4.test(hostname)) return true;
  return hostname.includes(":");
};

const normalizeDomain = (input: string) => {
  const trimmed = input.trim().toLowerCase();
  if (!trimmed) return null;
  const withScheme = trimmed.includes("://") ? trimmed : `https://${trimmed}`;
  try {
    const url = new URL(withScheme);
    return url.hostname || null;
  } catch {
    return null;
  }
};

const buildDomainCandidates = (hostname: string) => {
  if (!hostname) return [];
  if (hostname === "localhost" || isIpAddress(hostname)) return [hostname];
  const parts = hostname.split(".").filter(Boolean);
  if (parts.length <= 2) return [hostname];
  const candidates = [hostname];
  const remainder = [...parts];
  while (remainder.length > 2) {
    remainder.shift();
    candidates.push(remainder.join("."));
  }
  return candidates;
};

const matchesCookieDomain = (cookieDomain: string, expectedDomain: string) =>
  cookieDomain === expectedDomain || cookieDomain === `.${expectedDomain}`;

const isSameOrParentDomain = (targetDomain: string, currentHostname: string) =>
  targetDomain === currentHostname || currentHostname.endsWith(`.${targetDomain}`);

const findCookieForDomainLevels = async (url: URL, name: string) => {
  const candidates = buildDomainCandidates(url.hostname);
  for (const domain of candidates) {
    const cookies = await chrome.cookies.getAll({
      url: `${url.protocol}//${domain}/`,
      name
    });
    const matched = cookies.find((cookie) => matchesCookieDomain(cookie.domain, domain));
    if (matched) return { cookie: matched, sourceDomain: domain };
  }
  return null;
};

const handleCookieSync = async (
  targetDomainInput: string,
  cookieKey: string
): Promise<CookieSyncResponse> => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (!tab?.url) {
    return { ok: false, message: "未找到当前 tab 的网址" };
  }

  let url: URL;
  try {
    url = new URL(tab.url);
  } catch {
    return { ok: false, message: "当前 tab 网址不可用" };
  }

  if (url.protocol !== "http:" && url.protocol !== "https:") {
    return { ok: false, message: "当前 tab 不是网页，无法同步 cookie" };
  }

  const targetDomain = normalizeDomain(targetDomainInput);
  if (!targetDomain) {
    return { ok: false, message: "同步域名不合法" };
  }

  if (isSameOrParentDomain(targetDomain, url.hostname)) {
    return { ok: false, message: "目标域名不能影响当前页面 cookie" };
  }

  const found = await findCookieForDomainLevels(url, cookieKey);
  if (!found) {
    return { ok: false, message: "未找到对应的 cookie" };
  }

  const { cookie, sourceDomain } = found;
  const setDetails: chrome.cookies.SetDetails = {
    url: `${url.protocol}//${targetDomain}${cookie.path ?? "/"}`,
    name: cookie.name,
    value: cookie.value,
    path: cookie.path ?? "/",
    secure: cookie.secure,
    httpOnly: cookie.httpOnly
  };

  if (cookie.sameSite && cookie.sameSite !== "unspecified") {
    setDetails.sameSite = cookie.sameSite;
  }
  if (typeof cookie.expirationDate === "number") {
    setDetails.expirationDate = cookie.expirationDate;
  }
  if (!cookie.hostOnly) {
    setDetails.domain = `.${targetDomain}`;
  } else {
    setDetails.domain = targetDomain;
  }

  await chrome.cookies.set(setDetails);

  return {
    ok: true,
    message: `已同步 cookie 到 ${targetDomain}`,
    sourceDomain
  };
};

chrome.runtime.onMessage.addListener((message: AppMessage, _sender, sendResponse) => {
  if (message.type === "PING") {
    sendResponse({ ok: true, receivedAt: Date.now() });
    return;
  }

  if (message.type === "COOKIE_SYNC_REQUEST") {
    handleCookieSync(message.payload.targetDomain, message.payload.cookieKey)
      .then((response) => sendResponse(response))
      .catch((error: Error) => {
        sendResponse({ ok: false, message: error.message || "同步失败" });
      });
    return true;
  }
});
