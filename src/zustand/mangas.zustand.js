import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useMangasStore = create(
  devtools((set) => ({
    viewType: "grid",
    mangas: [],
    mangasTotal: null,
    pageOffset: 24,
    pageStep: 24,
    sortType: { type: "latest", title: "Дата" },
    isMangasLoading: false,
    showMenu: false,
    controls: {
      setViewType: (payload) => set(() => ({ viewType: payload })),
      setMangas: (payload) => set(() => ({ mangas: payload })),
      setTotalMangas: (payload) => set(() => ({ mangasTotal: payload })),
      setPageOffset: (payload) => set(() => ({ pageOffset: payload })),
      setPageStep: (payload) => set(() => ({ pageStep: payload })),
      setSortType: (payload) => set(() => ({ sortType: payload })),
      setMangasLoading: (payload) => set(() => ({ isMangasLoading: payload })),
      setShowMenu: (payload) => set(() => ({ showMenu: payload })),
    },
  }))
);

export default useMangasStore;
