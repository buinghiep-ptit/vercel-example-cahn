import { RefreshTokenHandler } from "@/helpers/refreshTokenHandler";
import * as gtag from "@/lib/gtag";
import { AppPropsWithLayout, GetLayout } from "@/models";
import { createEmotionCache, theme } from "@/utils";
import { CacheProvider, EmotionCache } from "@emotion/react";
import CssBaseline from "@mui/material/CssBaseline";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import { Box } from "@mui/system";
import {
  Hydrate,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/router";
import { ReactElement, ReactNode, useEffect, useState } from "react";
// import '@/assets/scss/material-kit-react.scss?v=1.9.0'
import "../styles/globals.scss";
const isProd = process.env.NODE_ENV === "production";

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
interface AppProps extends AppPropsWithLayout {
  emotionCache?: EmotionCache;
}

const defaultGetLayout: GetLayout = (page: ReactElement): ReactNode => page;

function App({
  Component,
  pageProps,
  emotionCache = clientSideEmotionCache,
}: AppProps) {
  const router = useRouter();
  const [interval, setInterval] = useState<number>(0);
  const [queryClient] = useState<QueryClient>(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 30 * 1000,
          },
        },
      })
  );
  const [mounted, setMounted] = useState(false);

  const getLayout = Component.getLayout ?? defaultGetLayout;
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (isProd) gtag.pageview(url);
    };
    router.events.on("routeChangeComplete", handleRouteChange);
    router.events.on("hashChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
      router.events.off("hashChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <SessionProvider
      session={pageProps.session as any}
      refetchInterval={interval}
    >
      <QueryClientProvider client={queryClient}>
        <Hydrate state={pageProps.dehydratedState}>
          <CacheProvider value={emotionCache}>
            <StyledEngineProvider injectFirst>
              <ThemeProvider theme={theme}>
                <CssBaseline />
                <Box sx={{ visibility: mounted ? "visible" : "hidden" }}>
                  {getLayout(<Component {...pageProps} />)}
                  <RefreshTokenHandler setInterval={setInterval} />
                </Box>
              </ThemeProvider>
            </StyledEngineProvider>
          </CacheProvider>
          <ReactQueryDevtools initialIsOpen={true} />
        </Hydrate>
      </QueryClientProvider>
    </SessionProvider>
  );
}

export default App;
