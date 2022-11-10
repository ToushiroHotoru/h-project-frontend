import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { useDisclosure } from "@chakra-ui/react";
import SideDrawer from "../components/Reader/SideDrawer";
import ReaderAlt from "../components/Reader/ReaderAlt";
import ReaderDef from "../components/Reader/ReaderDef";

export default function Reader() {
  const [mangaPages, setMangaPages] = useState();
  const [readerAltMode, setReaderAltMode] = useState(false);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(async () => {
    if (!router.isReady) return;
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
    } catch (err) {
      console.log(err);
    }
  }, [router.isReady]);

  return (
    <>
      <ReaderDef
        readerAltMode={readerAltMode}
        router={router}
        mangaPages={mangaPages}
        btnRef={btnRef}
        onOpen={onOpen}
      />

      <ReaderAlt
        id={router.query.id}
        readerAltMode={readerAltMode}
        mangaPages={mangaPages}
        btnRef={btnRef}
        onOpen={onOpen}
      />

      <SideDrawer
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
