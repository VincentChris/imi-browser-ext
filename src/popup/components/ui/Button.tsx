import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "secondary";
  children: ReactNode;
};

const baseClassName =
  "relative inline-flex items-center justify-center rounded-xl px-3 py-2 text-sm font-semibold transition duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/70 focus-visible:ring-offset-0";

const variants = {
  primary:
    "bg-gradient-to-r from-cyan-300 via-sky-300 to-indigo-300 text-slate-950 shadow-[0_10px_24px_-14px_rgba(126,249,255,0.7)] hover:brightness-110 disabled:cursor-not-allowed disabled:bg-slate-800 disabled:text-slate-500 disabled:shadow-none disabled:hover:brightness-100",
  secondary:
    "border border-white/10 bg-white/5 text-slate-100 hover:border-white/20 hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-50"
};

export const Button = ({ variant = "primary", className, ...props }: ButtonProps) => {
  const classes = `${baseClassName} ${variants[variant]} ${className ?? ""}`.trim();
  return <button {...props} className={classes} />;
};
