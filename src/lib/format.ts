export function formatPrice(price: number, transactionType?: string): string {
  if (transactionType === "rent" || (transactionType === "commercial" && price < 100000)) {
    return `$${price.toLocaleString("en-US")}/mo`;
  }
  if (price >= 1_000_000) {
    return `$${(price / 1_000_000).toFixed(price >= 10_000_000 ? 1 : 2).replace(/\.0$/, "")}M`;
  }
  return `$${price.toLocaleString("en-US")}`;
}

export function formatSqft(sqft: number): string {
  return sqft.toLocaleString("en-US");
}
