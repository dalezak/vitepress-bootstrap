export function onDebounce(func, wait = 100) {
  let timeout;
  return (...args) => {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      func.apply(context, args);
    }, wait);
  };
}

export const addEvent = (event, handler) => {
  if (window !== undefined) {
    window.addEventListener(event, handler);
  }
};

export const removeEvent = (event, handler) => {
  if (window !== undefined) {
    window.removeEventListener(event, handler);
  }
};