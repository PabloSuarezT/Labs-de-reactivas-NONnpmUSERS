import { test, expect } from '@playwright/test';
import { LogIn, ResetDB, createThread } from './helper';

test.describe('P4 - Pruebas E2E', () => {
  test.beforeEach(async ({ page }) => {
    await ResetDB(page);
  });

  test('Verifica que un usuario puede cerrar sesión correctamente', async ({ page }) => {
    // 1. Crear usuario previo en la base de datos de pruebas vía API
    await page.request.post('http://localhost:3001/api/users', {
      data: {
        username: 'testuser',
        password: 'password123',
        email: 'testuser@example.com',
      },
    });

    // 2. Iniciar sesión con la función helper LogIn
    await LogIn(page, 'testuser', 'password123');

    // Confirmar que la sesión inició correctamente
    await expect(page.getByText('testuser')).toBeVisible();

    // 3. Hacer clic en el botón de cerrar sesión
    await page.getByRole('button', { name: /logout|log out|cerrar sesión/i }).click();

    // 4. Validar que la sesión se cerró y vuelve a mostrar el enlace/botón de login
    await expect(page.getByRole('link', { name: /login|sign in/i })).toBeVisible();
  });

  test('Verifica el flujo exitoso de creación de un thread sin haber iniciado sesión', async ({ page }) => {
    // 1. Ir a la página principal
    await page.goto('/');

    const content = 'Comentario creado por playwright';
    const author = 'Playwright';

    // 2. Publicar thread usando la función helper
    await createThread(page, content, author);

    // 3. Validar que la página contiene la tarjeta .post del thread recién creado
    const postCard = page.locator('.post').filter({ hasText: content });
    await expect(postCard).toBeVisible();
    await expect(postCard).toContainText(author);
  });
});