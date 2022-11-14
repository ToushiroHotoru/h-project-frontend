import catalog from "../../styles/pages/Catalog.module.css";
import useSWR from "swr";
import MangaTile from "../../components/Mangas/MangaTile";
import MangaList from "../../components/Mangas/MangaList";
import Error from "../../components/partials/Error";
import Image from "next/image";
import Toggler from "../../components/Mangas/Toggler";
import { useState } from "react";
import Filter from "../../components/Mangas/Filter";
import Pagination from "../../components/Mangas/Pagination";
import { useRouter } from "next/router";
import Head from "next/head";
import { Skeleton, Flex, Box, HStack } from "@chakra-ui/react";

export default function Mangas() {
  //   const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const router = useRouter();
  const [isToggled, setIsToggled] = useState(false);

  //   useEffect(() => {
  //     if (!router.isReady) return;
  //   }, [router.isReady]);

  const fetcher = async (url) => {
    if (!router.isReady) return;
    const res = await fetch(url);

    if (!res.ok) {
      const error = new Error("An error occurred while fetching the data.");

      throw error;
    }

    return res.json();
  };

  const { data, error } = useSWR(
    `https://h-project.herokuapp.com/mangas?page=${router.query.page}&sort=${router.query.sort}`,
    // `http://localhost:8080/mangas?page=${router.query.page}&sort=${router.query.sort}`,
    fetcher
  );

  if (error) {
    return (
      <Error>
        <Image
          src="/manga_cover/cover_error.png"
          layout="intrinsic"
          alt="error"
          width={723}
          height={693}
        />
      </Error>
    );
  }

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
                    <Skeleton height="420px" />
                    <Skeleton height="25px" mt="15px" />
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
