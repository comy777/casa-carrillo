import { describe, expect, it } from 'vitest'
import { finalPrice, formatCurrency, truncate } from '../format'

describe('formatCurrency', () => {
  it('formatea a pesos colombianos sin decimales', () => {
    // El separador de miles es un carácter especial de es-CO; validamos dígitos y signo.
    const out = formatCurrency(45_000)
    expect(out).toContain('$')
    expect(out.replace(/\D/g, '')).toBe('45000')
  })
})

describe('finalPrice', () => {
  it('retorna el precio base sin descuento', () => {
    expect(finalPrice(100_000, 0)).toBe(100_000)
  })
  it('aplica el porcentaje de descuento', () => {
    expect(finalPrice(100_000, 15)).toBe(85_000)
  })
})

describe('truncate', () => {
  it('no altera textos cortos', () => {
    expect(truncate('hola', 10)).toBe('hola')
  })
  it('trunca y agrega puntos suspensivos', () => {
    expect(truncate('abcdefghij', 5)).toBe('abcde…')
  })
})
