import deepFreeze from "../utils/sanitisation/deepFreeze.js";

const apiFeaturesConfig = {
  search: {
    searchFields: {
      all: ["age", "createdAt", "updatedAt", "email", "username", "role"],
      numeric: ["age"],
      date: ["createdAt", "updatedAt"],
      other: ["email", "username", "role"],
    },
  },

  sort: {
    User: {
      permittedFields: [
        "-username",
        "username",
        "-age",
        "age",
        "-email",
        "email",
      ],
    },

    sortLocale: ["de-DE"],
    sortIgnore: "-",
  },

  pagination: {
    minPage: 1,
    maxPage: 20,
    minLimit: 1,
    maxLimit: 20,
  },

  limitFields: {
    minLimit: 1,
    maxLimit: 10,
    User: {
      validFields: ["username", "age", "email", "avatar"],
    },
    maximumLimit: 10,
  },
};

deepFreeze(apiFeaturesConfig);

export default apiFeaturesConfig;
