/**
 * Questo modulo copre l'utilizzo degli operatori spread e rest in JavaScript
 */

// Spread operator con array
export const combineArrays = (arr1, arr2) => {
    return [...arr1, ...arr2];
};

// Spread operator con oggetti
export const mergeObjects = (obj1, obj2) => {
    return { ...obj1, ...obj2 };
};

// Rest parameter in funzioni
export const sumAll = (...numbers) => {
    return numbers.reduce((acc, curr) => acc + curr, 0);
};

// Clonazione profonda di un array
export const cloneArray = (arr) => {
    return [...arr];
};

// Esempio di uso combinato di spread e rest
export const removeFirstAndCombine = (arr1, ...arrays) => {
    const [, ...restArr1] = arr1;
    return [...restArr1, ...arrays.flat()];
};