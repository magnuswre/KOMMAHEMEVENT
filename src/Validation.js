"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkIfEmpty = void 0;
const checkIfEmpty = (value) => {
    if (value.trim() === '') {
        return true;
    }
};
exports.checkIfEmpty = checkIfEmpty;
