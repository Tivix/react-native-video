"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stringsOnlyObject = exports.toTypeString = void 0;
function toTypeString(x) {
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
exports.toTypeString = toTypeString;
function stringsOnlyObject(obj) {
    const strObj = {};
    Object.keys(obj).forEach(x => {
        strObj[x] = toTypeString(obj[x]);
    });
    return strObj;
}
exports.stringsOnlyObject = stringsOnlyObject;
