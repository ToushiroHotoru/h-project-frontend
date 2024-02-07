import axios from "@/utils/axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useAuthStore = create(
  devtools((set, get) => ({
    isAuth: false,
    accessToken: null,
    user: null,
    errors: null,
    controls: {
      setToken: (token) => {
        set({ accessToken: token });
      },
    },
    login: async ({ email, password }) => {
      try {
        const { data } = await axios.post("/api/login", {
          email: email,
          password: password,
        });

        set({
          isAuth: true,
          accessToken: data.accessToken,
          user: data.user,
          errors: null,
        });

        return { isAuth: get().isAuth };
      } catch (error) {
        console.log(error);
        set({ isAuth: false, errors: error });
      }
    },
  }))
);

export default useAuthStore;
