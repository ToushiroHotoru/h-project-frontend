import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useDisclosure } from "@chakra-ui/react";

import SideDrawer from "../../components/Reader/SideDrawer";
import ReaderAlt from "../../components/Reader/ReaderAlt";
import ReaderDef from "../../components/Reader/ReaderDef";
import useStore from "../../zustand/reader.zustand";
import instance from "../../libs/instance";

export default function Reader() {
  const { setMangaTitle, setMangaPages } = useStore((state) => state.controls);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();
  const router = useRouter();

  const fetchMangaDynamic = async () => {
    try {
      const res = await instance.post("/manga-dynamic", {
        id: router.query.id,
      });

      const result = res.data;
      console.log("TEST", result);
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
