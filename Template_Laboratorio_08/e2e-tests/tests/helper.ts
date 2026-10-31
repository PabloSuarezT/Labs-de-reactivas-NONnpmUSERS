import type { Page } from "@playwright/test";

const backendUrl = 'http://localhost:3001';

const LogIn = async (page: Page, username: string, password: string) => {
  await page.goto('/login');
  await page.getByTestId('username').fill(username);
  await page.getByTestId('password').fill(password);
  await page.getByRole('button', { name: 'Sign In' }).click();
};

const ResetDB = async (page: Page) => {
  const response = await page.request.post(
    `${backendUrl}/api/testing/reset`,
  );
  if (!response.ok()) {
    throw new Error(`No se pudo reiniciar la DB: ${response.status()} ${response.statusText()}`);
  }
};

// --- P4: Función helper para publicar un thread ---
const createThread = async (page: Page, content: string, author?: string) => {
  if (author) {
    await page.getByTestId('author').fill(author);
  }
  await page.getByTestId('content').fill(content);
  await page.getByRole('button', { name: 'Post' }).click();
};

export { LogIn, ResetDB, createThread };