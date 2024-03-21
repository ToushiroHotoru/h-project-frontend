import Header from "./header/Header";
import Footer from "./footer/Footer";
import axios from "@/utils/axios";
import { useEffect } from "react";
import useAuthStore from "@/zustand/auth.zustand";
export default function Layout({ children }) {
  const { isAuth } = useAuthStore((state) => state);
  const checkUserOnline = async () => {
    await axios.get("/check-is-online");
  };

  useEffect(() => {
    if (!isAuth) {
      checkUserOnline();
    }
  }, []);

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
