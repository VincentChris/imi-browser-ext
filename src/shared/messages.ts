export type PingMessage = {
  type: "PING";
  payload?: { from?: string };
};

export type CookieSyncRequestMessage = {
  type: "COOKIE_SYNC_REQUEST";
  payload: {
    targetDomain: string;
    cookieKey: string;
  };
};

export type AppMessage = PingMessage | CookieSyncRequestMessage;

export type CookieSyncResponse = {
  ok: boolean;
  message: string;
  sourceDomain?: string;
};

export const sendMessage = <Response = unknown>(message: AppMessage) =>
  chrome.runtime.sendMessage(message) as Promise<Response>;
