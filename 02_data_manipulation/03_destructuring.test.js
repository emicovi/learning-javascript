/**
 * Test per le funzionalità di destructuring
 */

import {
    getFirstAndSecond,
    getFirstAndRest,
    getUserInfo,
    getConfigValues,
    extractNestedData,
    getCircleProperties,
    printPersonInfo,
    getCompanyFirstEmployee
} from './03_destructuring';

describe('Destructuring Features', () => {
    test('getFirstAndSecond dovrebbe estrarre i primi due elementi', () => {
        const arr = [1, 2, 3, 4];
        expect(getFirstAndSecond(arr)).toEqual({ first: 1, second: 2 });
    });

    test('getFirstAndRest dovrebbe separare il primo elemento dal resto', () => {
        const arr = [1, 2, 3, 4];
        expect(getFirstAndRest(arr)).toEqual({ first: 1, rest: [2, 3, 4] });
    });

    test('getUserInfo dovrebbe formattare le info utente', () => {
        const user = { name: 'Mario', age: 30 };
        expect(getUserInfo(user)).toBe('Mario ha 30 anni');
    });

    test('getConfigValues dovrebbe usare valori default quando necessario', () => {
        expect(getConfigValues({})).toEqual({
            theme: 'light',
            language: 'it',
            notifications: true
        });

        expect(getConfigValues({ theme: 'dark' })).toEqual({
            theme: 'dark',
            language: 'it',
            notifications: true
        });
    });

    test('extractNestedData dovrebbe estrarre dati annidati', () => {
        const data = {
            user: {
                name: 'Luigi',
                address: { city: 'Roma' }
            },
            settings: { theme: 'dark' }
        };
        expect(extractNestedData(data)).toEqual({
            name: 'Luigi',
            city: 'Roma',
            theme: 'dark'
        });
    });

    test('getCircleProperties dovrebbe rinominare le proprietà', () => {
        const circle = { radius: 5, diameter: 10 };
        expect(getCircleProperties(circle)).toEqual({
            radius: 5,
            diameter: 10
        });
    });

    test('printPersonInfo dovrebbe gestire i parametri con destructuring', () => {
        const person = { name: 'Anna', age: 25 };
        expect(printPersonInfo(person)).toBe('Anna, 25 anni, vive a Sconosciuta');
        
        const personWithCity = { name: 'Marco', age: 30, city: 'Milano' };
        expect(printPersonInfo(personWithCity)).toBe('Marco, 30 anni, vive a Milano');
    });

    test('getCompanyFirstEmployee dovrebbe estrarre il primo dipendente', () => {
        const company = {
            employees: [
                { name: 'Giovanni', role: 'Developer' },
                { name: 'Laura', role: 'Designer' }
            ]
        };
        expect(getCompanyFirstEmployee(company)).toEqual({
            name: 'Giovanni',
            role: 'Developer'
        });
    });
});