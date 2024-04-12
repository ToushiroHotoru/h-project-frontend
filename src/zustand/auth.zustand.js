import axios from "@/utils/axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useAuthStore = create(
  devtools((set, get) => ({
    user: null,
    isAuth: false,
    accessToken: null,
    errorMessage: null,
    isAuthModalShow: false,
    controls: {
      setToken: (token) => {
        set({ accessToken: token });
      },
      setUser: (user) => {
        set({ user: user });
      },
      openAuthModal: () => {
        set({ isAuthModalShow: true });
      },
      closeAuthModal: () => {
        set({ isAuthModalShow: false });
      },
    },
    login: async ({ email, password }) => {
      try {
        const { data, status } = await axios.post("/user/login", {
          email: email,
          password: password,
        });

        if (data.status === "error") {
          set({ isAuth: false, errorMessage: data.message });
          return { isAuth: get().isAuth };
        }

        set({
          isAuth: true,
          accessToken: data.data.accessToken,
          user: data.data.user,
          errorMessage: null,
        });

        return { isAuth: get().isAuth };
      } catch (error) {
        set({ isAuth: false, errors: error });
        return { isAuth: get().isAuth };
      }
    },
    logout: async () => {
      try {
        const { data } = await axios.get("/user/logout");

        if (data.status === "error") {
          set({ isAuth: false, errorMessage: data.message });
        }

        set({
          isAuth: false,
          accessToken: null,
          user: null,
          errorMessage: null,
        });
      } catch (error) {
        console.log(error);
      }
    },
  }))
);

export default useAuthStore;
