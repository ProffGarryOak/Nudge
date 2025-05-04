import { create } from "zustand";
import { THEMES } from "../constants";

const getThemeObj = (themeName) => THEMES.find(t => t.name === themeName) || THEMES[0];

export const useThemeStore = create((set) => {
  const defaultTheme = localStorage.getItem("nudge-theme") || "nuzzle";
  const themeObj = getThemeObj(defaultTheme);
  return {
    theme: themeObj.name,
    font: themeObj.font,
    setTheme: (themeName) => {
      const themeObj = getThemeObj(themeName);
      localStorage.setItem("nudge-theme", themeObj.name);
      set({ theme: themeObj.name, font: themeObj.font });
    },
  };
});
