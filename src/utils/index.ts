export const getFormatPrice = (price: string | number) => {
  const newPrice = price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return `${newPrice} сум`;
};
