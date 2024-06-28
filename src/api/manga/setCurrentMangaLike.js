import axios from "@/utils/axios";

export const setCurrentMangaLike = async (mangaId) => {
  try {
    const { data: currentManga } = await axios.post(`/manga/set-like`, {
      mangaId,
    });
    return {
      currentLikes: currentManga.data.currentLikes,
      isLiked: currentManga.data.isLiked,
    };
  } catch (error) {
    console.log(error);
    return error;
  }
};
