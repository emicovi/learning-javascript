/**
 * Test per la Lezione 4: Operatori
 * 
 * Questi test verificano:
 * 1. Operatori aritmetici
 * 2. Operatori di confronto
 * 3. Operatori logici
 * 4. Operatori di assegnazione
 * 5. Operatori unari
 * 6. Operatore ternario
 * 7. Operatori di tipo
 */

const operatori = require('./04_operators');

describe('Lezione 4 - Operatori', () => {
    
    test('operazioni aritmetiche funzionano correttamente', () => {
        const risultati = operatori.operazioniAritmetiche(10, 3);
        expect(risultati.somma).toBe(13);
        expect(risultati.sottrazione).toBe(7);
        expect(risultati.moltiplicazione).toBe(30);
        expect(risultati.divisione).toBeCloseTo(3.33, 1);
        expect(risultati.modulo).toBe(1);
        expect(risultati.potenza).toBe(1000);
    });

    test('operatori di confronto funzionano correttamente', () => {
        const confrontiNumerici = operatori.confronti(5, "5");
        expect(confrontiNumerici.uguale).toBe(true);         // 5 == "5"
        expect(confrontiNumerici.strettamenteUguale).toBe(false); // 5 === "5"
        
        const confrontiBooleani = operatori.confronti(10, 5);
        expect(confrontiBooleani.maggiore).toBe(true);
        expect(confrontiBooleani.minore).toBe(false);
    });

    test('operatori logici funzionano correttamente', () => {
        expect(operatori.operazioniLogiche(true, false).and).toBe(false);
        expect(operatori.operazioniLogiche(true, false).or).toBe(true);
        expect(operatori.operazioniLogiche(true, false).not).toBe(false);
        expect(operatori.operazioniLogiche(null, "default").nullish).toBe("default");
    });

    test('operatori di assegnazione funzionano correttamente', () => {
        // Il risultato finale dopo tutte le operazioni dovrebbe essere 1
        expect(operatori.dimostraAssegnazioni()).toBe(1);
    });

    test('operatori unari funzionano correttamente', () => {
        const x = 5;
        const risultati = operatori.operatoriUnari(x);
        expect(risultati.incrementoPre).toBe(6);
        expect(risultati.decrementoPre).toBe(5);
        expect(risultati.incrementoPost).toBe(5);
        expect(risultati.decrementoPost).toBe(6);
        expect(risultati.positivo).toBe(5);
        expect(risultati.negativo).toBe(-5);
        expect(risultati.not).toBe(false);
    });

    test('operatore ternario funziona correttamente', () => {
        expect(operatori.operatoreTernario(true, "sì", "no")).toBe("sì");
        expect(operatori.operatoreTernario(false, "sì", "no")).toBe("no");
    });

    test('operatori di tipo funzionano correttamente', () => {
        const risultatiStringa = operatori.operatoriTipo("test");
        expect(risultatiStringa.tipo).toBe("string");
        
        const risultatiArray = operatori.operatoriTipo([]);
        expect(risultatiArray.isArray).toBe(true);
        
        const risultatiOggetto = operatori.operatoriTipo({});
        expect(risultatiOggetto.istanzaDi).toBe(true);
    });

    test('esempi avanzati funzionano correttamente', () => {
        const risultati = operatori.esempiAvanzati();
        expect(risultati.concatenazioneNullish).toBe("test");
        expect(risultati.concatenazioneAnd).toBe(null);
        expect(risultati.concatenazioneOr).toBe("test");
    });
});
