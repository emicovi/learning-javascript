/**
 * Test per la manipolazione JSON
 */

import {
    isValidJSON,
    safeJSONParse,
    safeJSONStringify,
    transformJSON,
    sanitizeJSON,
    jsonDiff,
    compressJSON
} from './05_json_manipulation';

describe('JSON Manipulation', () => {
    test('isValidJSON dovrebbe validare correttamente le stringhe JSON', () => {
        expect(isValidJSON('{"name": "Mario", "age": 30}')).toBe(true);
        expect(isValidJSON('{"invalid": "json"')).toBe(false);
        expect(isValidJSON('not json at all')).toBe(false);
    });

    test('safeJSONParse dovrebbe gestire il parsing in modo sicuro', () => {
        const validJSON = '{"name": "Mario", "age": 30}';
        const invalidJSON = '{"invalid": json}';
        
        expect(safeJSONParse(validJSON)).toEqual({ name: 'Mario', age: 30 });
        expect(safeJSONParse(invalidJSON, {})).toEqual({});
        expect(safeJSONParse(invalidJSON)).toBe(null);
    });

    test('safeJSONStringify dovrebbe gestire riferimenti circolari', () => {
        const obj = { name: 'Mario' };
        obj.self = obj;  // riferimento circolare
        
        expect(() => JSON.stringify(obj)).toThrow();
        expect(safeJSONStringify(obj)).toContain('[Circular Reference]');
    });

    test('transformJSON dovrebbe trasformare i dati secondo lo schema', () => {
        const json = {
            name: 'mario rossi',
            age: '30',
            scores: ['100', '95', '98']
        };
        
        const schema = {
            name: str => str.toUpperCase(),
            age: str => parseInt(str),
            scores: arr => arr.map(Number)
        };
        
        const expected = {
            name: 'MARIO ROSSI',
            age: 30,
            scores: [100, 95, 98]
        };
        
        expect(transformJSON(json, schema)).toEqual(expected);
    });

    test('sanitizeJSON dovrebbe nascondere i dati sensibili', () => {
        const json = {
            user: {
                name: 'Mario',
                password: 'secret123',
                token: 'abc123',
                profile: {
                    email: 'mario@example.com',
                    secret: 'sensitive-data'
                }
            }
        };
        
        const sanitized = sanitizeJSON(json);
        
        expect(sanitized.user.password).toBe('***');
        expect(sanitized.user.token).toBe('***');
        expect(sanitized.user.profile.secret).toBe('***');
        expect(sanitized.user.name).toBe('Mario');
        expect(sanitized.user.profile.email).toBe('mario@example.com');
    });

    test('jsonDiff dovrebbe identificare le differenze tra oggetti JSON', () => {
        const json1 = {
            name: 'Mario',
            age: 30,
            profile: {
                email: 'mario@example.com'
            }
        };
        
        const json2 = {
            name: 'Mario',
            age: 31,
            profile: {
                email: 'mario.rossi@example.com'
            }
        };
        
        const diff = jsonDiff(json1, json2);
        
        expect(diff).toContain('age: Valore cambiato da 30 a 31');
        expect(diff).toContain('profile.email: Valore cambiato da "mario@example.com" a "mario.rossi@example.com"');
    });

    test('compressJSON dovrebbe rimuovere valori vuoti', () => {
        const json = {
            name: 'Mario',
            age: 30,
            email: '',
            address: null,
            contacts: {
                phone: undefined,
                mobile: '123456789',
                fax: ''
            },
            notes: []
        };
        
        const compressed = compressJSON(json);
        
        expect(compressed).toEqual({
            name: 'Mario',
            age: 30,
            contacts: {
                mobile: '123456789'
            }
        });
    });
});