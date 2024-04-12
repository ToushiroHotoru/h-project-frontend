import axios from "@/utils/axios";

export const getMangaDynamic = async (mangaId) => {
  const dynamicManga = await axios.get(`/manga/dynamic`, {
    params: { route: mangaId },
  });

  return dynamicManga.data.data.manga;
};
