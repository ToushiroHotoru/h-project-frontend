import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import {
  Box,
  Flex,
  Skeleton,
} from "@chakra-ui/react";

export default function MangaTile({ props }) {
  const [isLoaded, setIsloaded] = useState(false);

  return (
    <Link href={`/mangas/${props.route}`}>
      <a>
        <Box position="relative">
          <Skeleton isLoaded={isLoaded}>
            <Image
              onLoad={() => {
                setIsloaded(true);
              }}
              src={props.cover}
              layout="responsive"
              alt="pic"
              width={500}
              height={700}
            />
          </Skeleton>

          <Flex
            position="absolute"
            left="0"
            bottom="0"
            zIndex="2"
            width="100%"
            px={{ base: "4px", sm: "8px" }}
            pb={{ base: "4px", sm: "6px" }}
            height={{ base: "50%", sm: "30%" }}
            bgGradient="linear(to-t, rgba(0,0,0,0.8), rgba(0,0,0,0))"
          >
            <Box
              mt="auto"
              maxHeight={{ base: "34px", sm: "48px" }}
              fontSize={{ base: "14px", sm: "18px" }}
              lineHeight="125%"
              overflowY="hidden"
              color="#fff"
            >
              {props.title}
            </Box>
          </Flex>
        </Box>
      </a>
    </Link>
  );
}
