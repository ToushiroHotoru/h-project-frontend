import { useEffect, useState } from "react";
import axios from "@/utils/axios";

export const useMangaDynamic = (id) => {
  const [mangaDynamic, setMangaDynamic] = useState([]);
  const [isMangaLoading, setIsMangaLoading] = useState(false);
  console.log(11);

  const getDynamicMangaData = async () => {
    try {
      console.log(1);
      setIsMangaLoading(true);
      const mangaDynamicData = await axios.get(`/manga/dynamic`, {
        params: { route: id },
      });
      console.log(2);
      setMangaDynamic(mangaDynamicData.data.data.manga);
      console.log(3);
      setIsMangaLoading(false);
      console.log(4);
    } catch (err) {
      console.log(err);
      setIsMangaLoading(false);
    }
  };

  useEffect(() => {
    console.log(22);
    getDynamicMangaData();
  }, []);

  return { mangaDynamic, isMangaLoading };
};
