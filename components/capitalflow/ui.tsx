import type { ComponentProps, ReactNode } from "react"

export function Card({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-2xl border border-line bg-panel p-5">
      <h2 className="mb-4 text-base font-semibold">{title}</h2>
      {children}
    </section>
  )
}

export function Field({
  label,
  hint,
  htmlFor,
  full,
  children,
}: {
  label: string
  hint?: string
  htmlFor: string
  full?: boolean
  children: ReactNode
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${full ? "sm:col-span-2" : ""}`}>
      <label htmlFor={htmlFor} className="text-xs text-muted">
        {label}
      </label>
      {children}
      {hint ? <p className="text-[11px] leading-relaxed text-muted">{hint}</p> : null}
    </div>
  )
}

const inputBase =
  "w-full min-w-0 rounded-lg border border-line-strong bg-field px-3 py-2.5 text-sm text-foreground outline-none transition focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/30 read-only:border-dashed read-only:text-[#c7d6e8]"

export function Input(props: ComponentProps<"input">) {
  return <input {...props} className={inputBase} />
}

export function Select(props: ComponentProps<"select">) {
  return <select {...props} className={inputBase} />
}

export function Button({
  variant = "primary",
  ...props
}: ComponentProps<"button"> & { variant?: "primary" | "secondary" }) {
  const styles =
    variant === "primary"
      ? "bg-accent text-accent-foreground hover:bg-accent/90"
      : "border border-line bg-[#223249] text-foreground hover:bg-[#2a3d58]"
  return (
    <button
      type="button"
      {...props}
      className={`rounded-lg px-4 py-2.5 text-sm font-bold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/50 ${styles}`}
    />
  )
}

export function Stat({ label, value, tone }: { label: string; value: string; tone?: "warning" | "danger" }) {
  const color = tone === "danger" ? "text-danger" : tone === "warning" ? "text-warning" : "text-foreground"
  return (
    <div className="mb-3 rounded-xl border border-line bg-panel-2 px-4 py-3">
      <p className="text-xs text-muted">{label}</p>
      <p className={`font-mono text-xl font-semibold tabular-nums ${color}`}>{value}</p>
    </div>
  )
}

export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-warning/40 bg-warning/10 p-3 text-xs leading-relaxed text-warning">
      {children}
    </div>
  )
}

export function Result({ title, tone = "ok", children }: { title: string; tone?: "ok" | "warn"; children: ReactNode }) {
  return (
    <div
      role="status"
      className={`mt-4 rounded-xl border p-4 text-sm leading-relaxed ${
        tone === "ok" ? "border-accent/40 bg-accent/10" : "border-warning/40 bg-warning/10"
      }`}
    >
      <p className={`font-semibold ${tone === "ok" ? "text-accent" : "text-warning"}`}>{title}</p>
      <div className="mt-1 text-foreground/90">{children}</div>
    </div>
  )
}
