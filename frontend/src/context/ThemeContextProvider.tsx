'use client';

import { createContext, useState, type ReactNode, useEffect } from 'react';
import { setLocalStorage, getLocalStorage } from '../utils/localStorageService';

interface ThemeContextType {
  theme: string;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: ReactNode;
}

const defaultThemeContext: ThemeContextType = {
  theme: 'light',
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

export const ThemeProvider = ({ children }: ThemeProviderProps): JSX.Element => {
  // Инициализация состояния темы с использованием эффекта
  const savedTheme = getLocalStorage('theme') as unknown as string;
  const [theme, setTheme] = useState<string>(savedTheme);

  // Функция переключения темы
  const toggleTheme = (): void => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === 'light' ? 'dark' : 'light';
      setLocalStorage('theme', newTheme);
      return newTheme;
    });
  };

  // Применение темы к документу
  useEffect(() => {
    document.body.className = theme; // Применение темы к <body>
  }, [theme]);

  return <ThemeContext.Provider value={{ theme, toggleTheme }}>{children}</ThemeContext.Provider>;
};
