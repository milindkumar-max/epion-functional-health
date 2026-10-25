import React, { createContext, useContext, useEffect, useState } from 'react';

export type BackgroundTheme =
  | 'ivory'       // Warm Ivory (Refined natural studio paper)
  | 'sage'        // Muted Sage (Botanical clinical calm)
  | 'sand'        // Muted Sand (Warm travertine / linen)
  | 'forest'      // Deep Forest (Nocturnal emerald laboratory)
  | 'obsidian'    // Obsidian Modern (Sleek dark tech-bio aesthetic)
  | 'chalk';      // Pure Chalk Minimal (Crisp high-contrast Scandinavian modern)

export type FontStyleMode =
  | 'editorial-serif'  // Modern Editorial: Newsreader & Plus Jakarta Sans
  | 'modern-sans'      // Contemporary Clean: Instrument Sans & Inter
  | 'display-serif';   // Confident Sculptural: DM Serif Display & Plus Jakarta Sans

interface ThemeContextType {
  theme: BackgroundTheme;
  setTheme: (theme: BackgroundTheme) => void;
  fontStyle: FontStyleMode;
  setFontStyle: (font: FontStyleMode) => void;
  cycleTheme: () => void;
}

const THEME_STORAGE_KEY = 'epion_bg_theme';
const FONT_STORAGE_KEY = 'epion_font_style';

const ThemeContext = createContext<ThemeContextType>({
  theme: 'ivory',
  setTheme: () => {},
  fontStyle: 'editorial-serif',
  setFontStyle: () => {},
  cycleTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setThemeState] = useState<BackgroundTheme>(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE_KEY) as BackgroundTheme;
      if (stored && ['ivory', 'sage', 'sand', 'forest', 'obsidian', 'chalk'].includes(stored)) {
        return stored;
      }
    } catch {
      // ignore
    }
    return 'ivory';
  });

  const [fontStyle, setFontStyleState] = useState<FontStyleMode>(() => {
    try {
      const stored = localStorage.getItem(FONT_STORAGE_KEY) as FontStyleMode;
      if (stored && ['editorial-serif', 'modern-sans', 'display-serif'].includes(stored)) {
        return stored;
      }
    } catch {
      // ignore
    }
    return 'editorial-serif';
  });

  const setTheme = (newTheme: BackgroundTheme) => {
    setThemeState(newTheme);
    try {
      localStorage.setItem(THEME_STORAGE_KEY, newTheme);
    } catch {
      // ignore
    }
  };

  const setFontStyle = (newFont: FontStyleMode) => {
    setFontStyleState(newFont);
    try {
      localStorage.setItem(FONT_STORAGE_KEY, newFont);
    } catch {
      // ignore
    }
  };

  const cycleTheme = () => {
    const themes: BackgroundTheme[] = ['ivory', 'sage', 'sand', 'chalk', 'forest', 'obsidian'];
    const nextIdx = (themes.indexOf(theme) + 1) % themes.length;
    setTheme(themes[nextIdx]);
  };

  useEffect(() => {
    // Reflect dataset attributes on <html> for CSS tokens
    document.documentElement.dataset.theme = theme;
    document.documentElement.dataset.font = fontStyle;
  }, [theme, fontStyle]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, fontStyle, setFontStyle, cycleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
