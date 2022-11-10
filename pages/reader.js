import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useDisclosure } from "@chakra-ui/react";
import SideDrawer from "../components/Reader/SideDrawer";
import ReaderAlt from "../components/Reader/ReaderAlt";
import ReaderDef from "../components/Reader/ReaderDef";

export default function Reader() {
  const [mangaPages, setMangaPages] = useState();
  const [mangaTitle, setMangaTitle] = useState();
  const [readerAltMode, setReaderAltMode] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  const onLoadHander = async () => {
    try {
      console.log(router.query.id);
      const res = await fetch("https://h-project.herokuapp.com/manga-dynamic", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: router.query.id }),
      });

      const data = await res.json();
      setMangaPages(data?.pages);
      setMangaTitle(data?.series);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (!router.isReady) return;
    onLoadHander();
  }, [router.isReady]);

  return (
    <>
      <ReaderDef
        mangaTitle={mangaTitle}
        readerAltMode={readerAltMode}
        router={router}
        mangaPages={mangaPages}
        btnRef={btnRef}
        onOpen={onOpen}
      />

      <ReaderAlt
        mangaTitle={mangaTitle}
        id={router.query.id}
        readerAltMode={readerAltMode}
        mangaPages={mangaPages}
        btnRef={btnRef}
        onOpen={onOpen}
      />

      <SideDrawer
        readerAltMode={readerAltMode}
        isOpen={isOpen}
        onClose={onClose}
        btnRef={btnRef}
        setReaderAltMode={() => {
          setReaderAltMode(!readerAltMode);
        }}
      />
    </>
  );
}
