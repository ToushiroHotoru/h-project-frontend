import { Box, Flex, Center } from "@chakra-ui/react";
import Image from "next/image";
import TagsCss from "../../styles/components/Tags.module.css";

export default function TagDesktop({ data }) {
  return (
    <Box className={TagsCss.tag}>
      <Box className={TagsCss.tagImage}>
        <Image
          src={data.img}
          alt="Picture of the author"
          width={360}
          height={570}
          draggable={false}
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
            {data.desc}
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
    </Box>
  );
}