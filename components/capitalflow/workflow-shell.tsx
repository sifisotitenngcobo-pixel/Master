"use client"

import { useState } from "react"
import { Plus, RefreshCw } from "lucide-react"
import { LoanForm } from "./loan-form"
import { RepaymentForm } from "./repayment-form"

type View = "loan" | "repay"

const VIEWS = {
  loan: {
    nav: "Record a Loan",
    tab: "Loan disbursement",
    title: "Record a Loan",
    subtitle: "Create a traceable disbursement record.",
    icon: Plus,
  },
  repay: {
    nav: "Reconcile Repayment",
    tab: "Repayment reconciliation",
    title: "Reconcile Repayment",
    subtitle: "Compare received payments with the original loan ticket.",
    icon: RefreshCw,
  },
} as const

export function WorkflowShell() {
  const [view, setView] = useState<View>("loan")
  const current = VIEWS[view]

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <aside className="flex flex-col gap-4 border-b border-line bg-sidebar px-4 py-5 md:w-56 md:shrink-0 md:border-r md:border-b-0 md:py-6">
        <div>
          <p className="text-xl font-extrabold tracking-tight">
            Capital<span className="text-accent">Flow</span>
          </p>
          <p className="text-[11px] tracking-widest text-muted">LENDING OPERATIONS</p>
        </div>
        <nav aria-label="Primary" className="flex gap-2 md:mt-4 md:flex-col">
          {(Object.keys(VIEWS) as View[]).map((key) => {
            const Icon = VIEWS[key].icon
            const active = key === view
            return (
              <button
                key={key}
                type="button"
                onClick={() => setView(key)}
                aria-current={active ? "page" : undefined}
                className={`flex flex-1 items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm transition md:flex-none ${
                  active ? "border-[#315268] bg-[#1b3043] text-accent" : "border-transparent text-muted hover:text-foreground"
                }`}
              >
                <Icon className="size-4 shrink-0" aria-hidden />
                {VIEWS[key].nav}
              </button>
            )
          })}
        </nav>
        <p className="hidden rounded-xl border border-warning/40 bg-warning/10 p-3 text-xs leading-relaxed text-warning md:mt-6 md:block">
          Prototype only. Sample values are not saved to a database.
        </p>
      </aside>

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 md:px-7 md:py-7">
        <header className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-[11px] font-extrabold uppercase tracking-[0.15em] text-accent">Operations / Transactions</p>
            <h1 className="mt-1 text-2xl font-bold text-balance md:text-3xl">{current.title}</h1>
            <p className="text-sm text-muted">{current.subtitle}</p>
          </div>
          <span className="rounded-full border border-[#386354] px-2.5 py-1 text-xs text-accent">MOCKUP · INTERACTIVE</span>
        </header>

        <div role="tablist" aria-label="Workflow step" className="my-6 flex gap-2 overflow-x-auto">
          {(Object.keys(VIEWS) as View[]).map((key, i) => (
            <button
              key={key}
              type="button"
              role="tab"
              aria-selected={key === view}
              onClick={() => setView(key)}
              className={`shrink-0 rounded-lg border px-3 py-2.5 text-sm transition ${
                key === view ? "border-[#315268] bg-[#1b3043] text-accent" : "border-line text-muted hover:text-foreground"
              }`}
            >
              <span className="mr-2 font-mono">{String(i + 1).padStart(2, "0")}</span>
              {VIEWS[key].tab}
            </button>
          ))}
        </div>

        <div role="tabpanel">{view === "loan" ? <LoanForm /> : <RepaymentForm />}</div>
      </main>
    </div>
  )
}
