import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useMangasStore = create(
  devtools((set) => ({
    viewType: "grid",
    mangas: [],
    mangasTotal: null,
    pageOffset: 24,
    pageStep: 24,
    controls: {
      setViewType: (payload) => set(() => ({ viewType: payload })),
      setMangas: (payload) => set(() => ({ mangas: payload })),
      setTotalMangas: (payload) => set(() => ({ mangasTotal: payload })),
      setPageOffset: (payload) => set(() => ({ pageOffset: payload })),
      setPageStep: (payload) => set(() => ({ pageStep: payload })),
    },
  }))
);

export default useMangasStore;
