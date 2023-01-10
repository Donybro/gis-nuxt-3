export const getMarksYearsListBySlug = async function ({ slug }, key, page) {
  return await useApi(
    `/api/postmarks/years/bySlug/`,
    "GET",
    {
      submenu_slug: slug,
      page,
      page_size: 10,
    },
    key + page
  );
};
export const getMarkByYearId = async function (id, key, page) {
  return await useApi(
    `/api/postmarks/years/${id}`,
    "GET",
    {
      page,
      page_size: 10,
    },
    key + page
  );
};
export const getMarkYearDetailsByYearId = async function (id) {
  return await useApi(`/api/postmarks/${id}`, "GET");
};
