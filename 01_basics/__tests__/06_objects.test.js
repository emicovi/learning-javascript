/**
 * Test per la Lezione 6: Oggetti
 * 
 * Questi test verificano:
 * 1. Creazione e manipolazione oggetti
 * 2. Proprietà e metodi
 * 3. Object methods
 * 4. Getter e Setter
 * 5. Prototypes
 * 6. Destructuring
 * 7. Shallow vs Deep copy
 */

const oggetti = require('./06_objects');

describe('Lezione 6 - Oggetti', () => {
    
    test('creazione e manipolazione oggetti funziona correttamente', () => {
        const oggetto = { proprietàDaRimuovere: true };
        const risultato = oggetti.modificaOggetto(oggetto);
        
        expect(risultato.nuovaProprietà).toBe('valore');
        expect(risultato.proprietàDaRimuovere).toBeUndefined();
    });

    test('method chaining funziona correttamente', () => {
        const risultato = oggetti.calcolatrice
            .aggiungi(5)
            .sottrai(2)
            .moltiplica(3)
            .getValore();
            
        expect(risultato).toBe(9); // (5 - 2) * 3
    });

    test('object methods funzionano correttamente', () => {
        const oggetto = { nome: 'Mario', età: 30 };
        const analisi = oggetti.analizzaOggetto(oggetto);
        
        expect(analisi.chiavi).toEqual(['nome', 'età']);
        expect(analisi.valori).toEqual(['Mario', 30]);
        expect(analisi.entries).toEqual([['nome', 'Mario'], ['età', 30]]);
        expect(analisi.hasNome).toBe(true);
    });

    test('getter e setter funzionano correttamente', () => {
        oggetti.contoBancario.saldo = 1000;
        expect(oggetti.contoBancario.saldo).toBe(1000);
        expect(oggetti.contoBancario._movimenti.length).toBe(1);
        
        const ultimoMovimento = oggetti.contoBancario._movimenti[0];
        expect(ultimoMovimento.vecchioSaldo).toBe(0);
        expect(ultimoMovimento.nuovoSaldo).toBe(1000);
    });

    test('prototypes e ereditarietà funzionano correttamente', () => {
        const auto = new oggetti.Auto('Fiat', '500', 3);
        expect(auto.descrizione()).toBe('Fiat 500');
        expect(auto.porte).toBe(3);
        expect(auto instanceof oggetti.Veicolo).toBe(true);
    });

    test('destructuring funziona correttamente', () => {
        const persona = { nome: 'Luigi', età: 25 };
        const risultato = oggetti.estraiDatiPersona(persona);
        expect(risultato).toBe('Luigi ha 25 anni ed è disoccupato');
    });

    test('shallow vs deep copy funzionano come previsto', () => {
        const { originale, shallowCopy, deepCopy } = oggetti.esempiCopy();
        
        // La shallow copy mantiene il riferimento all'oggetto annidato
        expect(shallowCopy.indirizzo.città).toBe(originale.indirizzo.città);
        
        // La deep copy crea una copia completamente indipendente
        expect(deepCopy.indirizzo.città).not.toBe(originale.indirizzo.città);
    });

    test('sistema gestione studenti funziona correttamente', () => {
        const sistema = new oggetti.GestioneStudenti();
        
        sistema.aggiungiStudente(1, 'Mario', ['JavaScript']);
        sistema.aggiungiVoto(1, 'JavaScript', 90);
        sistema.aggiungiVoto(1, 'JavaScript', 85);
        
        expect(sistema.calcolaMedia(1)).toBe(87.5);
        
        expect(() => sistema.aggiungiVoto(2, 'Python', 80))
            .toThrow('Studente non trovato');
    });
});
