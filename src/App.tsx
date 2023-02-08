import React, { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import {
  QueryClient,
  useQueryErrorResetBoundary,
  Hydrate,
  QueryClientProvider,
} from "react-query";

import type { RouteMatch } from "react-router";
import type { DehydratedState } from "react-query";
import type { ProviderProps } from "react-redux";

import routes from "./routes";
import PlayBar from "@/components/PlayBar";
import ErrorFound from "@/components/ErrorPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

interface AppProps {
  store: ProviderProps["store"];
  matchedRoutes?: RouteMatch[];
  dehydratedState?: DehydratedState;
  preloadedState: { [x: string]: any };
  helmetContext: any;
}

const App: React.FC<AppProps> = (props) => {
  const { store, preloadedState, dehydratedState, helmetContext } = props;
  const { reset } = useQueryErrorResetBoundary();

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary, error }) => (
        <Suspense>
          <ErrorFound resetErrorBoundary={resetErrorBoundary} error={error} />
        </Suspense>
      )}
    >
      <Provider store={store} serverState={preloadedState || {}}>
        <QueryClientProvider client={queryClient}>
          <Hydrate state={dehydratedState}>
            <BrowserRouter basename={import.meta.env.BASE_URL}>
              <HelmetProvider context={helmetContext}>
                <Suspense>
                  <PlayBar />
                </Suspense>

                <Routes>
                  {routes.map((r) => (
                    <Route element={r.element} path={r.path} key={r.path}>
                      {r.children &&
                        r.children.length > 0 &&
                        r.children.map((child) => (
                          <Route
                            element={child.element}
                            path={child.path}
                            key={child.path}
                          />
                        ))}
                    </Route>
                  ))}
                  <Route
                    path="*"
                    element={
                      <Suspense>
                        <NotFound />
                      </Suspense>
                    }
                  />
                </Routes>
              </HelmetProvider>
            </BrowserRouter>
          </Hydrate>
        </QueryClientProvider>
      </Provider>
    </ErrorBoundary>
  );
};

export default App;
