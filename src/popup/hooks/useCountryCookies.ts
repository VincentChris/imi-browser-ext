import { useCallback, useEffect, useMemo, useState } from "react";
import { COUNTRY_OPTIONS } from "../data/countryOptions";
import { TIMEZONE_COOKIE, TIMEZONE_COUNTRY_COOKIE } from "../constants";

type UseCountryCookiesResult = {
  selectedCountry: string;
  setSelectedCountry: (value: string) => void;
  isSaving: boolean;
  optionsByName: Map<string, (typeof COUNTRY_OPTIONS)[number]>;
  saveSelection: (countryName: string) => Promise<void>;
};

export const useCountryCookies = (
  currentTabUrl: URL | null,
  isLocalhost: boolean,
  onError: (message: string) => void,
  onSuccess: (message: string) => void
): UseCountryCookiesResult => {
  const [selectedCountry, setSelectedCountry] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const optionsByName = useMemo(() => {
    return new Map(COUNTRY_OPTIONS.map((option) => [option.countryName, option]));
  }, []);

  useEffect(() => {
    if (!isLocalhost || !currentTabUrl) return;

    chrome.cookies
      .get({ url: currentTabUrl.origin, name: TIMEZONE_COUNTRY_COOKIE })
      .then((cookie) => {
        if (cookie?.value) {
          setSelectedCountry(cookie.value);
        }
      })
      .catch(() => {
        // Ignore cookie read errors.
      });
  }, [currentTabUrl, isLocalhost]);

  const saveSelection = useCallback(
    async (countryName: string) => {
      if (!currentTabUrl) return;
      const selected = optionsByName.get(countryName);
      if (!selected) return;

      setIsSaving(true);
      try {
        await chrome.cookies.set({
          url: currentTabUrl.origin,
          name: TIMEZONE_COUNTRY_COOKIE,
          value: selected.countryName,
          domain: "localhost",
          path: "/"
        });
        await chrome.cookies.set({
          url: currentTabUrl.origin,
          name: TIMEZONE_COOKIE,
          value: selected.timeZone,
          domain: "localhost",
          path: "/"
        });
        onSuccess("已更新国家与时区");
      } catch (error) {
        const message = error instanceof Error ? error.message : "写入 cookie 失败";
        onError(message);
      } finally {
        setIsSaving(false);
      }
    },
    [currentTabUrl, onError, onSuccess, optionsByName]
  );

  return { selectedCountry, setSelectedCountry, isSaving, optionsByName, saveSelection };
};
