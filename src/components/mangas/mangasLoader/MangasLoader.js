import { Flex, Skeleton } from "@chakra-ui/react";
import useMangasStore from "@/zustand/mangas.zustand";

export default function MangasLoader() {
  const { viewType } = useMangasStore();
  return [...Array(24)].map((_, i) => {
    return (
      <Flex flexDirection="column" key={i + 1}>
        <Skeleton
          width="100%"
          _before={{
            content: "''",
            paddingTop:
              viewType === "list" && window.innerWidth > 600
                ? "23%"
                : viewType === "list" && window.innerWidth < 600
                ? "80%"
                : "140%",
            display: "block",
          }}
        />
      </Flex>
    );
  });
}
