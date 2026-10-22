"use client"

import { useState } from "react"
import { SAMPLE_LOANS, money } from "@/lib/loan"
import { Button, Card, Field, Input, Notice, Result, Stat } from "./ui"

type Check = { difference: number; reference: string }

export function RepaymentForm() {
  const [search, setSearch] = useState("")
  const [principal, setPrincipal] = useState("3000")
  const [rate, setRate] = useState("40")
  const [received, setReceived] = useState("3500")
  const [reference, setReference] = useState("")
  const [check, setCheck] = useState<Check | null>(null)

  const expected = (Number(principal) || 0) * (1 + (Number(rate) || 0) / 100)
  const shortfall = Math.max(0, expected - (Number(received) || 0))

  function handleSearch(value: string) {
    setSearch(value)
    const loan = SAMPLE_LOANS.find((l) => l.label === value)
    if (loan) {
      setPrincipal(String(loan.principal))
      setRate(String(loan.rate))
    }
  }

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(270px,0.8fr)]">
      <Card title="Reconcile against loans issued">
        <Field
          label="Loan reference search"
          htmlFor="searchLoan"
          hint="Production search should read the Loans Issued database and load the original loan ticket."
        >
          <Input
            id="searchLoan"
            list="loans"
            placeholder="Search loan number or client…"
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
          />
          <datalist id="loans">
            {SAMPLE_LOANS.map((l) => (
              <option key={l.label} value={l.label} />
            ))}
          </datalist>
        </Field>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <Field label="Original principal (R)" htmlFor="repPrincipal">
            <Input id="repPrincipal" type="number" min={0} value={principal} onChange={(e) => setPrincipal(e.target.value)} />
          </Field>
          <Field label="Contractual premium (%)" htmlFor="repRate">
            <Input id="repRate" type="number" min={0} value={rate} onChange={(e) => setRate(e.target.value)} />
          </Field>
          <Field label="Amount received (R)" htmlFor="received">
            <Input id="received" type="number" min={0} value={received} onChange={(e) => setReceived(e.target.value)} />
          </Field>
          <Field label="Payment reference" htmlFor="payRef">
            <Input
              id="payRef"
              placeholder="Must match loan ticket reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
            />
          </Field>
        </div>
        <div className="mt-5">
          <Button onClick={() => setCheck({ difference: expected - (Number(received) || 0), reference })}>
            Check repayment
          </Button>
        </div>
        {check ? (
          <Result
            tone={check.difference > 0 ? "warn" : "ok"}
            title={check.difference > 0 ? "Short repayment" : "Expected amount covered"}
          >
            <p>
              {check.difference > 0
                ? `Shortfall: ${money(check.difference)}`
                : `Excess / credit: ${money(-check.difference)}`}
            </p>
            <p>Reference entered: {check.reference || "Not supplied"}</p>
            <p className="mt-2 text-xs text-muted">
              Preview calculation only; verify against the full loan and repayment ledger.
            </p>
          </Result>
        ) : null}
      </Card>

      <Card title="Reconciliation logic">
        <Stat label="Expected total (illustrative)" value={money(expected)} />
        <Stat label="Remaining shortfall" value={money(shortfall)} tone={shortfall > 0 ? "danger" : undefined} />
        <p className="mb-4 text-[11px] leading-relaxed text-muted">
          A production workflow must support partial payments, multiple repayments, overpayments, reversals, and an audit
          history—not only a single comparison.
        </p>
        <Notice>
          The 40% figure is copied from your notes as a business rule to validate, not a legal-compliance confirmation.
        </Notice>
      </Card>
    </div>
  )
}
