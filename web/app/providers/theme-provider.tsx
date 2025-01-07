import { ThemeAppearance } from '@/types/theme';
import React, { createContext, useContext, useMemo, useState } from 'react';
import resolveTailwindConfig from 'tailwindcss/resolveConfig';
import defaultTwConfig from '$/tailwind.config';

const twConfig = resolveTailwindConfig(defaultTwConfig);

type ThemeContextType = {
  theme: {
    appearance: ThemeAppearance;
    colors: typeof twConfig.theme.colors;
  };
  setTheme: (theme: ThemeAppearance) => void;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

const isValidTheme = (theme: string | undefined) => Object.values(ThemeAppearance).includes(theme as ThemeAppearance);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [themeAppearance, setThemeAppearance] = useState<ThemeAppearance>(
    typeof window !== 'undefined' && localStorage.getItem('theme') === 'dark' ? 'dark' : 'light',
  );

  const updateTWTheme = (theme: ThemeAppearance) => {
    if (theme === ThemeAppearance.Dark) {
      document.documentElement.classList.add(ThemeAppearance.Dark);
      document.documentElement.classList.remove(ThemeAppearance.Light);
    } else {
      document.documentElement.classList.add(ThemeAppearance.Light);
      document.documentElement.classList.remove(ThemeAppearance.Dark);
    }
  };

  const updateTheme = (theme: ThemeAppearance) => {
    if (!isValidTheme(theme)) {
      return;
    }

    localStorage.setItem('theme', theme);
    updateTWTheme(theme);
    setThemeAppearance(theme);
  };

  const contextValue = useMemo(
    () => ({
      theme: {
        appearance: themeAppearance,
        colors: twConfig.theme.colors,
      },
      setTheme: updateTheme,
    }),
    [themeAppearance],
  );

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
};
