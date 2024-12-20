import { Theme } from '@/types/theme';
import React, { createContext, useContext, useState } from 'react';

type ThemeContextType = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const isValidTheme = (theme: string | undefined) => Object.values(Theme).includes(theme as Theme);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  );

  const updateTWTheme = (theme: Theme) => {
    if (theme === Theme.Dark) {
      document.documentElement.classList.add(Theme.Dark);
      document.documentElement.classList.remove(Theme.Light);
    } else {
      document.documentElement.classList.add(Theme.Light);
      document.documentElement.classList.remove(Theme.Dark);
    }
  };

  const updateTheme = (theme: Theme) => {
    if (!isValidTheme(theme)) {
      return;
    }

    localStorage.setItem('theme', theme);
    updateTWTheme(theme);
    setTheme(theme);
  };

  return <ThemeContext.Provider value={{ theme, setTheme: updateTheme }}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
