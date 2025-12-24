import { sendMessage } from "./shared/messages";

console.log("[imi] content script loaded");

sendMessage({ type: "PING", payload: { from: "content" } }).then((response) => {
  console.log("[imi] background response", response);
});
