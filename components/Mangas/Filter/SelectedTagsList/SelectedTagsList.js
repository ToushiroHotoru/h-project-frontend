import { Tag, TagLabel, TagCloseButton, Box } from "@chakra-ui/react";

export default function SelectedTagsList({
  selectedTags,
  removeTagFromSelected,
}) {
  return (
    <Box mt="0.8em">
      {selectedTags.map((item, i) => {
        return (
          <Tag
            size="md"
            minWidth="100px"
            width="auto"
            key={i + 1}
            variant="solid"
            mx="3px"
            colorScheme="black"
          >
            <TagLabel>{item["name"]}</TagLabel>
            <TagCloseButton
              ml="auto"
              onClick={() => removeTagFromSelected(item["id"])}
            />
          </Tag>
        );
      })}
    </Box>
  );
}
