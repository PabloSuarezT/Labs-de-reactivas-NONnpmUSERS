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
  await page.getByRole('button', { name: 'Post', exact: true }).click();
};

// --- P6: Datos de ejemplo y función helper para crear un thread con comentarios vía backend ---
const exampleThread = {
  content: 'Thread de ejemplo creado desde el backend',
  author: 'AutorThread',
};

const exampleComments = [
  {
    content: 'Primer comentario de prueba del thread',
    author: 'AutorComentario1',
  },
  {
    content: 'Segundo comentario de prueba del thread',
    author: 'AutorComentario2',
  },
];

const createThreadWithComments = async (page: Page) => {
  const threadResponse = await page.request.post(`${backendUrl}/api/threads`, {
    data: exampleThread,
  });
  if (!threadResponse.ok()) {
    throw new Error(
      `No se pudo crear el thread: ${threadResponse.status()} ${threadResponse.statusText()}`,
    );
  }
  const createdThread = await threadResponse.json();

  for (const comment of exampleComments) {
    const commentResponse = await page.request.post(
      `${backendUrl}/api/threads/${createdThread.id}`,
      { data: comment },
    );
    if (!commentResponse.ok()) {
      throw new Error(
        `No se pudo crear el comentario: ${commentResponse.status()} ${commentResponse.statusText()}`,
      );
    }
  }

  return createdThread;
};

export {
  LogIn,
  ResetDB,
  createThread,
  exampleThread,
  exampleComments,
  createThreadWithComments,
};