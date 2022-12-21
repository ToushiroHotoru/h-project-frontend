import { Box, Flex, Center } from "@chakra-ui/react";
import Image from "next/image";
import TagsCss from "../../styles/components/Tags.module.css";

export default function TagDesktop({ data }) {
  return (
    <Box className={TagsCss.tagWrapper}>
      <Image
        src={data.img}
        alt="Picture of the author"
        width={360}
        height={570}
        draggable={false}
      />
      <Box className={TagsCss.coverWrapper}>
        <Box className={TagsCss.coverDataWrapper}>
          <Box fontSize="20px">{data.name}</Box>
          <Box fontSize="12px" height="100%" mt="10px">
            {data.desc}
          </Box>
          <Box className={TagsCss.countWrapper}>
            {data.count}
            <Image
              src="/manga.png"
              alt="Picture of the author"
              width={24}
              height={26}
              draggable={false}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
