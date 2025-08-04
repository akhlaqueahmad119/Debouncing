export const debounce = (fn, delay) => {
  let id;
  return function (...args) {
    clearTimeout(id);
    id = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
