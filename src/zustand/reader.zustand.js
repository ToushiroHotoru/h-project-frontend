import { create } from "zustand";

const useReaderStore = create((set) => ({
  showMap: false,
  quality: 50,
  mangaTitle: "",
  readerAltMode: false,
  mangaPages: [],
  currentPage: 1,
  controls: {
    setShowMap: (payload) => set(() => ({ showMap: payload })),

    setQuality: (payload) => set(() => ({ quality: payload })),

    setMangaTitle: (payload) => set(() => ({ mangaTitle: payload })),

    setReaderAltMode: (payload) => set(() => ({ readerAltMode: payload })),

    setMangaPages: (payload) => set(() => ({ mangaPages: payload })),

    setCurrentPage: (payload) => set(() => ({ currentPage: payload })),
  },
}));

export default useReaderStore;
