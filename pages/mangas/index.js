import Head from "next/head";
import { useRouter } from "next/router";
import { Skeleton, Flex, Box, HStack, Center } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import useSWR from "swr";

import catalog from "../../styles/pages/Catalog.module.css";
import MangaTile from "../../components/Mangas/MangaTile";
import MangaList from "../../components/Mangas/MangaList";
import ErrorWrapper from "../../components/partials/ErrorWrapper";
import Toggler from "../../components/Mangas/Toggler";
import Filter from "../../components/Mangas/Filter";
import Pagination from "../../components/Mangas/Pagination";
import { LINK } from "../../libs/changeApiUrl.js";

export default function Mangas({ deviceType }) {
  //   const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const router = useRouter();
  const [isToggled, setIsToggled] = useState(false);

  const fetcher = async (url) => {
    if (!router.isReady) return;
    const res = await fetch(url);

    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");
      error.info = await res.json();
      throw error;
    }

    return res.json();
  };

  const { data, error } = useSWR(
    `${LINK}/mangas?page=${router.query.page}&sort=${router.query.sort}`,
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
          Error: {error.info.message}
        </Center>
      </ErrorWrapper>
    );
  }

  //   useEffect(() => {
  //     if (!router.isReady) return;
  //   }, [router.isReady]);

  return (
    <>
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
                setIsToggled={(val) => {
                  setIsToggled(val);
                }}
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
