/**
 * Test per la Lezione 3: Funzioni e Scope
 * 
 * Questi test verificano:
 * 1. Il corretto funzionamento delle diverse tipologie di funzioni
 * 2. Il comportamento dello scope
 * 3. Il funzionamento delle closure
 * 4. Il comportamento del this
 */

const funzioni = require('./03_functions_scope');

describe('Lezione 3 - Funzioni e Scope', () => {
    
    test('le funzioni base funzionano correttamente', () => {
        expect(funzioni.saluta('Mario')).toBe('Ciao Mario!');
        expect(funzioni.somma(2, 3)).toBe(5);
    });

    test('le arrow functions funzionano correttamente', () => {
        expect(funzioni.moltiplica(4, 2)).toBe(8);
        expect(funzioni.quadrato(3)).toBe(9);
        expect(funzioni.salutaTutti()).toBe('Ciao a tutti!');
    });

    test('lo scope funziona come previsto', () => {
        const risultato = funzioni.scopeEsempio();
        expect(risultato.blocco).toBe('Sono nello scope del blocco');
        expect(risultato.varVariabile).toBe('Sono accessibile fuori dal blocco');
        expect(risultato.funzionale).toBe('Sono nello scope della funzione');
    });

    test('la closure mantiene il suo stato', () => {
        const counter = funzioni.contatore();
        expect(counter.valore()).toBe(0);
        counter.incrementa();
        expect(counter.valore()).toBe(1);
        counter.decrementa();
        expect(counter.valore()).toBe(0);
    });

    test('this si comporta come previsto', () => {
        expect(funzioni.persona.saluta()).toBe('Ciao, sono Mario');
        // La arrow function non ha accesso al this corretto
        expect(funzioni.persona.salutaArrow()).toBe('This non funziona qui: undefined');
    });
});
