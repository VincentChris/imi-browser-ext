import type { ToastState } from "../types";

type ToastProps = {
  toast: ToastState | null;
};

export const Toast = ({ toast }: ToastProps) => {
  if (!toast) return null;

  const toastClassName =
    toast.type === "success"
      ? "border-emerald-400/40 bg-emerald-500/15 text-emerald-100"
      : toast.type === "error"
        ? "border-rose-400/40 bg-rose-500/15 text-rose-100"
        : "border-slate-400/40 bg-slate-500/15 text-slate-100";

  return (
    <div className="pointer-events-none absolute left-4 right-4 top-3 z-10">
      <div
        className={`rounded-md border px-3 py-2 text-xs shadow-lg backdrop-blur ${toastClassName}`}
      >
        {toast.message}
      </div>
    </div>
  );
};
