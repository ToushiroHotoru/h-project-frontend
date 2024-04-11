import { useRouter } from "next/router";
import { Box, Checkbox, CheckboxGroup, Stack, Input } from "@chakra-ui/react";
import useTagStore from "@/zustand/tags.zustand";

export default function MangasTags({ tags }) {
  const { selectedTag, controls } = useTagStore();

  const getMangasByTags = (e) => {
    const value = e.target.value;

    controls.setSelectedTag(value);
  };

  console.log(selectedTag);

  return (
    <Box>
      <Box fontSize="20px" lineHeight={1.2}>
        Теги
      </Box>
      <Box mt="12px">
        <Input placeholder="Поиск по тегу" />
        <CheckboxGroup colorScheme="pink">
          <Stack spacing={1} direction={["column"]} mt="12px">
            {tags.map((tag) => (
              <Checkbox
                key={tag._id}
                value={tag.nameEn}
                onChange={getMangasByTags}
                isChecked={tag.nameEn === selectedTag}
              >
                {selectedTag.some((storeTag) => storeTag === tag.nameEn)}
                {tag.name}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </Box>
    </Box>
  );
}
