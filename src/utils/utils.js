export const currencyFormatter = (value) => {
  const val = isNaN(value) ? 0 : Number(value);

  return val.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

export const integerFormatter = (value) => {
  const val = isNaN(value) ? 0 : Number(value);

  return val.toLocaleString("en-US");
};
