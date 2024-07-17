import search from "../../../controllers/factory/read/getAll/apiFeatures/search.js";
import sort from "../../../controllers/factory/read/getAll/apiFeatures/sort.js";
import pagination from "../../../controllers/factory/read/getAll/apiFeatures/pagination.js";
import limitFields from "../../../controllers/factory/read/getAll/apiFeatures/limitFields.js";
import applyDefaultFilters from "./applyDefaultFilters.js";

const buildQuery = (Model, filters) => {
  let query = Model.find();
  let messages = [];
  const modelName = Model.modelName;

  // Defaults can be overridden below if they are valid
  applyDefaultFilters(query, messages);

  // Search
  filters.searchField && filters.searchTerm
    ? ({ query, messages } = search(
        query,
        filters.searchField,
        filters.searchTerm
      ))
    : null;

  // Sort
  filters.sort
    ? ({ query, messages } = sort(query, filters.sort, modelName))
    : null;

  // Pagination
  filters.page && filters.limit
    ? ({ query, messages } = pagination(
        query,
        filters.page,
        filters.limit,
        messages
      ))
    : null;

  // Limit fields
  filters.limitFields
    ? ({ query, messages } = limitFields(query, filters.limitFields, modelName))
    : null;

  // Join messages into a single string
  // const message = messages.join(". ");
  return { query, messages };
};

export default buildQuery;
