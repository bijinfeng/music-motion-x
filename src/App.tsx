import React, { Suspense } from "react";
import { once } from "lodash-es";
import { ErrorBoundary } from "react-error-boundary";
import { HelmetProvider } from "react-helmet-async";
import { Routes, Route } from "react-router";
import { useSearchParams } from "react-router-dom";
import {
  QueryClient,
  useQueryErrorResetBoundary,
  Hydrate,
  QueryClientProvider,
} from "react-query";

import routes from "./routes";
import PlayBar from "@/components/PlayBar";
import ErrorFound from "@/components/ErrorPage";
import NotFound from "@/pages/NotFound";
import { useRootStore } from "@/store";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true,
    },
  },
});

const playById = once((id: string) => {
  const { playById, setShowPlayModal } = useRootStore.getState();
  setShowPlayModal(true);
  playById(id, false);
});

const App: React.FC = () => {
  const { reset } = useQueryErrorResetBoundary();
  const [searchParams] = useSearchParams();
  const songId = searchParams.get("id") || "";

  songId && playById(songId);

  return (
    <ErrorBoundary
      onReset={reset}
      fallbackRender={({ resetErrorBoundary, error }) => (
        <Suspense>
          <ErrorFound resetErrorBoundary={resetErrorBoundary} error={error} />
        </Suspense>
      )}
    >
      <QueryClientProvider client={queryClient}>
        <Hydrate>
          <HelmetProvider>
            <PlayBar />
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
              <Route path="*" element={<NotFound />} />
            </Routes>
          </HelmetProvider>
        </Hydrate>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
