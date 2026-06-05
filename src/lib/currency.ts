const EUR = new Intl.NumberFormat('en-IE', {
  style: 'currency',
  currency: 'EUR',
  maximumFractionDigits: 0,
});

export function formatEUR(amount: number): string {
  return EUR.format(amount);
}

export function formatStartingFrom(amount: number): string {
  return `from ${formatEUR(amount)}`;
}
