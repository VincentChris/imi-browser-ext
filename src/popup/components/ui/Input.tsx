import type { InputHTMLAttributes, RefObject } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputRef?: RefObject<HTMLInputElement>;
};

const baseClassName =
  "rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 transition focus:border-cyan-300/60 focus:outline-none focus:ring-2 focus:ring-cyan-300/15";

export const Input = ({ className, inputRef, ...props }: InputProps) => {
  const classes = `${baseClassName} ${className ?? ""}`.trim();
  return <input {...props} ref={inputRef} className={classes} />;
};
