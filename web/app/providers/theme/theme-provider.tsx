import type React from "react";
import { useMemo } from "react";
import resolveTailwindConfig from "tailwindcss/resolveConfig";

import { ThemeContext } from "./util";

import defaultTwConfig from "$/tailwind.config";

const twConfig = resolveTailwindConfig(defaultTwConfig);

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
