import { Box } from "@chakra-ui/react";

export default function TagsList({ tags, addToSelectedTags }) {
  console.log("TAGS", tags);
  return (
    <Box backgroundColor="#000" maxHeight="200px" overflowY="auto">
      {tags &&
        tags.map((item, i) => {
          return (
            <Box
              key={i + 1}
              lineHeight="35px"
              borderBottom="1px solid gray"
              padding="0 10px"
              cursor="pointer"
              onClick={() => addToSelectedTags(item)}
            >
              {` ${item["name"]}  (${item["count"]})`}
            </Box>
          );
        })}
    </Box>
  );
}
