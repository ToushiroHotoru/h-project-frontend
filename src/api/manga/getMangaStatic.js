import axios from "@/utils/axios";

export const getMangaStatic = async (mangaId) => {
  const staticManga = await axios.get(`/manga/static`, {
    params: { route: mangaId },
  });

  return staticManga.data.data.manga;
};
