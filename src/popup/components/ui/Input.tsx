import type { InputHTMLAttributes, RefObject } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  inputRef?: RefObject<HTMLInputElement>;
};

const baseClassName =
  "rounded-md border border-slate-700 bg-slate-950 px-2 py-1 text-sm text-slate-100 focus:border-slate-500 focus:outline-none";

export const Input = ({ className, inputRef, ...props }: InputProps) => {
  const classes = `${baseClassName} ${className ?? ""}`.trim();
  return <input {...props} ref={inputRef} className={classes} />;
};
