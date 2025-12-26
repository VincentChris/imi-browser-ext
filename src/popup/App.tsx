import { useEffect, useRef, useState } from "react";
import { sendMessage, type CookieSyncResponse } from "../shared/messages";

type PersistedInputs = {
  targetDomain?: string;
  cookieKey?: string;
};

const STORAGE_KEY = "imi.cookieSync.inputs";
const SAVE_DEBOUNCE_MS = 400;
const TOAST_DURATION_MS = 2600;

type ToastType = "success" | "error" | "info";
type ToastState = {
  message: string;
  type: ToastType;
};

export const App = () => {
  const [targetDomain, setTargetDomain] = useState("");
  const [cookieKey, setCookieKey] = useState("");
  const [toast, setToast] = useState<ToastState | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const saveTimerRef = useRef<number | null>(null);
  const toastTimerRef = useRef<number | null>(null);

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

  const handleSync = async () => {
    const trimmedDomain = targetDomain.trim();
    const trimmedKey = cookieKey.trim();
    if (!trimmedDomain) {
      showToast("请输入同步域名", "error");
      return;
    }
    if (!trimmedKey) {
      showToast("请输入 cookie key", "error");
      return;
    }

    setIsLoading(true);
    try {
      const response = await sendMessage<CookieSyncResponse>({
        type: "COOKIE_SYNC_REQUEST",
        payload: { targetDomain: trimmedDomain, cookieKey: trimmedKey }
      });
      if (response.ok && response.sourceDomain) {
        showToast(`${response.message}（来源：${response.sourceDomain}）`, "success");
      } else {
        showToast(response.message, response.ok ? "success" : "error");
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "同步失败";
      showToast(message, "error");
    } finally {
      setIsLoading(false);
    }
  };

  const toastClassName = toast
    ? toast.type === "success"
      ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-100"
      : toast.type === "error"
        ? "border-rose-400/40 bg-rose-500/15 text-rose-100"
        : "border-slate-400/40 bg-slate-500/15 text-slate-100"
    : "";

  return (
    <div className="relative flex h-full w-full flex-col gap-4 p-4 text-sm text-slate-100">
      {toast ? (
        <div className="pointer-events-none absolute left-4 right-4 top-3 z-10">
          <div
            className={`rounded-md border px-3 py-2 text-xs shadow-lg backdrop-blur ${toastClassName}`}
          >
            {toast.message}
          </div>
        </div>
      ) : null}
      <header className="space-y-1">
        <h1 className="text-lg font-semibold">imi cookie sync</h1>
        <p className="text-xs text-slate-400">从当前 tab 读取 cookie，并同步到目标域名</p>
      </header>

      <section className="space-y-3 rounded-lg border border-slate-800 bg-slate-900/70 p-3">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-300">同步域名</span>
          <input
            className="rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:border-slate-500 focus:outline-none"
            placeholder="example.com"
            value={targetDomain}
            onChange={(event) => setTargetDomain(event.target.value)}
          />
        </label>
        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-300">Cookie key</span>
          <input
            className="rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:border-slate-500 focus:outline-none"
            placeholder="SESSION_ID"
            value={cookieKey}
            onChange={(event) => setCookieKey(event.target.value)}
          />
        </label>
        <button
          type="button"
          className="rounded-md bg-sky-500 px-3 py-2 text-sm font-semibold text-slate-950 transition hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400"
          onClick={handleSync}
          disabled={isLoading}
        >
          {isLoading ? "同步中..." : "同步"}
        </button>
      </section>

      <footer className="text-xs text-slate-500">Version 0.1.0</footer>
    </div>
  );
};
