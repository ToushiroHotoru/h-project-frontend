import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Box, Flex, Skeleton, useColorModeValue } from "@chakra-ui/react";

import style from "@/components/tags/tag/Tag.module.css";

export default function TagDesktop({ data }) {
  const [isLoaded, setIsloaded] = useState(false);

  const textWrapperBoxShadow = useColorModeValue(
    "0 0 25px 30px #e8e8e8",
    "0 0 25px 30px #000"
  );

  const textWrapperBgColor = useColorModeValue("#e8e8e8", "#000000");
  const textDescriptionGradient = useColorModeValue(
    "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, #e8e8e8 88%)",
    "linear-gradient(to bottom, rgba(255, 255, 255, 0) 0%, rgba(0, 0, 0, 1) 88%)"
  );

  const tagInfoBgGradient = useColorModeValue(
    "linear-gradient(rgba(255, 255, 255, 0) 26%, #e8e8e8 62%)",
    "linear-gradient(rgba(255, 255, 255, 0) 26%, rgba(0, 0, 0, 1) 62%)"
  );

  return (
    <Link href={`/mangas?tags=${data.nameEn}`}>
      <a className={style.tag}>
        <Box
          className={style.tagImage}
          position="relative"
          _before={{ content: '""', pt: "100%", display: "block" }}
        >
          <Skeleton isLoaded={isLoaded}>
            <Image
              src={data.image}
              alt={data.name}
              layout="fill"
              objectFit="cover"
              onLoadingComplete={() => {
                setIsloaded(true);
              }}
            />
          </Skeleton>
        </Box>
        <Box
          className={style.tagInfo}
          position={{ x450: "absolute" }}
          bottom={{ x450: 0 }}
          width="full"
          height="full"
          background={tagInfoBgGradient}
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
            boxShadow={{ base: textWrapperBoxShadow, x450: "none" }}
            bgColor={{ base: textWrapperBgColor, x450: "transparent" }}
          >
            <Box
              fontSize={{ base: "16px", sm: "18px", md: "20px" }}
              lineHeight={1.2}
            >
              {data.name}
            </Box>
            <Box
              fontSize="14px"
              height="100%"
              mt="10px"
              overflow="hidden"
              position="relative"
              _after={{
                content: '""',
                position: "absolute",
                bottom: 0,
                width: "100%",
                height: "50%",
                left: 0,
                background: textDescriptionGradient,
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
