export const recursiveRemoveKey = <T extends object>(object: T, key: string) => {
  delete object[key];

  Object.values(object).forEach((value) => {
    if (!(value instanceof Object)) return;

    recursiveRemoveKey(value, key);
  });
};
