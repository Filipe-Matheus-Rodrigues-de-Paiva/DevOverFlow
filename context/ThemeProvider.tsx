/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

interface IChildren {
  children: React.ReactNode;
}

interface IProps {
  mode: string;
  setMode: (mode: string) => void;
}

const ThemeContext = createContext({} as IProps);

export const ThemeProvider = ({ children }: IChildren) => {
  const [mode, setMode] = useState("");

  const handleThemeChange = () => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      setMode("dark");
      document.documentElement.classList.add("dark");
    } else {
      setMode("light");
      document.documentElement.classList.remove("dark");
    }
  };

  useEffect(() => {
    handleThemeChange();
  }, [mode]);

  return (
    <ThemeContext.Provider value={{ mode, setMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export function useTheme() {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }

  return context;
}
