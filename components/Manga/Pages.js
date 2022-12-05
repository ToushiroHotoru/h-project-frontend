import { Box, Button, Heading } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import css from "../../styles/components/Pages.module.css";
import { useState, useRef } from "react";

export default function Pages({ pages, manga }) {
  const [pagesVisibality, setPagesVisibality] = useState(false);
  const showButton = useRef(null);
  const changePreviewVisability = () => {
    pagesVisibality === false
      ? (pagesVisibality = true)
      : (pagesVisibality = false);
    setPagesVisibality(pagesVisibality);
    pagesVisibality === false
      ? (showButton.current.textContent = "Показать все")
      : (showButton.current.textContent = "Скрыть");
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
                    className={`${css.page} ${i > 5 ? css.page_hidden : ""} ${
                      pagesVisibality ? `${css.page_shown}` : ""
                    }`}
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
      {pages && pages.length > 6 ? (
        <Button
          marginTop="10px"
          marginLeft="auto"
          marginRight="auto"
          ref={showButton}
          onClick={() => changePreviewVisability()}
        >
          Показать все
        </Button>
      ) : (
        ""
      )}
    </section>
  );
}
