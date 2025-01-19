import resolveTailwindConfig from "tailwindcss/resolveConfig";
import { createContext, useContext } from "react";

import defaultTwConfig from "$/tailwind.config";

// eslint-disable-next-line unused-imports/no-unused-vars
const twConfig = resolveTailwindConfig(defaultTwConfig);

export type ThemeContextType = {
  theme: {
    colors: typeof twConfig.theme.colors;
  };
};

export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined,
);

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
};
