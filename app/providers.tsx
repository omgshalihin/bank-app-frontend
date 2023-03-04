"use client";

import { SessionProvider } from "next-auth/react";

import { ThemeProvider } from "next-themes";
import type { AppProps } from "next/app";

export default function Providers({ children }: AppProps | any) {
  return (
    <ThemeProvider attribute="class">
      <SessionProvider>{children}</SessionProvider>
    </ThemeProvider>
  );
}
