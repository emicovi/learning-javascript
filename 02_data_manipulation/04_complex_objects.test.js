/**
 * Test per la gestione di oggetti complessi
 */

import {
    deepClone,
    deepMerge,
    flattenObject,
    createNestedObject,
    validateSchema,
    transformObject,
    filterObjectProperties
} from './04_complex_objects';

describe('Gestione Oggetti Complessi', () => {
    test('deepClone dovrebbe creare una copia profonda dell\'oggetto', () => {
        const original = {
            a: 1,
            b: { c: 2, d: { e: 3 } },
            f: [1, 2, { g: 3 }]
        };
        const clone = deepClone(original);
        
        expect(clone).toEqual(original);
        expect(clone).not.toBe(original);
        expect(clone.b).not.toBe(original.b);
        expect(clone.f).not.toBe(original.f);
    });

    test('deepMerge dovrebbe unire profondamente due oggetti', () => {
        const target = {
            a: 1,
            b: { c: 2, d: 3 },
            e: { f: 4 }
        };
        const source = {
            b: { c: 5, g: 6 },
            e: { h: 7 }
        };
        const expected = {
            a: 1,
            b: { c: 5, d: 3, g: 6 },
            e: { f: 4, h: 7 }
        };
        
        expect(deepMerge(target, source)).toEqual(expected);
    });

    test('flattenObject dovrebbe appiattire un oggetto nidificato', () => {
        const nested = {
            a: 1,
            b: {
                c: 2,
                d: {
                    e: 3
                }
            }
        };
        const expected = {
            'a': 1,
            'b.c': 2,
            'b.d.e': 3
        };
        
        expect(flattenObject(nested)).toEqual(expected);
    });

    test('createNestedObject dovrebbe creare un oggetto da un path', () => {
        const path = 'a.b.c';
        const value = 42;
        const expected = {
            a: {
                b: {
                    c: 42
                }
            }
        };
        
        expect(createNestedObject(path, value)).toEqual(expected);
    });

    test('validateSchema dovrebbe validare correttamente uno schema', () => {
        const schema = {
            name: 'string',
            age: 'number',
            active: 'boolean'
        };
        
        const validObj = {
            name: 'Mario',
            age: 30,
            active: true
        };
        
        const invalidObj = {
            name: 'Mario',
            age: '30',
            active: true
        };
        
        expect(validateSchema(validObj, schema)).toEqual({ valid: true });
        expect(validateSchema(invalidObj, schema)).toEqual({
            valid: false,
            error: 'Tipo non valido per age: atteso number, ricevuto string'
        });
    });

    test('transformObject dovrebbe trasformare le proprietà secondo le funzioni fornite', () => {
        const obj = {
            name: 'mario rossi',
            age: '30',
            score: '100'
        };
        
        const transformations = {
            name: str => str.toUpperCase(),
            age: str => parseInt(str),
            score: str => parseInt(str)
        };
        
        const expected = {
            name: 'MARIO ROSSI',
            age: 30,
            score: 100
        };
        
        expect(transformObject(obj, transformations)).toEqual(expected);
    });

    test('filterObjectProperties dovrebbe filtrare le proprietà secondo il predicato', () => {
        const obj = {
            name: 'Mario',
            age: 30,
            score: 100,
            active: true
        };
        
        const isNumber = (key, value) => typeof value === 'number';
        const expected = {
            age: 30,
            score: 100
        };
        
        expect(filterObjectProperties(obj, isNumber)).toEqual(expected);
    });
});