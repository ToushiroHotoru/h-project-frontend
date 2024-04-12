import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useMangaStore = create(
  devtools((set) => ({
    isLiked: false,
    currentLikes: null,
    controls: {
      setCurrentLikes: ({ currentLikes, isLiked }) =>
        set(() => ({ isLiked: isLiked, currentLikes: currentLikes })),
    },
  }))
);

export default useMangaStore;
