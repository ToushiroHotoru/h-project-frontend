import axios from "@/utils/axios";

export const getLastPublishedMangas = async () => {
  const lastPublishedMangas = await axios.get("/manga/last-published-mangas");

  return lastPublishedMangas.data.data.mangas;
};

export const getMostViewedMangasOnLastWeek = async () => {
  const mostViewedMangasOnLastWeek = await axios.get(
    "/manga/last-most-viewed-mangas"
  );

  return mostViewedMangasOnLastWeek.data.data.mangas;
};

export const getMostLikedMangasOnLastWeek = async () => {
  const mostLikedMangasOnLastWeek = await axios.get(
    "/manga/last-most-liked-mangas"
  );

  return mostLikedMangasOnLastWeek.data.data.mangas;
};
