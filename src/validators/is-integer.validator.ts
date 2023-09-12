export const isIntegerValidator = (
  value: any,
  defaultValue: number,
  min = 1,
  max: number | null = null,
): number => {
  if (typeof value !== 'string') {
    return defaultValue;
  }
  const int = parseInt(value, 10);
  if (isNaN(int)) return defaultValue;
  if (int < min) return defaultValue;
  if (max && int > max) return defaultValue;
  return int;
};
