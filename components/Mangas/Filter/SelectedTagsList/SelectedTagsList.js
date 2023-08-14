import { Tag, TagLabel, TagCloseButton, Box } from "@chakra-ui/react";
import { setSelectedTagsTest } from "../../../../redux/selectedTagsSlice";
import { useSelector, useDispatch } from "react-redux";

export default function SelectedTagsList({
  selectedTags,
  size,
  setSelectedTags,
}) {
  const dispatch = useDispatch();
  const removeTagFromSelectedFunc = ({ id, selectedTags }) => {
    setSelectedTags(selectedTags.filter((item) => item["id"] != id));
    // dispatch(
    //   setSelectedTagsTest(selectedTags.filter((item) => item["id"] != id))
    // );
  };

  return (
    <Box display="flex" flexWrap="nowrap" overflow="auto">
      {selectedTags.map((item, i) => {
        return (
          <Tag
            key={i + 1}
            size={size}
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
                removeTagFromSelectedFunc({
                  selectedTags: selectedTags,
                  id: item["id"],
                })
              }
            />
          </Tag>
        );
      })}
    </Box>
  );
}
