import React, { createContext, useContext, useMemo } from "react";
import resolveTailwindConfig from "tailwindcss/resolveConfig";

import defaultTwConfig from "$/tailwind.config";

const twConfig = resolveTailwindConfig(defaultTwConfig);

type ThemeContextType = {
  theme: {
    colors: typeof twConfig.theme.colors;
  };
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const contextValue = useMemo(
    () => ({
      theme: {
        colors: twConfig.theme.colors,
      },
    }),
    [],
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
