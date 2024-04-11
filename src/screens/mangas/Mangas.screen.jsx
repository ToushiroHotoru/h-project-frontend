import { useEffect } from "react";
import { useRouter } from "next/router";

import useSWR from "swr";
import axios from "@/utils/axios";

import MangasLayout from "@/components/mangas/mangasLayout/MangasLayout";
import MangasErrorLayout from "@/components/mangas/mangasErrorLayout/MangasErrorLayout";
import useMangasStore from "@/zustand/mangas.zustand";
import useTagStore from "@/zustand/tags.zustand";

export default function MangasScreen({ tags }) {
  const router = useRouter();
  const { selectedTag } = useTagStore();
  const { setSelectedTag } = useTagStore((state) => state.controls);
  const {
    setMangas,
    setTotalMangas,
    setPageOffset,
    setPageStep,
    setMangasLoading,
  } = useMangasStore(({ controls }) => controls);

  const { data, error } = useSWR(
    [router.query.page, router.query.sort, router.query.tags, setMangasLoading],
    mangasFetcher
  );

  useEffect(() => {
    setMangas(data?.data.mangas);
    setPageOffset(data?.data.offset);
    setTotalMangas(data?.data.total);
    setPageStep(data?.data.step);
  }, [data?.data]);

  useEffect(() => {
    if (router.query.tags) {
      setSelectedTag(router.query.tags);
    }
  }, [router.isReady]);

  useEffect(() => {
    if (selectedTag.length && router.isReady) {
      router.push({
        pathname: router.pathname,
        query: {
          tags: selectedTag.join(","),
        },
        options: { shallow: true },
      });
    } else {
      // router.push({
      //   pathname: router.pathname,
      //   options: { shallow: true },
      // });
    }
  }, [selectedTag]);

  if (error) {
    return <MangasErrorLayout />;
  }

  return <MangasLayout tags={tags} />;
}

const mangasFetcher = async (page, sort, tags, setMangasLoading) => {
  try {
    setMangasLoading(true);

    const pageQ = page || 1;
    const sortQ = sort || "latest";
    const tagsQ = tags || null;
    const { data, status } = await axios.get("/manga/all", {
      params: { page: pageQ, sort: sortQ, tags: tagsQ },
    });

    setMangasLoading(false);

    if (status !== 200) {
      const error = new Error("An error occurred while fetching the data.");
      error.info = await data;
      throw error;
    }
    return data;
  } catch (error) {
    console.log(error);
  }
};
