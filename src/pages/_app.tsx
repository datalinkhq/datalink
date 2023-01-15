// $$$$$$$\             $$\               $$\ $$\           $$\
// $$  __$$\            $$ |              $$ |\__|          $$ |
// $$ |  $$ | $$$$$$\ $$$$$$\    $$$$$$\  $$ |$$\ $$$$$$$\  $$ |  $$\
// $$ |  $$ | \____$$\\_$$  _|   \____$$\ $$ |$$ |$$  __$$\ $$ | $$  |
// $$ |  $$ | $$$$$$$ | $$ |     $$$$$$$ |$$ |$$ |$$ |  $$ |$$$$$$  /
// $$ |  $$ |$$  __$$ | $$ |$$\ $$  __$$ |$$ |$$ |$$ |  $$ |$$  _$$<
// $$$$$$$  |\$$$$$$$ | \$$$$  |\$$$$$$$ |$$ |$$ |$$ |  $$ |$$ | \$$\
// \_______/  \_______|  \____/  \_______|\__|\__|\__|  \__|\__|  \__|

// Copyright (c) 2022 Datalink Contributors. All rights reserved.

// This source code is licensed under the AGPL license.
// See LICENSE file in the project root for more details.
// Original licensing can be found in LICENSE in the root
// directory of this source tree.

// import "../styles/globals.css";
import type { AppProps, NextWebVitalsMetric } from "next/app";
import type { AppPropsWithLayout } from "../types";
import Head from "next/head";
import Script from "next/script";
import { useRouter } from "next/router";
import { ThemeProvider, useTheme } from "next-themes";

import "@fortawesome/fontawesome-svg-core/styles.css";
import "../styles/tailwind.css";

import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  /*
  if (pathname !== "/") {
    // @ts-expect-error
    import("../styles/tailwind.css");
  } else {
    // @ts-expect-error
    import("../styles/globals.css");
  }
  */

  return (
    <>
      <Script src="https://analytics.datalink.dev/latest.js" />
      <Head>
        <title>datalink. | Home</title>
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@2.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </Head>
      <ThemeProvider defaultTheme="dark" attribute="class">
        {getLayout(<Component {...pageProps} />)}
      </ThemeProvider>
    </>
  );
}

export default MyApp;
