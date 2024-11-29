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
