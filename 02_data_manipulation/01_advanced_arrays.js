/**
 * Lezione 4: Manipolazione Avanzata degli Array
 * 
 * In questa lezione imparerai:
 * 1. map() - trasformare elementi
 * 2. filter() - filtrare elementi
 * 3. reduce() - ridurre array a un singolo valore
 * 4. find() e findIndex() - cercare elementi
 * 5. some() e every() - verificare condizioni
 * 6. sort() - ordinare array
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🎯 I Metodi degli Array sono come:
 * 
 * 1. map() - La Fabbrica di Trasformazione
 * - Come una macchina che trasforma materie prime in prodotti finiti
 * - Esempio: Trasformare un sacchetto di arance in succhi d'arancia
 * - Input: [arancia1, arancia2, arancia3]
 * - Output: [succo1, succo2, succo3]
 * 
 * 2. filter() - Il Setaccio
 * - Come un colino che separa ciò che serve da ciò che non serve
 * - Esempio: Selezionare solo la frutta matura dal cesto
 * - Input: [maturo, acerbo, maturo, marcio, maturo]
 * - Output: [maturo, maturo, maturo]
 * 
 * 3. reduce() - Il Raccoglitore
 * - Come fare la spesa: parti da 0€ e accumuli il totale
 * - Esempio: Sommare tutti gli scontrini del mese
 * - Input: [spesa1, spesa2, spesa3]
 * - Output: totale complessivo
 * 
 * 4. find() / findIndex() - Il Detective
 * - find(): Come cercare una persona in una folla
 * - findIndex(): Come trovare il numero della casa in una strada
 * - Esempio: Trovare il primo libro con copertina rossa
 * 
 * 5. some() / every() - Gli Ispettori
 * - some(): "Almeno uno" - Come chiedere "qualcuno ha una penna?"
 * - every(): "Tutti" - Come verificare che tutti abbiano il biglietto
 * 
 * 6. sort() - L'Organizzatore
 * - Come mettere in ordine i libri in una libreria
 * - Esempio: Ordinare per altezza, alfabeto, o numero
 * 
 * ⚠️ Best Practices:
 * 1. Usa map() quando vuoi trasformare ogni elemento
 * 2. Usa filter() per creare sottoinsiemi
 * 3. Usa reduce() per calcoli cumulativi
 * 4. Preferisci find() a filter() quando cerchi un solo elemento
 * 5. Fai una copia con [...array] prima di sort() per non modificare l'originale
 */

// Dataset di esempio
const studenti = [
    { nome: 'Mario', voto: 85, corso: 'JavaScript' },
    { nome: 'Luigi', voto: 90, corso: 'Python' },
    { nome: 'Peach', voto: 95, corso: 'JavaScript' },
    { nome: 'Bowser', voto: 65, corso: 'Python' }
];

// 1. map() - trasforma ogni elemento
function getNomiStudenti(studenti) {
    return studenti.map(studente => studente.nome);
}

function aumentaVoti(studenti, punti) {
    return studenti.map(studente => ({
        ...studente,
        voto: Math.min(100, studente.voto + punti)
    }));
}

// 2. filter() - filtra elementi
function getStudentiJavaScript(studenti) {
    return studenti.filter(studente => studente.corso === 'JavaScript');
}

function getStudentiPromossi(studenti) {
    return studenti.filter(studente => studente.voto >= 70);
}

// 3. reduce() - riduce a un singolo valore
function calcolaMediaVoti(studenti) {
    const somma = studenti.reduce((acc, studente) => acc + studente.voto, 0);
    return somma / studenti.length;
}

function contaStudentiPerCorso(studenti) {
    return studenti.reduce((acc, studente) => {
        acc[studente.corso] = (acc[studente.corso] || 0) + 1;
        return acc;
    }, {});
}

// 4. find() e findIndex()
function trovaStudente(studenti, nome) {
    return studenti.find(studente => studente.nome === nome);
}

function trovaPosizioneMiglioreStudente(studenti) {
    const maxVoto = Math.max(...studenti.map(s => s.voto));
    return studenti.findIndex(studente => studente.voto === maxVoto);
}

// 5. some() e every()
function tuttiBravi(studenti) {
    return studenti.every(studente => studente.voto >= 70);
}

function qualcunoBocciato(studenti) {
    return studenti.some(studente => studente.voto < 60);
}

// 6. sort() - ordinamento
function ordinaPerVoto(studenti) {
    return [...studenti].sort((a, b) => b.voto - a.voto);
}

function ordinaPerNome(studenti) {
    return [...studenti].sort((a, b) => a.nome.localeCompare(b.nome));
}

module.exports = {
    studenti,
    getNomiStudenti,
    aumentaVoti,
    getStudentiJavaScript,
    getStudentiPromossi,
    calcolaMediaVoti,
    contaStudentiPerCorso,
    trovaStudente,
    trovaPosizioneMiglioreStudente,
    tuttiBravi,
    qualcunoBocciato,
    ordinaPerVoto,
    ordinaPerNome
};
