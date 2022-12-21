import { Skeleton, SkeletonCircle, SkeletonText } from "@chakra-ui/react";
import css from "../../styles/pages/Reader.module.css";
import Image from "next/image";
import { useState } from "react";

export default function ReaderPage({ quality, router, mangaPages }) {
  const [isLoaded, setIsLoaded] = useState(false);
  return (
    <Skeleton className={css.test_click_next_parent} isLoaded={isLoaded}>
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
        className={css.test_click_prev}
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
        className={css.test_click_next}
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
