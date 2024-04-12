import Header from "./header/Header";
import Footer from "./footer/Footer";
import axios from "@/utils/axios";
import { useEffect } from "react";
import useAuthStore from "@/zustand/auth.zustand";
import { useRouter } from "next/router";

export default function Layout({ children }) {
  const { isAuth } = useAuthStore((state) => state);
  const router = useRouter();
  const checkUserOnline = async () => {
    await axios.get("/user/check-is-online");
  };

  useEffect(() => {
    if (!isAuth) {
      checkUserOnline();
    }
  }, [router.isReady]);

  return (
    <>
      <div className="content">
        <Header />
        <div className="page">{children}</div>
      </div>
      <Footer />
    </>
  );
}
