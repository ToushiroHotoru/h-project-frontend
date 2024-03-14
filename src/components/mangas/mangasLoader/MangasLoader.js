import { Flex, Skeleton } from "@chakra-ui/react";

export default function MangasLoader() {
  return [...Array(24)].map((_, i) => {
    return (
      <Flex flexDirection="column" key={i + 1}>
        <Skeleton
          width="100%"
          _before={{ content: "''", paddingTop: "140%", display: "block" }}
        />
      </Flex>
    );
  });
}
