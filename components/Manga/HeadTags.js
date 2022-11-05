import css from "../../styles/components/MangaHead.module.css";
import { Box, Center, HStack } from "@chakra-ui/react";
import Image from "next/image";

export default function HeadTags({ tags }) {
  return (
    <div className={css.head_tags}>
      <HStack alignItems="flex-start">
        {tags &&
          tags.map((item, i) => {
            return (
              <Box
                borderRadius="5px"
                border="1px solid #fff"
                maxHeight="100px"
                minWidth="80px"
                overflow="hidden"
                key={i + 1}
              >
                <Box>
                  <Image
                    src="/tristana.png"
                    alt="Picture of the author"
                    layout="responsive"
                    objectFit="cover"
                    width={250}
                    height={200}
                  />
                </Box>
                <Center>{item}</Center>
              </Box>
            );
          })}
      </HStack>
    </div>
  );
}
