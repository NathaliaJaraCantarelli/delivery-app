export const reduceArr = (arr) => arr
  .map((product) => parseFloat(product.quantity) * parseFloat(product.price))
  .reduce((acc, curr) => acc + curr, 0);

export const setLocalStorage = (data) => {
  localStorage.setItem('CustomerProducts', JSON.stringify(data));
};
