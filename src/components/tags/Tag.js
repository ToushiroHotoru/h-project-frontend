import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Box, Flex, Skeleton } from "@chakra-ui/react";
import TagsCss from "@/styles/components/Tags.module.css";

export default function TagDesktop({ data }) {
  const [isLoaded, setIsloaded] = useState(false);
  return (
    <Link href={`/mangas?tags=${data._id}`}>
      <a className={TagsCss.tag}>
        <Box className={TagsCss.tagImage}>
          <Image
            src={data.image}
            alt="Picture of the author"
            layout="fill"
            objectFit="cover"
            width={250}
            height={250}
            onLoadingComplete={() => {
              setIsloaded(true);
            }}
          />
        </Box>
        <Box className={TagsCss.tagInfo}>
          <Box className={TagsCss.tagInfoInner}>
            <Box fontSize={{ base: "18px", sm: "20px" }}>{data.name}</Box>
            <Box
              className={TagsCss.tagDescription}
              fontSize="14px"
              height="100%"
              mt="10px"
              overflow="hidden"
              position="relative"
            >
              {data.description}
            </Box>
            <Flex
              className={TagsCss.tagCount}
              alignItems="center"
              justifyContent={{ base: "flex-start", sm: "flex-end" }}
              width="100%"
              pt="8px"
            >
              {data.count}
              <Box ml="10px" height="26px">
                <Image
                  src="/manga.png"
                  alt="Picture of the author"
                  width={24}
                  height={26}
                  draggable={false}
                />
              </Box>
            </Flex>
          </Box>
        </Box>
      </a>
    </Link>
  );
}