import { bannersfetch, personalizedSongsFetch } from "./fetches";
import { FetchServerSideProps } from "@/interfaces/music-motion-x";

export const fetchServerSideProps: FetchServerSideProps = async ({
  queryClient,
  ctx,
}) => {
  console.log(ctx.url);
  await Promise.all([
    queryClient.prefetchQuery("/api/banner?type=2", bannersfetch),
    queryClient.prefetchQuery(
      "/api/personalized/newsong",
      personalizedSongsFetch
    ),
  ]);
};
