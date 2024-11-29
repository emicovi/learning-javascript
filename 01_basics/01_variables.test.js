/**
 * Test per la Lezione 1: Variabili e Tipi di Dati
 * 
 * Questi test ti aiuteranno a capire:
 * 1. Come verificare i tipi di dati
 * 2. Come testare i valori delle variabili
 * 3. Come funziona Jest
 */

const variables = require('./01_variables');

describe('Lezione 1 - Variabili e Tipi di Dati', () => {
    
    test('le variabili hanno i valori corretti', () => {
        expect(variables.name).toBe('Mario');
        expect(variables.age).toBe(30);
        expect(variables.isStudent).toBe(true);
    });

    test('le variabili sono del tipo corretto', () => {
        expect(typeof variables.stringExample).toBe('string');
        expect(typeof variables.numberExample).toBe('number');
        expect(typeof variables.booleanExample).toBe('boolean');
    });

    test('verifica i valori delle variabili di esempio', () => {
        expect(variables.stringExample).toBe('Ciao');
        expect(variables.numberExample).toBe(42);
        expect(variables.booleanExample).toBe(true);
    });
});
