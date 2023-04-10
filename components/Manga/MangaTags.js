import MangaHeadCSS from "../../styles/components/manga/MangaHead.module.css";
import { Box, Flex, Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import Image from "next/image";

export default function MangaTags({ tags }) {
  const [isLoaded, setIsloaded] = useState(false);
  // console.log(tags);
  return (
    <div className={MangaHeadCSS.head_tags}>
      <Flex alignItems="flex-start" flexWrap="wrap" spacing="5px">
        {tags &&
          tags.map((item, i) => {
            return (
              <Skeleton
                isLoaded={isLoaded}
                className={`${MangaHeadCSS.item} `}
                key={i + 1}
              >
                <Image
                  src={item["image"]}
                  onLoadingComplete={() => {
                    setIsloaded(true);
                  }}
                  alt="Picture of the author"
                  layout="fill"
                  fill="strict"
                  objectFit="cover"
                  draggable="false"
                />
                <Box className={`${MangaHeadCSS.tag_name}`}>{item["name"]}</Box>
              </Skeleton>
            );
          })}
      </Flex>
    </div>
  );
}
