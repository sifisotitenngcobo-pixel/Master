"use client"

import { useState } from "react"
import { PREMIUM_RATE, SAMPLE_CLIENTS, loanNumber, money, monthEnd, toDateInput } from "@/lib/loan"
import { Button, Card, Field, Input, Result, Select, Stat } from "./ui"

type Ticket = { number: string; client: string; amount: number; method: string; due: string; txn: string }

function defaults() {
  const now = new Date()
  return {
    client: SAMPLE_CLIENTS[0].name,
    amount: "3000",
    method: "EFT",
    txn: "",
    issueDate: toDateInput(now),
    dueDate: monthEnd(now),
    loanNo: loanNumber(now),
  }
}

export function LoanForm() {
  const [form, setForm] = useState(defaults)
  const [ticket, setTicket] = useState<Ticket | null>(null)

  const amount = Number(form.amount) || 0
  const premium = amount * PREMIUM_RATE
  const client = SAMPLE_CLIENTS.find((c) => c.name === form.client)
  const update = (key: keyof typeof form) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [key]: e.target.value }))

  return (
    <div className="grid gap-5 lg:grid-cols-[minmax(0,1.2fr)_minmax(270px,0.8fr)]">
      <Card title="Loan details">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Client search"
            htmlFor="client"
            full
            hint="In production: search the Clients Database and load the selected client's verified details."
          >
            <Input id="client" list="clients" placeholder="Search client name…" value={form.client} onChange={update("client")} />
            <datalist id="clients">
              {SAMPLE_CLIENTS.map((c) => (
                <option key={c.reference} value={c.name} />
              ))}
            </datalist>
          </Field>
          <Field label="Client reference" htmlFor="clientRef">
            <Input id="clientRef" value={client?.reference ?? "Not found"} readOnly />
          </Field>
          <Field label="Master agreement reference" htmlFor="agreement">
            <Input id="agreement" value={client?.agreement ?? "Not found"} readOnly />
          </Field>
          <Field label="Loan number (auto-generated)" htmlFor="loanNo">
            <Input id="loanNo" value={form.loanNo} readOnly />
          </Field>
          <Field label="Issue date (today)" htmlFor="issueDate">
            <Input id="issueDate" value={form.issueDate} readOnly />
          </Field>
          <Field label="Amount issued (R)" htmlFor="amount">
            <Input id="amount" type="number" min={0} inputMode="decimal" value={form.amount} onChange={update("amount")} />
          </Field>
          <Field label="Interest premium" htmlFor="premium">
            <Input id="premium" value={`${PREMIUM_RATE * 100}% (configured)`} readOnly />
          </Field>
          <Field label="Repayment due date" htmlFor="dueDate" hint="Defaults to month-end; editable if otherwise agreed.">
            <Input id="dueDate" type="date" value={form.dueDate} onChange={update("dueDate")} />
          </Field>
          <Field label="Disbursement method" htmlFor="method">
            <Select id="method" value={form.method} onChange={update("method")}>
              <option>EFT</option>
              <option>Cash</option>
            </Select>
          </Field>
          <Field label="Transaction reference / proof" htmlFor="txn" full>
            <Input id="txn" placeholder="EFT reference or cash voucher number" value={form.txn} onChange={update("txn")} />
          </Field>
        </div>
        <div className="mt-5 flex flex-wrap gap-2">
          <Button
            onClick={() =>
              setTicket({ number: form.loanNo, client: form.client, amount, method: form.method, due: form.dueDate, txn: form.txn })
            }
          >
            Generate loan ticket
          </Button>
          <Button
            variant="secondary"
            onClick={() => {
              setForm(defaults())
              setTicket(null)
            }}
          >
            Reset sample
          </Button>
        </div>
        {ticket ? (
          <Result title={`Preview ticket created: ${ticket.number}`}>
            <p>Client: {ticket.client}</p>
            <p>
              Amount: {money(ticket.amount)} · Method: {ticket.method}
            </p>
            <p>Due: {ticket.due}</p>
            <p>Reference: {ticket.txn || "Not supplied"}</p>
            <p className="mt-2 text-xs text-muted">This is a browser-only preview; no transaction was saved.</p>
          </Result>
        ) : null}
      </Card>

      <div className="flex flex-col gap-5">
        <Card title="Repayment summary preview">
          <Stat label="Principal issued" value={money(amount)} />
          <Stat label={`Premium at ${PREMIUM_RATE * 100}% (illustrative)`} value={money(premium)} />
          <Stat label="Illustrative total due" value={money(amount + premium)} tone="warning" />
          <p className="text-[11px] leading-relaxed text-muted">
            Confirm the contractual calculation and applicable legal requirements before using this in production.
          </p>
        </Card>
        <Card title="Traceability">
          <dl className="divide-y divide-line text-sm">
            {[
              ["Loan ID", ticket?.number ?? "Generated on submit"],
              ["Agreement", "Signed master agreement"],
              ["Receipt", "Unique ticket after issue"],
              ["Audit trail", "Required in production"],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4 py-2">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right">{v}</dd>
              </div>
            ))}
          </dl>
        </Card>
      </div>
    </div>
  )
}
