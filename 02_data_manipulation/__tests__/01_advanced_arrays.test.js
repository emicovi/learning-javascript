/**
 * Test per la Lezione 4: Manipolazione Avanzata degli Array
 * 
 * Questi test verificano:
 * 1. Trasformazioni con map()
 * 2. Filtraggio con filter()
 * 3. Riduzione con reduce()
 * 4. Ricerca con find() e findIndex()
 * 5. Verifica con some() e every()
 * 6. Ordinamento con sort()
 */

const arrayUtils = require('./01_advanced_arrays');

describe('Lezione 4 - Manipolazione Avanzata degli Array', () => {
    
    test('map() trasforma correttamente gli elementi', () => {
        expect(arrayUtils.getNomiStudenti(arrayUtils.studenti))
            .toEqual(['Mario', 'Luigi', 'Peach', 'Bowser']);

        const votiAumentati = arrayUtils.aumentaVoti(arrayUtils.studenti, 5);
        expect(votiAumentati[0].voto).toBe(90); // Mario: 85 + 5
        expect(votiAumentati[2].voto).toBe(100); // Peach: 95 + 5 (capped at 100)
    });

    test('filter() filtra correttamente gli elementi', () => {
        const studentiJS = arrayUtils.getStudentiJavaScript(arrayUtils.studenti);
        expect(studentiJS.length).toBe(2);
        expect(studentiJS.every(s => s.corso === 'JavaScript')).toBe(true);

        const promossi = arrayUtils.getStudentiPromossi(arrayUtils.studenti);
        expect(promossi.length).toBe(3); // Tutti tranne Bowser
    });

    test('reduce() calcola correttamente i valori', () => {
        const media = arrayUtils.calcolaMediaVoti(arrayUtils.studenti);
        expect(media).toBe(83.75); // (85 + 90 + 95 + 65) / 4

        const perCorso = arrayUtils.contaStudentiPerCorso(arrayUtils.studenti);
        expect(perCorso).toEqual({ JavaScript: 2, Python: 2 });
    });

    test('find() e findIndex() trovano correttamente gli elementi', () => {
        const mario = arrayUtils.trovaStudente(arrayUtils.studenti, 'Mario');
        expect(mario.voto).toBe(85);

        const posMigliore = arrayUtils.trovaPosizioneMiglioreStudente(arrayUtils.studenti);
        expect(posMigliore).toBe(2); // Peach ha il voto più alto
    });

    test('some() e every() verificano correttamente le condizioni', () => {
        expect(arrayUtils.tuttiBravi(arrayUtils.studenti)).toBe(false); // Bowser < 70
        expect(arrayUtils.qualcunoBocciato(arrayUtils.studenti)).toBe(false); // Nessuno < 60
    });

    test('sort() ordina correttamente gli elementi', () => {
        const perVoto = arrayUtils.ordinaPerVoto(arrayUtils.studenti);
        expect(perVoto[0].nome).toBe('Peach'); // Voto più alto
        expect(perVoto[3].nome).toBe('Bowser'); // Voto più basso

        const perNome = arrayUtils.ordinaPerNome(arrayUtils.studenti);
        expect(perNome[0].nome).toBe('Bowser'); // Primo alfabeticamente
    });
});
