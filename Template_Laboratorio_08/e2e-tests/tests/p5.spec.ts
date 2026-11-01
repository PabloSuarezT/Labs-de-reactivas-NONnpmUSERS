import { test, expect } from '@playwright/test';
import { LogIn, ResetDB, createThread } from './helper';

const backendUrl = 'http://localhost:3001';

test.describe('P5 - Pruebas E2E', () => {
  // Reiniciamos la base de datos de pruebas antes de cada test.
  test.beforeEach(async ({ page }) => {
    await ResetDB(page);
  });

  test('al crear un thread con sesión iniciada, el autor es el username de la sesión', async ({ page }) => {
    const username = 'p5-user';
    const password = 'password123';
    const content = 'Thread creado con sesión iniciada';

    // 1. Creamos el usuario directamente en el backend.
    const response = await page.request.post(`${backendUrl}/api/users`, {
      data: { username, email: 'p5user@example.com', password },
    });  
    expect(response.status()).toBe(201);

    // 2. Iniciamos sesión con el helper y esperamos llegar a /threads.
    await LogIn(page, username, password);
    await expect(page).toHaveURL(/\/threads$/);
    await expect(page.getByText(username)).toBeVisible();

    // 3. Creamos el thread escribiendo un autor DISTINTO al usuario,
    //    para comprobar que el backend usa el username de la sesión.
    await createThread(page, content, 'Otro Nombre');

    // 4. Buscamos la tarjeta .post del thread recién creado.
    const postCard = page.locator('.post').filter({ hasText: content });
    await expect(postCard).toBeVisible();
    await expect(postCard).toContainText(username);
    await expect(postCard).not.toContainText('Otro Nombre');
  });

  test('no se permite crear un thread si el contenido está vacío', async ({ page }) => {
    await page.goto('/threads');

    // 1. Esperamos a que termine de cargar: la base está vacía (0 threads).
    await expect(page.getByText('Han creado 0 threads!')).toBeVisible();
    await expect(page.locator('.post')).toHaveCount(0);

    // 2. Intentamos publicar con el contenido vacío (solo el botón Post).
    await page.getByRole('button', { name: 'Post' }).click();

    // 3. No se creó ningún thread ni apareció el aviso de éxito.
    await expect(page.locator('.post')).toHaveCount(0);
    await expect(page.getByText('Han creado 0 threads!')).toBeVisible();
    await expect(page.getByText('Thread creado exitosamente')).not.toBeVisible();
  });
});