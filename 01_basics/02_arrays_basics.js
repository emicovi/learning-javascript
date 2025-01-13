/**
 * Lezione 2: Array Base in JavaScript
 * 
 * In questa lezione imparerai:
 * 1. Cosa sono gli array e come crearli
 * 2. Come accedere e modificare elementi
 * 3. Metodi base degli array (push, pop, shift, unshift)
 * 4. Come funziona length e come modificare gli array
 * 
 * CONCETTI CHIAVE:
 * - Gli array sono come una lista ordinata di elementi
 * - Gli indici partono da 0 (il primo elemento è array[0])
 * - push/pop lavorano alla fine dell'array
 * - shift/unshift lavorano all'inizio dell'array
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 📦 Cos'è un Array?
 * Pensa a un array come a:
 * - Un treno con vagoni numerati (ogni vagone è un elemento)
 * - Una fila di cassetti numerati in un mobile
 * - Una strada con case numerate da 0 in poi
 * 
 * 🎯 Come funzionano gli indici:
 * - Il primo elemento è sempre in posizione 0 (come il piano terra di un palazzo)
 * - L'ultimo elemento è in posizione length-1 (come l'ultimo piano)
 * 
 * 🔄 Operazioni Base:
 * push/pop: Come una pila di piatti
 * - push: metti un nuovo piatto sopra
 * - pop: togli l'ultimo piatto
 * 
 * shift/unshift: Come una fila di persone
 * - unshift: qualcuno si mette in testa alla fila
 * - shift: la prima persona esce dalla fila
 * 
 * ⚠️ Best Practices:
 * 1. Usa array quando hai una collezione ordinata di elementi simili
 * 2. Preferisci push/pop a shift/unshift per performance migliori
 * 3. Evita di lasciare "buchi" negli array (elementi undefined)
 */

// 1. Creazione degli array
// Un array può contenere qualsiasi tipo di dato
const numeri = [1, 2, 3, 4, 5];               // Array di numeri
const frutta = ['mela', 'banana', 'arancia']; // Array di stringhe
const misto = [1, 'due', true, null, { nome: 'Mario' }]; // Array con tipi misti

// 2. Accesso agli elementi
// Gli indici partono da 0
const primoNumero = numeri[0];      // Prende il primo numero (1)
const ultimaFrutta = frutta[frutta.length - 1];  // Prende l'ultimo elemento ('arancia')

// 3. Metodi base degli array
// Immagina gli array come una pila di piatti:

// PUSH e POP (lavorano alla fine dell'array)
const stack = [];
stack.push('primo');        // Aggiunge 'primo' in fondo: ['primo']
stack.push('secondo');      // Aggiunge 'secondo' in fondo: ['primo', 'secondo']
const ultimo = stack.pop(); // Rimuove e ritorna 'secondo': ['primo']

// SHIFT e UNSHIFT (lavorano all'inizio dell'array)
const queue = ['primo'];
queue.unshift('nuovo');     // Aggiunge all'inizio: ['nuovo', 'primo']
const primo = queue.shift();// Rimuove dall'inizio: ['primo']

// 4. Length e modifica
// length ti dice quanti elementi ci sono nell'array
const lista = [1, 2, 3];
lista.length = 2;          // Tronca l'array a [1, 2]
lista[5] = 6;             // Crea spazi vuoti: [1, 2, empty × 3, 6]

// Esempi pratici di utilizzo degli array
// Esempio 1: Lista della spesa
const listaSpesa = [];
listaSpesa.push('pane');     // Aggiungi alla fine
listaSpesa.push('latte');    // Aggiungi alla fine
listaSpesa.unshift('uova');  // Aggiungi all'inizio
// Risultato: ['uova', 'pane', 'latte']

// Esempio 2: Gestione code
const codaClienti = [];
// Arriva un nuovo cliente (si mette in coda)
codaClienti.push('Cliente 1');
codaClienti.push('Cliente 2');
// Servo il primo cliente (tolgo dalla coda)
const prossimoCliente = codaClienti.shift();

// Funzioni di utilità per gli array
// Somma tutti i numeri in un array
function sommaArray(arr) {
    let totale = 0;
    for(let numero of arr) {
        totale += numero;
    }
    return totale;
}

// Trova la posizione di un elemento
function trovaIndice(arr, elemento) {
    return arr.indexOf(elemento); // Ritorna -1 se non trovato
}

// Conta quanti elementi ci sono
function contaElementi(arr) {
    return arr.length;
}

module.exports = {
    numeri,
    frutta,
    misto,
    sommaArray,
    trovaIndice,
    contaElementi,
    listaSpesa,
    codaClienti
};
