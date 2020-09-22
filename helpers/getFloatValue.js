export const getFloatValue = (string) => {
  const floatValue = string.match(/[+-]?\d+(\.\d+)?/g)[0];

  return floatValue ? parseFloat(parseFloat(floatValue).toFixed(2)) : null;
};
