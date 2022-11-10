import { Box } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import css from "../../styles/components/Pages.module.css";

export default function Pages({ pages, manga }) {
  return (
    <div className={css.content}>
      {pages
        ? pages.map((item, i) => {
            return (
              <Link href={`/reader?id=${manga._id}&page=${i + 1}`} key={i + 1}>
                <Box minHeight="120px" className={css.page}>
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
  );
}
