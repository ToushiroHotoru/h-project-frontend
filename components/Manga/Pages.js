import { Box, Button, Heading } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import css from "../../styles/components/Pages.module.css";
import { useState } from "react";
import {
  BrowserView,
  MobileView,
  isBrowser,
  isMobile,
} from "react-device-detect";

export default function Pages({ pages, manga }) {
  const [pagesVisibality, setPagesVisibality] = useState(false);
  const step = isMobile ? 5 : 11;
  const changePreviewVisability = () => {
    setPagesVisibality(!pagesVisibality);
  };

  return (
    <section className={css.content}>
      <Heading as="h2" size="md" marginBottom="20px">
        Превью страниц
      </Heading>
      <div className={css.content_wrap}>
        {pages
          ? pages.map((item, i) => {
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
                    <Image
                      src={item}
                      alt="Picture of the author"
                      layout="responsive"
                      objectFit="cover"
                      width={250}
                      height={400}
                    />
                  </Box>
                </Link>
              );
            })
          : "это экземпляр, который не содерижит страниц"}
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
