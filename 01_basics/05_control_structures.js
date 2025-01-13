/**
 * Lezione 5: Strutture di Controllo in JavaScript
 * 
 * In questa lezione imparerai:
 * 1. Come prendere decisioni con if, else if, else
 * 2. Come gestire più casi con switch
 * 3. Come ripetere operazioni con i cicli for
 * 4. Come usare while e do...while
 * 5. Come controllare il flusso con break e continue
 * 6. Come gestire gli errori con try...catch
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🚦 If/Else - Come un Semaforo della Vita:
 * - if = luce verde (vai avanti se la condizione è vera)
 * - else if = luce gialla (prova un'altra condizione)
 * - else = luce rossa (fai questo se nient'altro funziona)
 * 
 * Esempio della vita reale:
 * if (piove) {
 *     prendiOmbrello();
 * } else if (èNuvoloso) {
 *     portiGiacca();
 * } else {
 *     mettiOcchialiDaSole();
 * }
 * 
 * 🎯 Switch - Come un Telecomando:
 * - Ogni case è come un bottone del telecomando
 * - Il default è come il tasto "home" che usi se nessun altro tasto funziona
 * 
 * 🔄 Cicli For - Come Diverse Attività Ripetitive:
 * - for classico: Come contare i giri mentre corri
 *   "Faccio 10 giri della pista"
 * 
 * - for...of: Come aprire i regali di Natale
 *   "Per ogni regalo sotto l'albero, aprilo"
 * 
 * - for...in: Come controllare tutte le stanze
 *   "Per ogni stanza della casa, spegni la luce"
 * 
 * ⏳ While/Do-While - Come Abitudini Quotidiane:
 * - while: Come lavarsi i denti
 *   "Mentre ci sono residui, continua a spazzolare"
 * 
 * - do...while: Come assaggiare una ricetta
 *   "Assaggia una volta, poi decidi se continuare"
 * 
 * 🚫 Break/Continue - Come Guardare una Serie TV:
 * - break: "Questo episodio fa paura, spengo la TV"
 * - continue: "Questa scena è noiosa, salto al prossimo momento"
 * 
 * 🛡️ Try-Catch - Come Cucinare una Nuova Ricetta:
 * - try: "Provo a seguire la ricetta"
 * - catch: "Se qualcosa va storto, ho un piano B"
 * - finally: "Alla fine pulisco sempre la cucina"
 * 
 * ⚠️ Best Practices:
 * 1. Mantieni le condizioni semplici e leggibili
 * 2. Evita if/else annidati profondi
 * 3. Preferisci for...of per gli array
 * 4. Usa try-catch solo per errori eccezionali
 */

// 1. if, else if, else
// Come un insegnante che assegna i voti
function calcolaVoto(punteggio) {
    if (punteggio >= 90) {
        return 'A';  // Eccellente
    } else if (punteggio >= 80) {
        return 'B';  // Molto buono
    } else if (punteggio >= 70) {
        return 'C';  // Buono
    } else if (punteggio >= 60) {
        return 'D';  // Sufficiente
    } else {
        return 'F';  // Insufficiente
    }
}

// 2. switch
// Come un menu di scelte
function getGiornoSettimana(numero) {
    switch (numero) {
        case 1:
            return 'Lunedì';    // Inizio settimana
        case 2:
            return 'Martedì';   // Secondo giorno
        case 3:
            return 'Mercoledì'; // Metà settimana
        case 4:
            return 'Giovedì';   // Quasi weekend
        case 5:
            return 'Venerdì';   // Fine settimana lavorativa
        case 6:
            return 'Sabato';    // Weekend
        case 7:
            return 'Domenica';  // Riposo
        default:
            return 'Numero non valido'; // Gestione errori
    }
}

// 3. for loops
// Diversi modi di fare un ciclo, come diversi modi di attraversare una lista
function esempiFor(array) {
    // for classico: quando sai esattamente quante volte ripetere
    let somma = 0;
    for (let i = 0; i < array.length; i++) {
        somma += array[i];
    }

    // for...of: quando vuoi lavorare con i valori
    // Come dire "per ogni elemento nella lista..."
    let valori = [];
    for (const elemento of array) {
        valori.push(elemento * 2);
    }

    // for...in: quando ti interessano gli indici
    // Come dire "per ogni posizione nella lista..."
    let indici = [];
    for (const indice in array) {
        indici.push(Number(indice));
    }

    return { somma, valori, indici };
}

// 4. while e do...while
// while: controlla prima, esegui dopo
// do...while: esegui prima, controlla dopo
function esempiWhile(n) {
    let contatore = 0;
    let somma = 0;
    
    // while: come dire "finché c'è caffè nella tazza, bevi"
    while (contatore < n) {
        somma += contatore++;  // Incrementa e somma in un colpo solo
    }

    // do...while: come dire "bevi un sorso, poi controlla se c'è altro caffè"
    let prodotto = 1;
    do {
        prodotto *= 2;
        n--;
    } while (n > 0);

    return { somma, prodotto };
}

// 5. break e continue
// break: esci completamente dal ciclo
// continue: salta al prossimo giro
function trovaEFiltra(array, target, skipValue) {
    let risultato = [];
    
    for (let elemento of array) {
        // continue: come saltare una canzone che non ti piace
        if (elemento === skipValue) {
            continue;  // Salta questo elemento
        }
        
        // break: come fermare la playlist quando trovi la canzone che cercavi
        if (elemento === target) {
            break;  // Esci dal ciclo
        }
        
        risultato.push(elemento);
    }
    
    return risultato;
}

// 6. try...catch...finally
// Come una rete di sicurezza per gli errori
function divisione(a, b) {
    try {
        // Prova a fare qualcosa di rischioso
        if (b === 0) {
            throw new Error('Divisione per zero!');
        }
        return a / b;
    } catch (error) {
        // Se qualcosa va storto, gestisci l'errore
        console.error('Si è verificato un errore:', error.message);
        return Infinity;
    } finally {
        // Questo viene eseguito sempre, che ci siano errori o no
        console.log('Operazione di divisione completata');
    }
}

// Esempio pratico: Gestione di un array di numeri
function elaboraArray(array) {
    let risultato = {
        pari: [],      // Numeri pari
        dispari: [],   // Numeri dispari
        errori: 0      // Contatore errori
    };

    for (let elemento of array) {
        try {
            // Verifica che sia un numero
            if (typeof elemento !== 'number') {
                throw new Error('Elemento non numerico');
            }

            // Separa pari e dispari
            if (elemento % 2 === 0) {
                risultato.pari.push(elemento);
            } else {
                risultato.dispari.push(elemento);
            }
        } catch (error) {
            risultato.errori++;
            continue;  // Passa al prossimo elemento
        }
    }

    return risultato;
}

module.exports = {
    calcolaVoto,
    getGiornoSettimana,
    esempiFor,
    esempiWhile,
    trovaEFiltra,
    divisione,
    elaboraArray
};
