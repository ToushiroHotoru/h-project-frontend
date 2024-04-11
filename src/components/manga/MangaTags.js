import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Box, Flex, Skeleton, useColorModeValue } from "@chakra-ui/react";

import MangaHeadCSS from "@/styles/components/manga/MangaHead.module.css";

export default function MangaTags({ tags }) {
  const [isLoaded, setIsloaded] = useState(false);

  const tagNameBgColor = useColorModeValue("#ececec", "#171717");
  return (
    <div className={MangaHeadCSS.head_tags}>
      <Flex alignItems="flex-start" flexWrap="wrap" spacing="5px">
        {tags &&
          tags.map((tagItem, i) => {
            return (
              <Skeleton
                isLoaded={isLoaded}
                className={`${MangaHeadCSS.item} `}
                key={i + 1}
                position="relative"
              >
                <Link href={`/mangas?tags=${tagItem.nameEn}`}>
                  <a>
                    <Image
                      src={tagItem["image"]}
                      onLoadingComplete={() => {
                        setIsloaded(true);
                      }}
                      alt={tagItem["name"]}
                      layout="fill"
                      fill="strict"
                      objectFit="cover"
                      draggable="false"
                    />
                    <Box
                      className={`${MangaHeadCSS.tag_name}`}
                      bgColor={tagNameBgColor}
                    >
                      {tagItem["name"]}
                    </Box>
                  </a>
                </Link>
              </Skeleton>
            );
          })}
      </Flex>
    </div>
  );
}
