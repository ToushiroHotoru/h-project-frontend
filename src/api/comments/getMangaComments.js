import axios from "@/utils/axios";

export const getMangaComments = async (mangaId) => {
  const comments = await axios.get("/comments/manga-comments", {
    params: {
      route: mangaId,
    },
  });
  return comments.data.data.comments;
};
