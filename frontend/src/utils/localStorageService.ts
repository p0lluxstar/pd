'use client';

export const setLocalStorage = <T>(key: string, value: T): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

export const getLocalStorage = <T>(key: string): T[] | null => {
  if (typeof window !== 'undefined') {
    const item = localStorage.getItem(key);
    return item != null ? JSON.parse(item) : null;
  }
  return null;
};

export const removeLocalStorage = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};
