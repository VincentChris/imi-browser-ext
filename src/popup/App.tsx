import { useEffect, useRef, useState } from "react";
import { CookieSyncPanel } from "./components/CookieSyncPanel";
import { CountrySwitcherPanel } from "./components/CountrySwitcherPanel";
import { Sidebar } from "./components/Sidebar";
import { Toast } from "./components/Toast";
import {
  ACTIVE_TAB_STORAGE_KEY,
  SAVE_DEBOUNCE_MS,
  STORAGE_KEY,
  TOAST_DURATION_MS
} from "./constants";
import { useActiveTabUrl } from "./hooks/useActiveTabUrl";
import { useCookieSync } from "./hooks/useCookieSync";
import type { PersistedInputs, TabId, ToastState, ToastType } from "./types";

const getActiveTabId = (value: unknown): TabId =>
  value === "countrySwitcher" ? "countrySwitcher" : "cookieSync";

export const App = () => {
  const [targetDomain, setTargetDomain] = useState("");
  const [cookieKey, setCookieKey] = useState("");
  const [toast, setToast] = useState<ToastState | null>(null);
  const [activeTab, setActiveTab] = useState<TabId>("cookieSync");
  const saveTimerRef = useRef<number | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const { url: currentTabUrl, isLocalhost } = useActiveTabUrl();

  useEffect(() => {
    chrome.storage.local
      .get(STORAGE_KEY)
      .then((result: Record<string, PersistedInputs>) => {
        const stored = result[STORAGE_KEY];
        if (stored?.targetDomain) setTargetDomain(stored.targetDomain);
        if (stored?.cookieKey) setCookieKey(stored.cookieKey);
      })
      .catch(() => {
        // Ignore storage errors; defaults stay empty.
      });
  }, []);

  useEffect(() => {
    chrome.storage.local
      .get(ACTIVE_TAB_STORAGE_KEY)
      .then((result: Record<string, unknown>) => {
        const stored = result[ACTIVE_TAB_STORAGE_KEY];
        setActiveTab(getActiveTabId(stored));
      })
      .catch(() => {
        // Ignore storage errors.
      });
  }, []);

  useEffect(() => {
    if (!isLocalhost && activeTab === "countrySwitcher") {
      setActiveTab("cookieSync");
    }
  }, [activeTab, isLocalhost]);

  useEffect(() => {
    chrome.storage.local
      .set({ [ACTIVE_TAB_STORAGE_KEY]: activeTab })
      .catch(() => {
        // Ignore storage errors.
      });
  }, [activeTab]);

  useEffect(() => {
    if (saveTimerRef.current) {
      window.clearTimeout(saveTimerRef.current);
    }
    saveTimerRef.current = window.setTimeout(() => {
      const payload: PersistedInputs = {
        targetDomain: targetDomain.trim(),
        cookieKey: cookieKey.trim()
      };
      chrome.storage.local.set({ [STORAGE_KEY]: payload }).catch(() => {
        // Ignore storage errors.
      });
    }, SAVE_DEBOUNCE_MS);

    return () => {
      if (saveTimerRef.current) {
        window.clearTimeout(saveTimerRef.current);
      }
    };
  }, [targetDomain, cookieKey]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const showToast = (message: string, type: ToastType = "info") => {
    setToast({ message, type });
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, TOAST_DURATION_MS);
  };

  const { isLoading, sync } = useCookieSync(showToast);

  const tabs = [
    { id: "cookieSync" as const, label: "Cookie Sync", enabled: true },
    {
      id: "countrySwitcher" as const,
      label: "切换国家",
      enabled: isLocalhost,
      disabledReason: "只能在localhost下使用"
    }
  ];

  return (
    <div className="h-full w-full p-3 text-[13px] text-white/90">
      <div className="relative flex h-full overflow-hidden rounded-2xl border border-white/10 bg-slate-950/60 shadow-[0_30px_80px_-40px_rgba(0,0,0,0.9)] backdrop-blur">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(126,249,255,0.08),transparent_45%),radial-gradient(circle_at_bottom_left,rgba(255,127,214,0.08),transparent_45%)]" />
        <Sidebar
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          isLocalhost={isLocalhost}
        />

        <main className="relative flex min-w-0 flex-1 flex-col gap-5 p-5">
          <Toast toast={toast} />

          {activeTab === "cookieSync" ? (
            <CookieSyncPanel
              targetDomain={targetDomain}
              cookieKey={cookieKey}
              isLoading={isLoading}
              onTargetDomainChange={setTargetDomain}
              onCookieKeyChange={setCookieKey}
              onSync={() => sync(targetDomain, cookieKey)}
            />
          ) : (
            <CountrySwitcherPanel
              currentTabUrl={currentTabUrl}
              isLocalhost={isLocalhost}
              showToast={showToast}
            />
          )}
        </main>
      </div>
    </div>
  );
};
