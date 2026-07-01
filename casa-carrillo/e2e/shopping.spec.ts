import { test, expect } from '@playwright/test'

test.describe('Flujo de compra Casa Carrillo', () => {
  test('la home muestra el hero y navega al catálogo', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('heading', { name: /artesanías con alma/i })).toBeVisible()
    await page.getByRole('link', { name: /explorar catálogo/i }).first().click()
    await expect(page).toHaveURL(/\/catalogo/)
    await expect(page.getByRole('heading', { name: 'Catálogo' })).toBeVisible()
  })

  test('buscar filtra los productos', async ({ page }) => {
    await page.goto('/catalogo')
    await page.getByPlaceholder('Buscar artesanías…').fill('mochila')
    await expect(page.getByText(/Mochila Wayuú/i).first()).toBeVisible()
  })

  test('agregar al carrito abre el drawer con el item', async ({ page }) => {
    await page.goto('/catalogo')
    // Primer botón de agregar de la grilla.
    await page.getByRole('button', { name: /agregar .* al carrito/i }).first().click()
    // Abrir carrito.
    await page.getByRole('button', { name: /carrito \(\d+\)/i }).click()
    await expect(page.getByRole('dialog', { name: /tu carrito/i })).toBeVisible()
    await expect(page.getByRole('button', { name: /finalizar compra/i })).toBeVisible()
  })

  test('checkout requiere autenticación (ruta protegida)', async ({ page }) => {
    await page.goto('/checkout')
    // Sin carrito redirige a /carrito o a login; validamos que NO se quede en checkout vacío.
    await expect(page).not.toHaveURL(/\/checkout$/)
  })

  test('login con credenciales demo lleva al perfil', async ({ page }) => {
    await page.goto('/ingresar')
    await page.getByRole('button', { name: /usar credenciales de demo/i }).click()
    await page.getByRole('button', { name: 'Ingresar' }).click()
    await expect(page).toHaveURL(/\/perfil/)
    await expect(page.getByRole('heading', { name: /hola,/i })).toBeVisible()
  })
})
