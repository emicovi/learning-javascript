/**
 * Test per la Lezione 5: Strutture di Controllo
 * 
 * Questi test verificano:
 * 1. if, else if, else
 * 2. switch
 * 3. for loops
 * 4. while e do...while
 * 5. break e continue
 * 6. try...catch...finally
 */

const controlStructures = require('./05_control_structures');

describe('Lezione 5 - Strutture di Controllo', () => {
    
    test('if/else calcola correttamente i voti', () => {
        expect(controlStructures.calcolaVoto(95)).toBe('A');
        expect(controlStructures.calcolaVoto(85)).toBe('B');
        expect(controlStructures.calcolaVoto(75)).toBe('C');
        expect(controlStructures.calcolaVoto(65)).toBe('D');
        expect(controlStructures.calcolaVoto(55)).toBe('F');
    });

    test('switch restituisce i giorni corretti', () => {
        expect(controlStructures.getGiornoSettimana(1)).toBe('Lunedì');
        expect(controlStructures.getGiornoSettimana(7)).toBe('Domenica');
        expect(controlStructures.getGiornoSettimana(8)).toBe('Numero non valido');
    });

    test('for loops funzionano correttamente', () => {
        const array = [1, 2, 3, 4];
        const risultato = controlStructures.esempiFor(array);
        
        expect(risultato.somma).toBe(10);
        expect(risultato.valori).toEqual([2, 4, 6, 8]);
        expect(risultato.indici).toEqual([0, 1, 2, 3]);
    });

    test('while loops funzionano correttamente', () => {
        const risultato = controlStructures.esempiWhile(4);
        expect(risultato.somma).toBe(6);  // 0 + 1 + 2 + 3
        expect(risultato.prodotto).toBe(16); // 2^4
    });

    test('break e continue funzionano correttamente', () => {
        const array = [1, 2, 3, 4, 5, 6];
        const risultato = controlStructures.trovaEFiltra(array, 4, 2);
        expect(risultato).toEqual([1, 3]); // Skip 2, break at 4
    });

    test('try/catch gestisce gli errori correttamente', () => {
        expect(controlStructures.divisione(10, 2)).toBe(5);
        expect(controlStructures.divisione(10, 0)).toBe(Infinity);
    });

    test('elaborazione array funziona correttamente', () => {
        const array = [1, 2, 'tre', 4, 5, 6, null];
        const risultato = controlStructures.elaboraArray(array);
        
        expect(risultato.pari).toEqual([2, 4, 6]);
        expect(risultato.dispari).toEqual([1, 5]);
        expect(risultato.errori).toBe(2); // 'tre' e null
    });
});
