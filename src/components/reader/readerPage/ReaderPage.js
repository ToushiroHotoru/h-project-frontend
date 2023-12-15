import Image from "next/image";
import { useState } from "react";

import { Skeleton } from "@chakra-ui/react";

import style from "@/components/reader/readerPage/ReaderPage.module.css";

export default function ReaderPage({ quality, router, mangaPages }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Skeleton className={style.button_parent} isLoaded={isLoaded}>
      <Image
        onLoadingComplete={() => {
          setIsLoaded(true);
        }}
        quality={quality}
        src={
          router.query.page == 0
            ? mangaPages[0]
            : mangaPages[router.query.page - 1]
        }
        alt="Picture of the author"
        width={700}
        height={1000}
      />
      <div
        className={style.button_prev}
        onClick={() => {
          if (Number(router.query.page) <= 1 ? false : true) {
            router.push(
              `/reader?id=${router.query.id}&page=${
                Number(router.query.page) - 1
              }`,
              undefined,
              {
                shallow: true,
              }
            );
          }
        }}
      ></div>
      <div
        className={style.button_next}
        onClick={() => {
          if (
            mangaPages && mangaPages.length <= Number(router.query.page)
              ? false
              : true
          ) {
            router.push(
              `/reader?id=${router.query.id}&page=${
                Number(router.query.page) + 1
              }`,
              undefined,
              {
                shallow: true,
              }
            );
          }
        }}
      ></div>
    </Skeleton>
  );
}
