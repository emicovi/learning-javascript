/**
 * Lezione 3: Funzioni e Scope in JavaScript
 * 
 * In questa lezione imparerai:
 * 1. Come creare e usare le funzioni
 * 2. Differenza tra function declaration e expression
 * 3. Arrow functions (=>)
 * 4. Scope (globale, funzione, blocco)
 * 5. Closure (funzioni che ricordano il loro ambiente)
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🏭 Le Funzioni sono come:
 * - Una fabbrica: riceve materie prime (parametri) e produce prodotti finiti (risultato)
 * - Una ricetta di cucina: segui i passaggi con gli ingredienti per ottenere un piatto
 * - Una macchina del caffè: metti il caffè, premi un bottone, ottieni il caffè
 * 
 * 📦 Lo Scope è come:
 * - Un sistema di scatole Russe (una dentro l'altra):
 *   - Scatola Grande (Scope Globale): visibile da tutti
 *   - Scatola Media (Scope Funzione): visibile solo dentro la funzione
 *   - Scatola Piccola (Scope Blocco): visibile solo dentro il blocco {}
 * 
 * 🧠 Le Closure sono come:
 * - Un diario segreto: la funzione "ricorda" le informazioni anche dopo essere stata creata
 * - Una busta sigillata: mantiene al suo interno le variabili del suo ambiente
 * 
 * 🎯 Tipi di Funzioni:
 * 1. Function Declaration:
 *    - Come un'istruzione formale (function nome() {})
 *    - Disponibile in tutto il file
 * 
 * 2. Function Expression:
 *    - Come assegnare un compito a qualcuno (const nome = function() {})
 *    - Disponibile solo dopo l'assegnazione
 * 
 * 3. Arrow Function:
 *    - La versione moderna e compatta
 *    - Ideale per operazioni brevi
 * 
 * ⚠️ Best Practices:
 * 1. Usa nomi descrittivi per le funzioni
 * 2. Una funzione dovrebbe fare una cosa sola
 * 3. Preferisci const per le function expression
 * 4. Usa arrow functions per callback brevi
 */

// 1. Funzioni base
// Come una ricetta per fare un saluto
function saluta(nome) {
    return `Ciao ${nome}!`; // Template string con ${}
}

// 2. Function expression
// Un altro modo di scrivere funzioni, assegnandole a variabili
const somma = function(a, b) {
    return a + b;
};

// 3. Arrow functions (più corte e moderne)
// Versione normale
const moltiplica = (a, b) => a * b;
// Con un solo parametro non servono parentesi
const quadrato = x => x * x;
// Senza parametri servono parentesi vuote
const salutaTutti = () => 'Ciao a tutti!';

// 4. Scope esempio
// Immagina gli scope come scatole una dentro l'altra
let globale = 'Sono visibile ovunque';  // Scope globale (scatola più grande)

function scopeEsempio() {
    // Scope della funzione (scatola media)
    let funzionale = 'Sono nello scope della funzione';
    var varVariabile;
    let blocco;

    if (true) {
        blocco = 'Sono nello scope del blocco';
        varVariabile = 'Sono accessibile fuori dal blocco';
    }

    return {
        blocco,
        varVariabile,
        funzionale
    };
}

// 5. Closure
// Immagina un contatore che "ricorda" il suo valore
function contatore() {
    let count = 0;  // Questa variabile viene "ricordata"
    
    return {
        // Queste funzioni "ricordano" count anche dopo che contatore() finisce
        incrementa: () => ++count,
        decrementa: () => --count,
        valore: () => count
    };
}

// Esempio pratico: Gestione del carrello
function creaGestoreCarrello(nomeCliente) {
    let prodotti = [];  // Array privato
    let totale = 0;     // Totale privato

    return {
        aggiungiProdotto: (nome, prezzo) => {
            prodotti.push({ nome, prezzo });
            totale += prezzo;
            return `${nome} aggiunto al carrello di ${nomeCliente}`;
        },
        getTotale: () => {
            return `Totale per ${nomeCliente}: €${totale}`;
        },
        getProdotti: () => [...prodotti] // Ritorna una copia dell'array
    };
}

// Esempio di utilizzo del gestore carrello
const carrelloMario = creaGestoreCarrello('Mario');
carrelloMario.aggiungiProdotto('Pizza', 10);
carrelloMario.aggiungiProdotto('Pasta', 8);
console.log(carrelloMario.getTotale()); // "Totale per Mario: €18"

// 5. This keyword
const persona = {
    nome: 'Mario',
    saluta: function() {
        return `Ciao, sono ${this.nome}`;
    },
    salutaArrow: () => {
        // this qui si riferisce al contesto globale!
        return `This non funziona qui: ${this ? this.nome : 'undefined'}`;
    }
};

// Esportiamo per i test
module.exports = {
    saluta,
    somma,
    moltiplica,
    quadrato,
    salutaTutti,
    scopeEsempio,
    contatore,
    creaGestoreCarrello,
    persona
};
