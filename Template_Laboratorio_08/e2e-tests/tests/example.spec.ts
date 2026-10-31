import { test, expect } from '@playwright/test';
import { LogIn, ResetDB } from "./helper.ts";

const backendUrl = 'http://localhost:3001'

test.describe('p3 - login', () => {

  // Reiniciamos la base de datos antes de cada prueba.
  test.beforeEach(async ({ page }) => {
    await ResetDB(page);
  });

  test('Login exitoso', async ({ page }) => {

    // 1. Creamos un usuario directamente en el backend.
    const username = 'playwright-user';
    const password = '123456';

    const response = await page.request.post(`${backendUrl}/api/users`, {
      data: {
        username: username,
        email: 'playwright@test.com',
        password: password,
      },
    });

    // Comprobamos que el usuario fue creado correctamente.
    expect(response.status()).toBe(201);

    // 2. Iniciamos sesión utilizando el helper.
    await LogIn(page, username, password);

    // 3. Comprobamos que el inicio de sesión fue exitoso.
    await expect(page).toHaveURL(/\/threads$/);

    // Comprobamos que aparece el nombre del usuario autenticado.
    await expect(page.getByText(username)).toBeVisible();
  });

  test('Login fallido', async ({ page }) => {

    // 1. Intentamos iniciar sesión con un usuario inexistente.
    await LogIn(page, 'usuario-inexistente', '123456');

    // 2. Comprobamos que permanecemos en la página de login.
    await expect(page).toHaveURL(/\/login$/);

    // 3. Comprobamos que aparece el mensaje de error.
    await expect(page.locator('.error')).toBeVisible();
  });
});