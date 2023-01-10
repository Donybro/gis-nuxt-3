export const getNewsCategories = async function () {
  return await useApi(`/api/information_service/news_categories/`, "GET");
};

export const seeInfoData = async function (id) {
  return await useApi(`/api/information_service/view_count/${id}`, "GET");
};
// /information_service/informationServiceBySlug/

export const getInfoServiceBySlug = async function (
  { submenu_slug, category_id = null, month = null, year = null },
  key,
  page = 1
) {
  return await useApi(
    "/api/information_service/informationServiceBySlug/",
    "GET",
    {
      submenu_slug,
      category: category_id,
      month,
      year,
      page,
      page_size: 9,
    },
    key + page + month + year + category_id
  );
  // return   await useFetchApi('/api/information_service/informationServiceBySlug/','GET',{
  //     submenu_slug,
  //     category_id,
  //     month,
  //     year,
  //     page,
  //     page_size:9
  // })
};

export const getInfographicsBySlug = async function ({ slug }, key) {
  return await useApi(
    `/api/information_service/infographicsBySlug/`,
    "GET",
    {
      submenu_slug: slug,
    },
    key
  );
};
export const getInfoServiceAdditionalInfoBySlug = async function (
  { slug },
  key,
  page
) {
  return await useApi(
    `/api/information_service/additionalInfoBySlug/`,
    "GET",
    {
      submenu_slug: slug,
    },
    key + page
  );
};
export const getInfoServiceAdditionalInfoById = async function (id) {
  return await useApi(`/api/information_service/additional_info/${id}`, "GET");
};

export const getInfoServiceById = async function (id) {
  return await useApi(`/api/information_service/${id}`, "GET");
};
export const getImagesCategory = async function () {
  return await useApi(`/api/gallery/photos/`, "GET");
};
export const getVideosCategory = async function () {
  return await useApi(`/api/gallery/videos/`, "GET");
};
export const getImageById = async function (id) {
  return await useApi(`/api/gallery/photos/${id}`, "GET");
};
export const getVideoById = async function (id) {
  return await useApi(`/api/gallery/videos/${id}`, "GET");
};

export const getOpenData = async function () {
  return await $fetch(`https://data.egov.uz/apiClient/main/gettable`, {
    method: "GET",
    params: {
      orgId: 377,
      limit: 10,
      sortType: 1,
      offset: 0,
    },
  });
};
export const getCustomOpenData = async function () {
  return await useApi(`/api/open_data/openDataBySubmenuSlug/`, "GET", {
    submenu_slug: "/interactive_service/open_data",
  });
};
export const getMainPageNews = async function () {
  return await useApi(`/api/information_service/newsForHomePage/`, "GET", {
    submenu_slug: "/info_service/news",
  });
};
