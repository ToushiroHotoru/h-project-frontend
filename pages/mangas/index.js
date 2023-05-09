import { useState, useEffect } from "react";

import useSWR from "swr";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector, useDispatch } from "react-redux";
import { Skeleton, Flex, Box, HStack, Center } from "@chakra-ui/react";
import { setSelectedTagsTest } from "../../redux/selectedTagsSlice";

import { FiList } from "react-icons/fi";
import { BsImage } from "react-icons/bs";
import Head from "next/head";
import catalog from "../../styles/pages/Catalog.module.css";
import MangaTile from "../../components/Mangas/MangaTile";
import MangaList from "../../components/Mangas/MangaList";
import ErrorWrapper from "../../components/partials/ErrorWrapper";
import Filter from "../../components/Mangas/Filter/Filter";
import Pagination from "../../components/Mangas/Pagination";
import SelectedTagsList from "../../components/Mangas/Filter/SelectedTagsList/SelectedTagsList";
import axiosBack from "../../libs/axiosBack";

export default function Mangas() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isToggled, setIsToggled] = useState(false);
  const selectedTags = useSelector((state) => state.selectedTagsSlice.tags);

  const fetcher = async (selectedTags, page, sort) => {
    if (!router.isReady) return;
    const pageQ = page || 1;
    const sortQ = sort || "latest";
    const tagsQ = selectedTags ? selectedTags.map((item) => item["id"]) : null;
    console.log(tagsQ, "<<<");
    const { data, status } = await axiosBack.get("/mangas", {
      params: { page: pageQ, sort: sortQ, tags: tagsQ },
    });
    if (status !== 200) {
      const error = new Error("An error occurred while fetching the data.");
      error.info = await data;
      throw error;
    }

    return data;
  };

  const { data, error } = useSWR(
    [selectedTags, router.query.page, router.query.sort],
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
      <Head>
        <title>Каталог</title>
      </Head>

      <div className={catalog.catalog}>
        <div className="container">
          <HStack w="100%" align="center" justify="right">
            <Box>
              <SelectedTagsList selectedTags={selectedTags} size={"lg"} />
            </Box>
            <Box>
              <Filter />
            </Box>
            <Box>
              <div className={catalog.toggler}>
                <Center
                  className={`${catalog.toggle_common} ${
                    !isToggled && catalog.toggle_active
                  }`}
                  onClick={() => setIsToggled(false)}
                >
                  <BsImage />
                </Center>
                <Center
                  className={`${catalog.toggle_detail} ${
                    isToggled && catalog.toggle_active
                  }`}
                  onClick={() => setIsToggled(true)}
                >
                  <FiList />
                </Center>
              </div>
            </Box>
          </HStack>

          <div
            className={`${catalog.wrap} ${
              isToggled ? catalog.grid_detail : catalog.grid_common
            }`}
          >
            {!data && <Skeletons />}
            {data && <MangaItems data={data} isToggled={isToggled} />}
          </div>

          {data && (
            <Pagination
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

const Skeletons = () => {
  [...Array(24)].map((_, i) => {
    return (
      <Flex flexDirection="column" key={i + 1}>
        <Skeleton height="380px" />
      </Flex>
    );
  });
};

const MangaItems = ({ data, isToggled }) => {
  return (
    <>
      {data.mangas.map((item, i) => {
        return isToggled ? (
          <MangaList data={item} key={i + 1} />
        ) : (
          <MangaTile props={item} key={i + 1} />
        );
      })}
    </>
  );
};
