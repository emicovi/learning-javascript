/**
 * Lezione 4: Operatori in JavaScript
 * 
 * In questa lezione imparerai:
 * 1. Operatori aritmetici (come una calcolatrice)
 * 2. Operatori di confronto (per confrontare valori)
 * 3. Operatori logici (per combinare condizioni)
 * 4. Operatori di assegnazione (per dare valori alle variabili)
 * 5. Altri operatori utili
 * 
 * CONCETTI CHIAVE:
 * - Gli operatori aritmetici funzionano come una calcolatrice (+, -, *, /, %)
 * - Gli operatori di confronto restituiscono sempre true o false
 * - && (AND) richiede che tutte le condizioni siano vere
 * - || (OR) richiede che almeno una condizione sia vera
 */

// 1. Operatori aritmetici
// Funzionano come una calcolatrice
function operazioniAritmetiche(a, b) {
    return {
        somma: a + b,          // Come 5 + 3 = 8
        sottrazione: a - b,    // Come 5 - 3 = 2
        moltiplicazione: a * b,// Come 5 * 3 = 15
        divisione: a / b,      // Come 6 / 2 = 3
        modulo: a % b,         // Resto della divisione: 5 % 3 = 2
        potenza: a ** b        // a elevato a b: 2 ** 3 = 8
    };
}

// 2. Operatori di confronto
// Immagina di confrontare due numeri su una retta numerica
function confronti(a, b) {
    return {
        uguale: a == b,            // È come chiedere "suonano uguali?" (5 == "5" è true)
        strettamenteUguale: a === b, // È come chiedere "sono identici?" (5 === "5" è false)
        diverso: a != b,           // È come chiedere "sono diversi?"
        strettamenteDiverso: a !== b, // È come chiedere "sono completamente diversi?"
        maggiore: a > b,           // a sta più a destra di b sulla retta numerica?
        minore: a < b,             // a sta più a sinistra di b sulla retta numerica?
        maggioreUguale: a >= b,    // a sta a destra o nella stessa posizione di b?
        minoreUguale: a <= b       // a sta a sinistra o nella stessa posizione di b?
    };
}

// 3. Operatori logici
// Pensa a questi come condizioni per prendere decisioni
function operazioniLogiche(a, b) {
    return {
        and: a && b,    // Come dire "ho fame E ho i soldi" (entrambe vere)
        or: a || b,     // Come dire "ho la macchina O prendo l'autobus" (almeno una vera)
        not: !a,        // Come dire "NON ho fame" (inverte vero/falso)
        nullish: a ?? b // Se a non è null/undefined, usa a, altrimenti usa b
    };
}

// 4. Operatori di assegnazione
// Come mettere oggetti in una scatola
function dimostraAssegnazioni() {
    let x = 5;          // Metti 5 nella scatola x
    x += 3;  // x = 8   // Aggiungi 3 a quello che c'è nella scatola
    x -= 2;  // x = 6   // Togli 2 da quello che c'è nella scatola
    x *= 4;  // x = 24  // Moltiplica per 4 quello che c'è nella scatola
    x /= 2;  // x = 12  // Dividi per 2 quello che c'è nella scatola
    x %= 11; // x = 1   // Prendi il resto della divisione per 11
    return x;
}

// 5. Operatori unari
// Operazioni che coinvolgono un solo valore
function operatoriUnari(x) {
    return {
        incrementoPre: ++x,    // Aumenta x di 1 prima di usarlo
        decrementoPre: --x,    // Diminuisce x di 1 prima di usarlo
        incrementoPost: x++,   // Usa x e poi aumentalo di 1
        decrementoPost: x--,   // Usa x e poi diminuiscilo di 1
        positivo: +x,          // Converte in numero positivo
        negativo: -x,          // Converte in numero negativo
        not: !x               // Converte in booleano e lo nega
    };
}

// 6. Operatore ternario
// Come un mini if-else in una sola riga
function operatoreTernario(condizione, valoreSeVero, valoreSeFalso) {
    // È come chiedere: "Se piove prendi l'ombrello, altrimenti prendi gli occhiali da sole"
    return condizione ? valoreSeVero : valoreSeFalso;
}

// Funzione per testare gli operatori di tipo
function operatoriTipo(valore) {
    return {
        tipo: typeof valore,
        isArray: Array.isArray(valore),
        istanzaDi: valore instanceof Object
    };
}

// Esempi avanzati di operatori
function esempiAvanzati() {
    const test = "test";
    const nullo = null;
    const indefinito = undefined;
    
    return {
        concatenazioneNullish: nullo ?? test,      // Restituisce "test"
        concatenazioneAnd: nullo && test,          // Restituisce null
        concatenazioneOr: nullo || test,           // Restituisce "test"
        operatoreTernario: test ? "vero" : "falso" // Restituisce "vero"
    };
}

// Esempio pratico: Calcolo del prezzo finale
function calcolaPrezzoFinale(prezzo, sconto, isCliente) {
    // Verifica se il prezzo è valido
    if (prezzo <= 0) {
        return 'Prezzo non valido';
    }

    // Applica lo sconto se presente
    const prezzoScontato = sconto > 0 ? prezzo - (prezzo * sconto) : prezzo;

    // Applica un ulteriore sconto del 10% se è un cliente
    const prezzoFinale = isCliente ? prezzoScontato * 0.9 : prezzoScontato;

    return `Prezzo finale: €${prezzoFinale.toFixed(2)}`;
}

module.exports = {
    operazioniAritmetiche,
    confronti,
    operazioniLogiche,
    dimostraAssegnazioni,
    operatoriUnari,
    operatoreTernario,
    operatoriTipo,
    esempiAvanzati,
    calcolaPrezzoFinale
};
