import { create } from "zustand";

const useStore = create((set) => ({
  showMap: false,
  quality: 50,
  mangaTitle: "",
  readerAltMode: false,
  mangaPages: [],

  controls: {
    setShowMap: (payload) => set(() => ({ showMap: payload })),

    setQuality: (payload) => set(() => ({ quality: payload })),

    setMangaTitle: (payload) => set(() => ({ mangaTitle: payload })),

    setReaderAltMode: (payload) => set(() => ({ readerAltMode: payload })),

    setMangaPages: (payload) => set(() => ({ mangaPages: payload })),
  },
}));

export default useStore;
