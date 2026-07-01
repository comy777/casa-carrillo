const currencyFormatter = new Intl.NumberFormat('es-CO', {
  style: 'currency',
  currency: 'COP',
  maximumFractionDigits: 0,
})

/** Formatea un número como moneda colombiana: 45000 -> "$45.000". */
export function formatCurrency(value: number): string {
  return currencyFormatter.format(value)
}

const dateFormatter = new Intl.DateTimeFormat('es-CO', {
  day: '2-digit',
  month: 'long',
  year: 'numeric',
})

export function formatDate(iso: string): string {
  return dateFormatter.format(new Date(iso))
}

/** Precio final de un producto aplicando su descuento. */
export function finalPrice(price: number, discount: number): number {
  if (!discount) return price
  return Math.round(price * (1 - discount / 100))
}

/** Trunca texto a n caracteres con puntos suspensivos. */
export function truncate(text: string, max: number): string {
  return text.length > max ? `${text.slice(0, max).trimEnd()}…` : text
}
