import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  children: ReactNode;
};

const baseClassName =
  "rounded-md px-3 py-2 text-sm font-semibold transition focus:outline-none";

const variants = {
  primary:
    "bg-sky-500 text-slate-950 hover:bg-sky-400 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-400",
  secondary:
    "border border-slate-700 bg-slate-950 text-slate-100 hover:bg-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
};

export const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
  const classes = `${baseClassName} ${variants[variant]} ${className ?? ""}`.trim();
  return <button {...props} className={classes} />;
};
