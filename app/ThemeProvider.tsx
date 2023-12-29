"use client";

import { Theme } from "@radix-ui/themes";
import { PropsWithChildren, useState } from "react";
import Navbar from "./Navbar";
import ThemeSwitcher from "./ThemeSwitcher";

export type ThemeAppearance = "dark" | "light";
export type ThemeAccentColor =
  | "iris"
  | "indigo"
  | "violet"
  | "green"
  | "grass"
  | "cyan"
  | "blue"
  | "brown"
  | "crimson"
  | "tomato"
  | "teal"
  | "ruby"
  | "red"
  | "orange"
  | "jade"
  | "plum"
  | "purple";

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
