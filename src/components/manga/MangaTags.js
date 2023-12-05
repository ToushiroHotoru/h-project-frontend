import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Box, Flex, Skeleton } from "@chakra-ui/react";

import MangaHeadCSS from "@/styles/components/manga/MangaHead.module.css";

export default function MangaTags({ tags }) {
  const [isLoaded, setIsloaded] = useState(false);
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
                <Link href={`/mangas?tags=${tagItem._id}`}>
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
                    <Box className={`${MangaHeadCSS.tag_name}`}>
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
