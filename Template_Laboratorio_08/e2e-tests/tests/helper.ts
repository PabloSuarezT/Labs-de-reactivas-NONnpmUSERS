/* Temp. Code 4 .spec.ts file to stop getting an error. */

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

export { LogIn, ResetDB };