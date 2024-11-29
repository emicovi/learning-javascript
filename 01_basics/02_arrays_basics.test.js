/**
 * Test per la Lezione 2: Array Base
 * 
 * Questi test verificano:
 * 1. La corretta creazione degli array
 * 2. Il funzionamento dei metodi base
 * 3. Le funzioni di utilità degli array
 */

const arrayUtils = require('./02_arrays_basics');

describe('Lezione 2 - Array Base', () => {
    
    test('gli array sono stati creati correttamente', () => {
        expect(Array.isArray(arrayUtils.numeri)).toBe(true);
        expect(Array.isArray(arrayUtils.frutta)).toBe(true);
        expect(Array.isArray(arrayUtils.misto)).toBe(true);
    });

    test('sommaArray funziona correttamente', () => {
        expect(arrayUtils.sommaArray([1, 2, 3])).toBe(6);
        expect(arrayUtils.sommaArray([])).toBe(0);
        expect(arrayUtils.sommaArray([5])).toBe(5);
    });

    test('trovaIndice funziona correttamente', () => {
        expect(arrayUtils.trovaIndice(arrayUtils.frutta, 'mela')).toBe(0);
        expect(arrayUtils.trovaIndice(arrayUtils.frutta, 'pera')).toBe(-1);
    });

    test('contaElementi funziona correttamente', () => {
        expect(arrayUtils.contaElementi(arrayUtils.numeri)).toBe(5);
        expect(arrayUtils.contaElementi([])).toBe(0);
    });
});
