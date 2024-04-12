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
        {tags.map((tagItem, i) => {
          return (
            <Box
              className={`${MangaHeadCSS.item} `}
              key={tagItem._id}
              position="relative"
            >
              <Link href={`/mangas?tags=${tagItem.nameEn}`}>
                <a>
                  <Skeleton isLoaded={isLoaded}>
                    <Image
                      src={tagItem["image"]}
                      onLoad={() => {
                        setIsloaded(true);
                      }}
                      alt={tagItem["name"]}
                      layout="fill"
                      fill="strict"
                      objectFit="cover"
                      draggable="false"
                    />
                  </Skeleton>
                  <Box
                    className={`${MangaHeadCSS.tag_name}`}
                    bgColor={tagNameBgColor}
                  >
                    {tagItem["name"]}
                  </Box>
                </a>
              </Link>
            </Box>
          );
        })}
      </Flex>
    </div>
  );
}
