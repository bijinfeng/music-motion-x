import type { QueryClient } from "react-query";
import type { Store } from "@reduxjs/toolkit";

export type FetchServerSideProps = ({
  store,
  queryClient,
}: {
  queryClient: QueryClient;
  store: Store;
}) => void;
