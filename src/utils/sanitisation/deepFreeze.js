const deepFreeze = (obj) => {
  // Retrieve the property names defined on obj
  const propNames = Object.getOwnPropertyNames(obj);

  // Freeze properties before freezing self
  propNames.forEach((name) => {
    const prop = obj[name];

    // If prop is an object, recursively freeze it
    if (typeof prop === "object" && prop !== null && !Object.isFrozen(prop)) {
      deepFreeze(prop);
    }
  });

  // Freeze self
  return Object.freeze(obj);
};

export default deepFreeze;
