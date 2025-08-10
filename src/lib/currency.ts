export function stripNonDigits(value: string): string {
  return (value || "").replace(/\D+/g, "");
}

export function formatIndianNumberDigits(digits: string): string {
  const clean = stripNonDigits(digits);
  if (!clean) return "";
  if (clean.length <= 3) return clean;
  const last3 = clean.slice(-3);
  const rest = clean.slice(0, -3);
  const restWithComma = rest.replace(/\B(?=(\d{2})+(?!\d))/g, ",");
  return `${restWithComma},${last3}`;
}

export function formatINR(digits: string): string {
  const formatted = formatIndianNumberDigits(digits);
  return formatted;
}
