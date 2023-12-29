"use client";

import { Theme, ThemeAccentColor, ThemeAppearance } from "@radix-ui/themes";
import { PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";
import ThemeSwitcher from "./ThemeSwitcher";

export type Theme = {
  mode: ThemeAppearance;
  accent: ThemeAccentColor;
};

const ThemeProvider = ({ children }: PropsWithChildren) => {
  const [theme, setTheme] = useState<Theme>({
    mode: "dark",
    accent: "violet",
  });
  return (
    <Theme appearance={theme.mode} accentColor={theme.accent}>
      <Navbar>
        <ThemeSwitcher onThemeChange={setTheme} theme={theme} />
      </Navbar>
      {children}
    </Theme>
  );
};
export default ThemeProvider;
