import type { AppProps } from "next/app";
import { createTheme, NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import "../styles/global.css";
import { SSRProvider } from "@react-aria/ssr";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    type: "dark",
    theme: {
      fonts: {
        sans: "'sofia-pro', 'source-han-sans-japanese', sans-serif",
      },
    },
  });
  return (
    <SSRProvider>
      <NextThemesProvider
        defaultTheme="dark"
        attribute="class"
        value={{
          dark: theme.className,
        }}
      >
        <NextUIProvider theme={theme}>
          <Component {...pageProps} />
        </NextUIProvider>
      </NextThemesProvider>
    </SSRProvider>
  );
}

export default MyApp;
