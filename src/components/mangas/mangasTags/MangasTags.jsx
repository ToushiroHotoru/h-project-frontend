import { useRouter } from "next/router";
import { useEffect, useRef } from "react";

import { Box, Checkbox, CheckboxGroup, Stack, Input } from "@chakra-ui/react";

export default function MangasTags({ tags }) {
  const router = useRouter();

  const setQueryTags = (event) => {
    if (router.query.tags) {
      const tags = router.query.tags.split(",").filter(Boolean);

      if (!event.target.checked && tags.includes(event.target.value)) {
        const excludedTags = tags.filter((tag) => tag !== event.target.value);
        if (excludedTags.length) {
          router.push({
            pathname: router.pathname,
            query: {
              tags: excludedTags.join(","),
            },
            options: { shallow: true },
          });
        } else {
          return router.push({
            pathname: router.pathname,
            options: { shallow: true },
          });
        }
      } else if (event.target.checked && !tags.includes(event.target.value)) {
        tags.push(event.target.value);
        router.push({
          pathname: router.pathname,
          query: {
            tags: tags.join(","),
          },
          options: { shallow: true },
        });
      }
    } else {
      router.push({
        pathname: router.pathname,
        query: {
          tags: event.target.value,
        },
        options: { shallow: true },
      });
    }
  };


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
                onChange={setQueryTags}
                isChecked={tag.checked}
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
