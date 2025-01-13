/**
 * Test per le funzionalità degli operatori spread e rest
 */

import { 
    combineArrays, 
    mergeObjects, 
    sumAll, 
    cloneArray,
    removeFirstAndCombine 
} from './02_spread_rest';

describe('Spread e Rest Operators', () => {
    test('combineArrays dovrebbe unire due array', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [4, 5, 6];
        expect(combineArrays(arr1, arr2)).toEqual([1, 2, 3, 4, 5, 6]);
    });

    test('mergeObjects dovrebbe unire due oggetti', () => {
        const obj1 = { a: 1, b: 2 };
        const obj2 = { c: 3, d: 4 };
        expect(mergeObjects(obj1, obj2)).toEqual({ a: 1, b: 2, c: 3, d: 4 });
    });

    test('sumAll dovrebbe sommare tutti i numeri passati', () => {
        expect(sumAll(1, 2, 3, 4)).toBe(10);
        expect(sumAll(10, 20)).toBe(30);
        expect(sumAll()).toBe(0);
    });

    test('cloneArray dovrebbe creare una copia indipendente dell\'array', () => {
        const original = [1, 2, 3];
        const clone = cloneArray(original);
        
        expect(clone).toEqual(original);
        expect(clone).not.toBe(original);
    });

    test('removeFirstAndCombine dovrebbe rimuovere il primo elemento e combinare gli array', () => {
        const arr1 = [1, 2, 3];
        const arr2 = [4, 5];
        const arr3 = [6];
        expect(removeFirstAndCombine(arr1, arr2, arr3)).toEqual([2, 3, 4, 5, 6]);
    });
});