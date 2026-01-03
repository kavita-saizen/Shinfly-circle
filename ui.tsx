"use client";

import * as React from "react";

export function cls(...xs: Array<string | false | null | undefined>) {
  return xs.filter(Boolean).join(" ");
}

export function Pill({
  children,
  tone = "slate"
}: {
  children: React.ReactNode;
  tone?: "cyan" | "purple" | "slate" | "green" | "amber" | "red";
}) {
  const tones: Record<string, string> = {
    cyan: "border-cyan-500/40 bg-cyan-500/10 text-cyan-200",
    purple: "border-purple-500/40 bg-purple-500/10 text-purple-200",
    slate: "border-white/15 bg-white/5 text-slate-200",
    green: "border-emerald-500/40 bg-emerald-500/10 text-emerald-200",
    amber: "border-amber-500/40 bg-amber-500/10 text-amber-200",
    red: "border-red-500/40 bg-red-500/10 text-red-200"
  };
  return (
    <span className={cls("inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-semibold", tones[tone])}>
      {children}
    </span>
  );
}

export function Button({
  children,
  onClick,
  variant = "ghost",
  disabled,
  className
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "ghost" | "danger";
  disabled?: boolean;
  className?: string;
}) {
  const base = "px-4 py-2 rounded-2xl text-sm font-semibold border transition active:scale-[.99]";
  const variants: Record<string, string> = {
    primary: "bg-cyan-600 hover:bg-cyan-500 border-cyan-500/30 text-slate-950",
    secondary: "bg-purple-600 hover:bg-purple-500 border-purple-500/30 text-white",
    ghost: "bg-white/5 hover:bg-white/10 border-white/15 text-white",
    danger: "bg-red-600 hover:bg-red-500 border-red-500/30 text-white"
  };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cls(base, variants[variant], disabled ? "opacity-50 cursor-not-allowed" : "", className || "")}
    >
      {children}
    </button>
  );
}

export function Card({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cls("rounded-3xl border border-white/10 glass", className || "")}>
      {children}
    </div>
  );
}

export function Input({
  label,
  value,
  onChange,
  placeholder,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-slate-300 mb-1">{label}</div>
      <input
        type={type}
        value={value}
        placeholder={placeholder || ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-2xl bg-slate-900/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-600/40"
      />
    </label>
  );
}

export function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 8
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}) {
  return (
    <label className="block">
      <div className="text-xs font-semibold text-slate-300 mb-1">{label}</div>
      <textarea
        value={value}
        placeholder={placeholder || ""}
        rows={rows}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-3 py-2 rounded-2xl bg-slate-900/60 border border-white/10 focus:outline-none focus:ring-2 focus:ring-purple-600/30"
      />
    </label>
  );
}

export function toSafeHtml(text: string) {
  const escaped = (text || "").replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");
  const paras = escaped
    .split(/\n{2,}/)
    .map((p) => `<p class="mb-3 leading-7">${p.replaceAll("\n", "<br/>")}</p>`)
    .join("");
  return paras || `<p class="text-slate-500">No content yet.</p>`;
}
