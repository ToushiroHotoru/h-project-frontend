import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { isMobile } from "react-device-detect";
import { Box, Button, Heading, Skeleton } from "@chakra-ui/react";
import css from "@/styles/components/manga/Pages.module.css";

export default function MangaPages({ pages, manga }) {
  const [pagesVisibality, setPagesVisibality] = useState(false);
  const step = isMobile ? 5 : 11;
  const changePreviewVisability = () => {
    setPagesVisibality(!pagesVisibality);
  };

  const imageIsLoaded = ({ src }) => {
    return src + "?q=5&w=10";
  };
  console.log(pages);
  return (
    <section className={css.content}>
      <Heading as="h2" size="md" marginBottom="20px">
        Превью страниц
      </Heading>
      <div className={css.content_wrap}>
        {pages !== undefined
          ? pages.pages.map((item, i) => {
              return (
                <Link
                  href={`/reader?id=${manga._id}&page=${i + 1}`}
                  key={i + 1}
                >
                  <Box
                    minHeight={120}
                    minWidth={130}
                    className={`${css.page} ${
                      i > step ? css.page_hidden : ""
                    } ${pagesVisibality ? `${css.page_shown}` : ""}`}
                  >
                    <Skeleton isLoaded>
                      <Image
                        src={item}
                        alt={`Picture of the author ${i + 1}`}
                        layout="responsive"
                        objectFit="cover"
                        width={250}
                        height={400}
                        loader={imageIsLoaded}
                      />
                    </Skeleton>
                  </Box>
                </Link>
              );
            })
          : Skeletons()}
      </div>
      {pages && (
        <Button
          marginTop="10px"
          marginLeft="auto"
          marginRight="auto"
          onClick={() => changePreviewVisability()}
        >
          {pagesVisibality ? "Скрыть" : "Показать все"}
        </Button>
      )}
    </section>
  );
}
const Skeletons = () => {
  return [...Array(12)].map((_, i) => {
    return (
      <Box key={i + 1} className={css.page}>
        <Skeleton minHeight={340} minWidth={215} />
      </Box>
    );
  });
};
