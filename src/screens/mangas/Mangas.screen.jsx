import { useEffect } from "react";
import { useRouter } from "next/router";

import useSWR from "swr";
import axios from "@/utils/axios";

import useMangasStore from "@/zustand/mangas.zustand";
import MangasLayout from "@/components/mangas/mangasLayout/MangasLayout";
import MangasErrorLayout from "@/components/mangas/mangasErrorLayout/MangasErrorLayout";

export default function MangasScreen({ tags }) {
  const router = useRouter();
  const { setMangas, setTotalMangas, setPageOffset, setPageStep } =
    useMangasStore(({ controls }) => controls);

  const { data, error } = useSWR(
    [router.query.page, router.query.sort, router.query.tags, router.isReady],
    mangasFetcher
  );

  useEffect(() => {
    setMangas(data?.data.mangas);
    setPageOffset(data?.data.offset);
    setTotalMangas(data?.data.total);
    setPageStep(data?.data.step);
  }, [data?.data]);

  if (error) {
    return <MangasErrorLayout />;
  }

  return <MangasLayout tags={tags} />;
}

const mangasFetcher = async (page, sort, tags) => {
  try {
    const pageQ = page || 1;
    const sortQ = sort || "latest";
    const tagsQ = tags || null;
    const { data, status } = await axios.get("/manga/all", {
      params: { page: pageQ, sort: sortQ, tags: tagsQ },
    });

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
