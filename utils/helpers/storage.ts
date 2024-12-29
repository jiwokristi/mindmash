export const getLocalStorage = (storageKey: string) => {
  const item = window.localStorage.getItem(storageKey);

  return item ? JSON.parse(item) : null;
};

export const setLocalStorage = (storageKey: string, item: string) => {
  window.localStorage.setItem(storageKey, item);
};
