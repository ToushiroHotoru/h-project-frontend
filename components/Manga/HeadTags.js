import MangaHeadCSS from "../../styles/components/MangaHead.module.css";
import { Box, Flex, Skeleton } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { LINK } from "../../libs/changeApiUrl.js";

export default function HeadTags() {
  const [isLoaded, setIsloaded] = useState(true);
  const [tags, setTags] = useState([]);

  const getTagsFunc = async () => {
    try {
      const res = await fetch(`${LINK}/get_tags`);
      const result = await res.json();
      setTags(result.tags);
      console.log(result.tags);
    } catch (err) {
      console.log(err.message);
    }
  };

  useEffect(() => {
    getTagsFunc();
  }, []);

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
                  alt="Picture of the author"
                  width={128}
                  height={128}
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
