import axios from "@/utils/axios";

export const getMangasPaths = async () => {
  const { data } = await axios.get(`/manga/canonical-paths`);
  return data.data;
};
