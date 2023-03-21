import { useState, useEffect } from "react";

import useSWR from "swr";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton, Flex, Box, HStack, Center } from "@chakra-ui/react";

import Head from "next/head";
import catalog from "../../styles/pages/Catalog.module.css";
import MangaTile from "../../components/Mangas/MangaTile";
import MangaList from "../../components/Mangas/MangaList";
import ErrorWrapper from "../../components/partials/ErrorWrapper";
import Toggler from "../../components/Mangas/Toggler";
import Filter from "../../components/Mangas/Filter/Filter";
import Pagination from "../../components/Mangas/Pagination";
import { LINK } from "../../libs/changeApiUrl.js";

export default function Mangas({ deviceType }) {
  const router = useRouter();
  const [isToggled, setIsToggled] = useState(false);
  const selectedTags = useSelector((state) => state.selectedTagsSlice.tags);
  const dispatch = useDispatch();

  const fetcher = async (url, selectedTags, page, sort) => {
    if (!router.isReady) return;

    const res = await fetch(
      encodeURI(
        url +
          new URLSearchParams({
            page: page ? page : "1",
            sort: sort ? sort : "latest",
            tags: selectedTags ? selectedTags.map((item) => item["id"]) : null,
          })
      )
    );

    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      error.info = await res.json();
      throw error;
    }

    return res.json();
  };

  const { data, error } = useSWR(
    [`${LINK}/mangas?`, selectedTags, router.query.page, router.query.sort],
    fetcher
  );

  if (error) {
    return (
      <ErrorWrapper
        link="/mangas?page=1&sort=latest"
        linkTitle="Перейти на существующую страницу"
      >
        <Image
          src="/manga_cover/cover_error.png"
          layout="intrinsic"
          alt="error"
          width={723}
          height={693}
        />
        <Center color="red" fontSize="24px">
          Error: {error.message}
        </Center>
      </ErrorWrapper>
    );
  }

  // useEffect(() => {
  //   console.log(selectedTags.map((item) => item["id"]));
  // }, [selectedTags]);

  //   useEffect(() => {
  //     if (!router.isReady) return;
  //   }, [router.isReady]);

  return (
    <>
      <Box>
        {selectedTags &&
          selectedTags.map((item, i) => <Box key={i + 1}>{item.name}</Box>)}
      </Box>
      <Head>
        <title>Каталог</title>
      </Head>
      <div className={catalog.catalog}>
        <div className="container">
          <HStack w="100%" align="center" justify="right">
            <Box>
              <Filter router={router} />
            </Box>
            <Box>
              <Toggler
                isToggled={isToggled}
                setIsToggled={(val) => setIsToggled(val)}
              />
            </Box>
          </HStack>

          <div
            className={`${catalog.wrap} ${
              isToggled ? catalog.grid_detail : catalog.grid_common
            }`}
          >
            {!data &&
              [...Array(24)].map((_, i) => {
                return (
                  <Flex flexDirection="column" key={i + 1}>
                    <Skeleton height="380px" />
                  </Flex>
                );
              })}
            {data &&
              data.mangas.map((item, i) => {
                return isToggled ? (
                  <MangaList data={item} key={i + 1} />
                ) : (
                  <MangaTile props={item} key={i + 1} />
                );
              })}
          </div>

          {data && (
            <Pagination
              router={router}
              total={data.total}
              offset={data.offset}
              step={data.step}
            />
          )}
        </div>
      </div>
    </>
  );
}
