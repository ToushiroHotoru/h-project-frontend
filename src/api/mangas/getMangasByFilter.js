import axios from "@/utils/axios";

/**
 *
 * @param {number} page - текущая страница
 * @param {string} sort - тип сортировки
 * @param {string} tags - выбранные теги
 * @returns {object}
 */

export const getAllMangasByFilter = async (page, sort, tags) => {
  try {
    const pageQuery = page || 1;
    const sortQuery = sort || "latest";

    const query = {
      page: pageQuery,
      sort: sortQuery,
    };

    if (tags) {
      query.tags = tags;
    }

    const { data, status } = await axios.get("/manga/all", { params: query });

    if (status !== 200) {
      const error = {};
      error.message = "Ошибка при загрузки";
      error.code = status;
      throw error;
    }
    return data;
  } catch (e) {
    const error = {};
    error.message = "Ошибка при загрузки";
    error.code = 500;
    throw error;
  }
};
