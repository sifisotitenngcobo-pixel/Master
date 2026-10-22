export const PREMIUM_RATE = 0.4

export const SAMPLE_CLIENTS = [
  { name: "Thando Mkhize", reference: "CL-00024", agreement: "MA-2026-0024" },
  { name: "Ayanda Dlamini", reference: "CL-00018", agreement: "MA-2026-0018" },
  { name: "Nomsa Khumalo", reference: "CL-00031", agreement: "MA-2026-0031" },
]

export const SAMPLE_LOANS = [
  { label: "LN-10/21-001 · Thando Mkhize", principal: 3000, rate: 40 },
  { label: "LN-10/18-004 · Ayanda Dlamini", principal: 2500, rate: 40 },
]

const pad = (n: number) => String(n).padStart(2, "0")

export function toDateInput(d: Date) {
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

export function monthEnd(d = new Date()) {
  return toDateInput(new Date(d.getFullYear(), d.getMonth() + 1, 0))
}

export function loanNumber(d = new Date(), sequence = 1) {
  return `LN-${pad(d.getMonth() + 1)}/${pad(d.getDate())}-${String(sequence).padStart(3, "0")}`
}

export function money(n: number) {
  return (
    "R " +
    Number(n || 0).toLocaleString("en-ZA", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })
  )
}
