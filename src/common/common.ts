

export const waitTime = (tTime: number): Promise<number> => {
  return new Promise((tResolve: (value: number | PromiseLike<number>) => void, tReject: (reason?: unknown) => void) => {
    const timeIndex = setTimeout(() => {
      return tResolve(timeIndex);
    }, tTime);
  });
}
