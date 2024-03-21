import axios from "@/utils/axios";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

const useAuthStore = create(
  devtools((set, get) => ({
    isAuth: false,
    accessToken: null,
    user: null,
    errorMessage: null,
    controls: {
      setToken: (token) => {
        console.log(token);
        set({ accessToken: token });
      },
      setUser: (user) => {
        console.log(user);
        set({ user: user });
      },
    },
    login: async ({ email, password }) => {
      try {
        const { data, status } = await axios.post("/login", {
          email: email,
          password: password,
        });
        console.log(status);

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
  }))
);

export default useAuthStore;
