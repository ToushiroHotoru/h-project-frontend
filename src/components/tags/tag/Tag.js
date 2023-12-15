import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Box, Flex } from "@chakra-ui/react";

import style from "@/components/tags/tag/Tag.module.css";

export default function TagDesktop({ data }) {
  const [isLoaded, setIsloaded] = useState(false);
  return (
    <Link href={`/mangas?tags=${data._id}`}>
      <a className={style.tag}>
        <Box
          className={style.tagImage}
          position="relative"
          _before={{ content: '""', pt: "100%", display: "block" }}
        >
          <Image
            src={data.image}
            alt={data.name}
            layout="fill"
            objectFit="cover"
            width={250}
            height={250}
            onLoadingComplete={() => {
              setIsloaded(true);
            }}
          />
        </Box>
        <Box
          className={style.tagInfo}
          position={{ x450: "absolute" }}
          bottom={{ x450: 0 }}
          width="full"
          height="full"
          background="linear-gradient(rgba(255, 255, 255, 0) 26%, rgba(0, 0, 0, 1) 62%)"
          zIndex={2}
        >
          <Flex
            position={{ x450: "absolute" }}
            bottom={{ x450: 0 }}
            width="full"
            height={{ base: "100%", x450: "50%" }}
            pt={{ base: "15px", x450: 0 }}
            px="15px"
            pb="15px"
            flexDirection="column"
            boxShadow={{ base: "0 0 29px 30px #000", x450: "none" }}
            bgColor={{ base: "black", x450: "transparent" }}
          >
            <Box fontSize={{ base: "18px", sm: "20px" }}>{data.name}</Box>
            <Box
              fontSize="14px"
              height="100%"
              mt="10px"
              overflow="hidden"
              position="relative"
              _after={{
                content: '""',
                position: 'absolute',
                bottom: 0,
                width: "100%",
                height: "50%",
                left: 0,
                background:
                  "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 88%)",
              }}
            >
              {data.description}
            </Box>
            <Flex
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
          </Flex>
        </Box>
      </a>
    </Link>
  );
}
