import validateSort from "../../../../../utils/validation/apiFeatures/validateSort.js";
import checkVarsSet from "../../../../../../base-template/src/utils/validation/checkVarsSet.js";

const sort = (query, sortBy, modelName) => {
  checkVarsSet({ query, sortBy, modelName });

  return !validateSort(sortBy, modelName)
    ? { query, messages: "Invalid sort fields. " }
    : {
        query: query.sort(sortBy.toLowerCase().trim()),
        messages: "Sort fields applied. ",
      };
};

export default sort;
