import apiFeaturesConfig from "../../../config/apiFeaturesConfig.js";
import checkVarsSet from "../../../../base-template/src/utils/validation/checkVarsSet.js";

const validatePagination = (page, limit) => {
  checkVarsSet({ page, limit });

  // Parse to numbers for validation
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);

  // Check if the values are numbers
  if (isNaN(pageNumber) || isNaN(limitNumber)) {
    return false;
  }

  // Check page is in range
  const isPageInRange =
    pageNumber >= apiFeaturesConfig.pagination.minPage &&
    pageNumber <= apiFeaturesConfig.pagination.maxPage;

  // Check limit is in range
  const isLimitInRange =
    limitNumber >= apiFeaturesConfig.pagination.minLimit &&
    limitNumber <= apiFeaturesConfig.pagination.maxLimit;

  return isPageInRange && isLimitInRange;
};

export default validatePagination;
