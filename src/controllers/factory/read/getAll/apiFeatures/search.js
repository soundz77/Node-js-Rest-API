import validateSearch from "../../../../../utils/validation/apiFeatures/validateSearch.js";
import checkVarsSet from "../../../../../../base-template/src/utils/validation/checkVarsSet.js";
import apiFeaturesConfig from "../../../../../config/apiFeaturesConfig.js";

// Helper functions to handle different field types
const isNumericField = (field) => {
  const numericFields = apiFeaturesConfig.search.searchFields.numeric;
  return numericFields.includes(field);
};

const isDateField = (field) => {
  const dateFields = apiFeaturesConfig.search.searchFields.date;
  return dateFields.includes(field);
};

// Main function
const search = (query, searchField, searchTerm) => {
  // Ensure all required variables are set
  checkVarsSet({ searchField, searchTerm });

  // Validate the search field and term
  if (!validateSearch(searchField, searchTerm)) {
    return { query, messages: "Invalid search filters not applied." };
  }

  // Search field = number
  if (isNumericField(searchField)) {
    const numericValue = Number(searchTerm);
    if (isNaN(numericValue)) {
      return { query, messages: "Invalid numeric search term." };
    }
    return {
      query: query.where(searchField).equals(numericValue),
      messages: "Numeric search term applied",
    };
  }

  // Search field = date
  if (isDateField(searchField)) {
    const dateValue = new Date(searchTerm);
    if (isNaN(dateValue.getTime())) {
      return { query, messages: "Invalid date search term." };
    }
    return {
      query: query.where(searchField).equals(dateValue),
      messages: "Date search term applied",
    };
  }

  // All other search fields (strings)
  const searchRegex = new RegExp(searchTerm, "i");
  return {
    query: query.where(searchField).regex(searchRegex),
    messages: "Search fields applied",
  };
};

export default search;
