import { Tag, TagLabel, TagCloseButton, Box } from "@chakra-ui/react";

const removeTagFromSelectedFunc = ({ id, selectedTags }) => {
  return selectedTags.filter((item) => item["id"] != id);
};

export default function SelectedTagsList({ selectedTags, setSelectedTags }) {
  return (
    <Box mt="0.8em">
      {selectedTags.map((item, i) => {
        return (
          <Tag
            key={i + 1}
            size="md"
            minWidth="100px"
            width="auto"
            variant="solid"
            mx="3px"
            colorScheme="black"
          >
            <TagLabel>{item["name"]}</TagLabel>
            <TagCloseButton
              ml="auto"
              onClick={() =>
                setSelectedTags(
                  removeTagFromSelectedFunc({
                    id: item["id"],
                    selectedTags: selectedTags,
                  })
                )
              }
            />
          </Tag>
        );
      })}
    </Box>
  );
}
