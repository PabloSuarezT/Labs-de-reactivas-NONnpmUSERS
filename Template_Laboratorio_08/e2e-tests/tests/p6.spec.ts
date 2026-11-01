import { test, expect } from '@playwright/test';
import {
  ResetDB,
  exampleThread,
  exampleComments,
  createThreadWithComments,
} from './helper';

test.describe('P6 - Pruebas E2E de página de un thread', () => {
  test.beforeEach(async ({ page }) => {
    await ResetDB(page);
    await createThreadWithComments(page);

    // Vamos al listado de threads y abrimos el primer thread usando la clase .post
    await page.goto('/threads');
    const firstThread = page.locator('.post').first();
    await expect(firstThread).toBeVisible();
    await firstThread.getByRole('button').first().click();
    await expect(page).toHaveURL(/\/threads\/.+/);
  });

  test('Verifica que se muestran los comentarios relacionados a un thread', async ({ page }) => {
    for (const comment of exampleComments) {
      const commentCard = page.locator('.post').filter({ hasText: comment.content });
      await expect(commentCard).toBeVisible();
      await expect(commentCard).toContainText(comment.author);
    }
  });

  test('Verifica que se muestra el contenido del thread abierto en la parte superior del listado de publicaciones', async ({ page }) => {
    const topPost = page.locator('.post').first();
    await expect(topPost).toBeVisible();
    await expect(topPost).toContainText(exampleThread.content);
    await expect(topPost).toContainText(exampleThread.author);
  });

  test('Verifica que existe un formulario de creación de un comentario al inicio de la página', async ({ page }) => {
    const authorInput = page.getByTestId('author');
    const contentInput = page.getByTestId('content');
    const submitButton = page.getByRole('button', { name: 'Post', exact: true });

    await expect(authorInput).toBeVisible();
    await expect(contentInput).toBeVisible();
    await expect(submitButton).toBeVisible();

    // Verifica que el formulario está al inicio de la página (antes del primer post)
    const formBox = await contentInput.boundingBox();
    const firstPostBox = await page.locator('.post').first().boundingBox();
    expect(formBox).not.toBeNull();
    expect(firstPostBox).not.toBeNull();
    expect(formBox!.y).toBeLessThan(firstPostBox!.y);

    // Verifica que permite escribir el contenido del comentario y el nombre del autor (opcional)
    await authorInput.fill('Autor Opcional');
    await contentInput.fill('Nuevo comentario en el thread');
    await expect(authorInput).toHaveValue('Autor Opcional');
    await expect(contentInput).toHaveValue('Nuevo comentario en el thread');
  });
});

