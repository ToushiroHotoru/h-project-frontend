import axios from "@/utils/axios";
export const getAllTags = async () => {
  const tags = await axios.get(`/tags/all`);

  return tags.data?.data?.tags;
};
