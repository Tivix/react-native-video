export function toTypeString(x) {
  switch (typeof x) {
    case 'object':
      return x instanceof Date
        ? x.toISOString()
        : JSON.stringify(x); // object, null
    case 'undefined':
      return '';
    default: // boolean, number, string
      return x.toString();
  }
}

export function stringsOnlyObject(obj) {
  const strObj = {};

  Object.keys(obj).forEach(x => {
    strObj[x] = toTypeString(obj[x]);
  });

  return strObj;
}
