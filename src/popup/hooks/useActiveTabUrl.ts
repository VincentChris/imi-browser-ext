import { useEffect, useState } from "react";

type ActiveTabInfo = {
  url: URL | null;
  isLocalhost: boolean;
};

const getActiveTabUrl = async () => {
  const [tab] = await chrome.tabs.query({ active: true, lastFocusedWindow: true });
  if (!tab?.url) return null;
  try {
    const url = new URL(tab.url);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url;
  } catch {
    return null;
  }
};

export const useActiveTabUrl = (): ActiveTabInfo => {
  const [url, setUrl] = useState<URL | null>(null);
  const [isLocalhost, setIsLocalhost] = useState(false);

  useEffect(() => {
    getActiveTabUrl()
      .then((nextUrl) => {
        setUrl(nextUrl);
        setIsLocalhost(nextUrl?.hostname === "localhost");
      })
      .catch(() => {
        setUrl(null);
        setIsLocalhost(false);
      });
  }, []);

  return { url, isLocalhost };
};
