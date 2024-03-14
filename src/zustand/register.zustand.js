import { create } from "zustand";

const useRegistorStore = create((set) => ({
  stage: 1,
  userId: "6443dd58db0e525d6f77f2be",
  favorites: [],
  maskots: [
    "/maskot.png",
    "/maskot4.png",
    "/maskot2.png",
    "/maskot2.png",
    "/maskot4.png",
    "/maskot4.png",
  ],
  speeches: [
    "Fuck u)",
    "Успешно зарегистрировался",
    "I like cookies)",
    "My fav color is orange)",
    "Welcome)",
    "Настройка завершена",
  ],

  controls: {
    setRegisterStage: (payload) => set(() => ({ stage: payload })),

    setUserId: (payload) => set(() => ({ userId: payload })),

    setFavorites: (payload) => set(() => ({ favorites: payload })),

    setMaskots: (payload) => set(() => ({ maskots: payload })),

    setSpeeches: (payload) => set(() => ({ speeches: payload })),
  },
}));

export default useRegistorStore;
