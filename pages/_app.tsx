import { GetServerSidePropsContext } from "next";
import { Fragment, useState } from "react";
import { AppProps } from "next/app";
import { getCookie, setCookies } from "cookies-next";
import {
  MantineProvider,
  ColorScheme,
  ColorSchemeProvider,
} from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

import "@fontsource/poppins"
import Dashboard from "@/components/Dashboard";
import { useRouter } from "next/router";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme
  );

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (colorScheme === "dark" ? "light" : "dark");
    setColorScheme(nextColorScheme);
    setCookies("mantine-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  const { pathname } = useRouter();

  return (
    <Fragment>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          theme={{
            colorScheme,
            fontFamily: 'Poppins, sans-serif',
            fontFamilyMonospace: 'Poppins, sans-serif',
            headings: { fontFamily: 'Poppins, sans-serif' },
          }}
          withGlobalStyles
          withNormalizeCSS
        >
          <NotificationsProvider>
            {!pathname.includes('/auth') ?
              <Dashboard>
                <Component {...pageProps} />
              </Dashboard>
              :
              <Component {...pageProps} />
            }
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </Fragment>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("mantine-color-scheme", ctx) || "light",
});
