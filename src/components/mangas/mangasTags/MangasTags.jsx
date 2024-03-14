import { Box, Checkbox, CheckboxGroup, Stack, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function MangasTags({ tags }) {
  const router = useRouter();

  const [selectedTags, setSelectedTags] = useState([]);
  const sort = router.query.sort ? { sort: router.query.sort } : {};

  const getMangasByTags = (e) => {
    const value = e.target.value;
    const isChecked = e.target.checked;

    setSelectedTags((prev) => {
      if (!isChecked && prev.some((prev) => prev === value)) {
        return [...prev.filter((tag) => tag !== value)];
      } else {
        return [...prev, value];
      }
    });
  };

  useEffect(() => {
    if (selectedTags.length) {
      router.push({
        pathname: `/mangas`,
        query: {
          ...sort,
          tags: selectedTags.join(","),
        },
        options: { shallow: true },
      });
    } else {
      router.push({
        pathname: `/mangas`,
        query: {
          ...sort,
        },
        options: { shallow: true },
      });
    }
  }, [selectedTags]);

  return (
    <Box>
      <Box fontSize="20px" lineHeight={1.2}>
        Теги
      </Box>
      <Box mt="12px">
        <Input placeholder="Поиск по тегу" />
        <CheckboxGroup colorScheme="pink" defaultValue={[router.query.tags]}>
          <Stack spacing={1} direction={["column"]} mt="12px">
            {tags.map((tag) => (
              <Checkbox
                key={tag._id}
                value={tag.nameEn}
                onChange={getMangasByTags}
              >
                {tag.name}
              </Checkbox>
            ))}
          </Stack>
        </CheckboxGroup>
      </Box>
    </Box>
  );
}
