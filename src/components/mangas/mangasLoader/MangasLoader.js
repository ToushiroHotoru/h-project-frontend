import { Flex, Skeleton } from "@chakra-ui/react";

export default function MangasLoader() {
  return [...Array(24)].map((_, i) => {
    return (
      <Flex flexDirection="column" key={i + 1}>
        <Skeleton height="380px" />
      </Flex>
    );
  });
}
