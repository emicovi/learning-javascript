/**
 * Lezione 1: Variabili e Tipi di Dati in JavaScript
 * 
 * In questa lezione imparerai:
 * 1. Come dichiarare variabili (var, let, const)
 * 2. I diversi tipi di dati in JavaScript
 * 3. Come JavaScript converte automaticamente i tipi (type coercion)
 * 4. La differenza tra null e undefined
 * 
 * CONCETTI CHIAVE:
 * - let: usa let quando il valore della variabile deve cambiare
 * - const: usa const quando il valore non deve mai cambiare
 * - var: evita di usarlo, è il vecchio modo di dichiarare variabili
 */

// 1. Dichiarazione di variabili
// let permette di cambiare il valore dopo
let name = 'Mario';        // Posso cambiare il nome dopo
// const non permette di cambiare il valore
const age = 30;           // L'età rimarrà sempre 30
// var è il vecchio modo, meglio evitarlo
var isStudent = true;     // Boolean (evita var, usa let o const)

// 2. Tipi di dati primitivi con esempi pratici
const stringExample = 'Ciao';           // String: per testo
const numberExample = 42;               // Number: per numeri (interi e decimali)
const booleanExample = true;            // Boolean: true o false
const nullExample = null;               // Null: valore vuoto intenzionale
let undefinedExample;                   // Undefined: valore non ancora assegnato
const symbolExample = Symbol('desc');   // Symbol: identificatore unico
const bigIntExample = 9007199254740991n;// BigInt: numeri molto grandi

// 3. Type coercion: JavaScript cerca di convertire i tipi automaticamente
// Esempio 1: String + Number = String
console.log('5' + 3);      // Output: '53' (il numero 3 viene convertito in stringa)
// Esempio 2: String - Number = Number
console.log('5' - 3);      // Output: 2 (la stringa '5' viene convertita in numero)
// Esempio 3: Boolean + Number = Number
console.log(true + 1);     // Output: 2 (true viene convertito in 1)

// 4. Null vs Undefined
// null: è come una scatola vuota - sappiamo che è vuota intenzionalmente
// undefined: è come una scatola che non abbiamo ancora aperto - non sappiamo cosa c'è dentro
console.log(typeof null);         // Output: 'object' (questo è un bug storico di JS)
console.log(typeof undefined);    // Output: 'undefined'

// Esempi pratici di utilizzo
const carrello = {
    prodotti: [],           // Array vuoto intenzionale (non null)
    totale: 0,             // Numero inizializzato a 0
    cliente: null,         // Ancora non sappiamo chi è il cliente (null)
    dataConsegna: undefined // Non abbiamo ancora pensato alla data (undefined)
};

// Esportiamo le variabili per i test
module.exports = {
    name,
    age,
    isStudent,
    stringExample,
    numberExample,
    booleanExample,
    carrello
};
