import Head from "next/head";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { useDisclosure } from "@chakra-ui/react";

import axios from "@/utils/axios";
import useStore from "@/zustand/reader.zustand";
import ReaderAlt from "@/components/reader/readerAlt/ReaderScroll";
import ReaderDef from "@/components/reader/readerDef/ReaderDef";
import SideDrawer from "@/components/reader/sideDrawer/SideDrawer";

const ReaderMap = dynamic(
  () => import("@/components/reader/readerMap/ReaderMap"),
  {
    ssr: false,
  }
);

export default function Reader() {
  const { setMangaTitle, setMangaPages } = useStore((state) => state.controls);
  const { mangaTitle, readerAltMode } = useStore();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const router = useRouter();

  const fetchMangaDynamic = async () => {
    try {
      const res = await axios.get("/reader-manga-by-id", {
        params: {
          id: router.query.id,
        },
      });

      const result = res.data;

      setMangaPages(result.pages);
      setMangaTitle(result.title);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    fetchMangaDynamic();
  }, [router.isReady]);

  return (
    <>
      <Head>
        <title>{mangaTitle}</title>
      </Head>
      <div className="container">
        {readerAltMode ? (
          <ReaderAlt btnRef={btnRef} onOpen={onOpen} />
        ) : (
          <ReaderDef btnRef={btnRef} onOpen={onOpen} />
        )}
      </div>

      <ReaderMap />
      <SideDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </>
  );
}
