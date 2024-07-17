import validator from "validator";
import validatePagination from "../../../../../utils/validation/apiFeatures/validatePagination.js";
import checkVarsSet from "../../../../../../base-template/src/utils/validation/checkVarsSet.js";

const pagination = (query, page, limit) => {
  checkVarsSet({ query, page, limit });

  // validate parameters
  if (!validatePagination(page, limit)) {
    return { query, messages: "Pagination filters invalid." };
  }

  // When pagination is applied by default, params are numbers, otherwise they are strings
  if (typeof page !== "number") {
    // Escape and trim inputs
    validator.escape(page.trim());
    validator.escape(limit.trim());

    // Parse to numbers
    parseInt(page, 10);
    parseInt(page, 10);
  }

  // Define pagination
  const skip = (page - 1) * limit;

  // Return query with pagination
  return {
    query: query.skip(skip).limit(limit),
    messages: "Pagination filters applied. ",
  };
};

export default pagination;
