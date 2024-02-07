import Image from "next/image";
import { useEffect, useState } from "react";
import { Box, Skeleton } from "@chakra-ui/react";

import useStore from "@/zustand/reader.zustand";

import style from "@/components/reader/readerPage/ReaderPage.module.css";

export default function ReaderPage({ quality, router, mangaPages }) {
  const page = router.query.page ? Number(router.query.page) : 1;
  const [isLoaded, setIsLoaded] = useState(false);
  const { currentPage, mangaTitle } = useStore();
  const { setCurrentPage } = useStore((store) => store.controls);

  console.log(mangaPages[currentPage - 1])

  const prevPage = () => {
    if (currentPage >= 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = () => {
    if (currentPage <= mangaPages.length) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    setCurrentPage(page);
  }, [page]);

  return (
    <Skeleton className={style.button_parent} isLoaded={isLoaded}>
      <Image
        onLoad={(e) => {
          setIsLoaded(true);
        }}
        quality={quality}
        src={mangaPages[currentPage - 1]?.image}
        alt={`${mangaTitle} - страница ${currentPage}`}
        width={mangaPages[currentPage - 1]?.size.width}
        height={mangaPages[currentPage - 1]?.size.height}
      />
      <Box className={style.button_prev} onClick={prevPage}></Box>
      <Box className={style.button_next} onClick={nextPage}></Box>
    </Skeleton>
  );
}
