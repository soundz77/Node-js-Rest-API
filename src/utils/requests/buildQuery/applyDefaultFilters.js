import pagination from "../../../controllers/factory/read/getAll/apiFeatures/pagination.js";
import apiFeaturesConfig from "../../../config/apiFeaturesConfig.js";

const applyDefaultFilters = (query) => {
  return {
    query: pagination(
      query,
      apiFeaturesConfig.pagination.minPage,
      apiFeaturesConfig.pagination.maxPage
    ),
    messages: "Default pagination applied.",
  };
};

export default applyDefaultFilters;
