import { useCallback, useState } from "react";
import { sendMessage, type CookieSyncResponse } from "../../shared/messages";
import type { ToastType } from "../types";

type UseCookieSyncResult = {
  isLoading: boolean;
  sync: (targetDomain: string, cookieKey: string) => Promise<void>;
};

export const useCookieSync = (
  showToast: (message: string, type?: ToastType) => void
): UseCookieSyncResult => {
  const [isLoading, setIsLoading] = useState(false);

  const sync = useCallback(
    async (targetDomain: string, cookieKey: string) => {
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
    },
    [showToast]
  );

  return { isLoading, sync };
};
