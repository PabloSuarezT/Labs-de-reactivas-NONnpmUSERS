const info = (...params: unknown[]) => {
  console.log(...params);
};

const error = (...params: unknown[]) => {
  console.error(...params);
};

export default { info, error };
