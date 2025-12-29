import type { ToastState } from "../types";

type ToastProps = {
  toast: ToastState | null;
};

export const Toast = ({ toast }: ToastProps) => {
  if (!toast) return null;

  const toastClassName =
    toast.type === "success"
      ? "border-emerald-400/40 bg-emerald-400/15 text-emerald-100"
      : toast.type === "error"
        ? "border-rose-400/40 bg-rose-400/15 text-rose-100"
        : "border-cyan-300/30 bg-cyan-300/10 text-slate-100";

  return (
    <div className="pointer-events-none absolute left-4 right-4 top-3 z-10">
      <div
        className={`rounded-xl border px-4 py-2 text-xs shadow-[0_18px_40px_-20px_rgba(0,0,0,0.9)] backdrop-blur ${toastClassName}`}
      >
        {toast.message}
      </div>
    </div>
  );
};
