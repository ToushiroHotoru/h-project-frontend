import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useDisclosure } from "@chakra-ui/react";

import SideDrawer from "../../components/reader/SideDrawer";
import ReaderAlt from "../../components/reader/ReaderAlt";
import ReaderDef from "../../components/reader/ReaderDef";
import useStore from "../../zustand/reader.zustand";
import instance from "../../utils/axios";

export default function Reader() {
  const { setMangaTitle, setMangaPages } = useStore((state) => state.controls);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const router = useRouter();

  const fetchMangaDynamic = async () => {
    try {
      const res = await instance.get("/manga-dynamic", {
        params: {
          id: router.query.id,
        },
      });

      const result = res.data;
      setMangaPages(result.pages);
      setMangaTitle(result.series);
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
      <ReaderDef btnRef={btnRef} onOpen={onOpen} />

      <ReaderAlt btnRef={btnRef} onOpen={onOpen} />

      <SideDrawer isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    </>
  );
}
