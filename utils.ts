const errorTypes: string[] = ['Service unavailable', ''];

export const simulateError = (
  errorTypes: string[],
  probability: number,
): string | null => {
  if (Math.random() < probability) {
    return errorTypes[Math.floor(Math.random() * errorTypes.length)];
  }
  return null;
};
