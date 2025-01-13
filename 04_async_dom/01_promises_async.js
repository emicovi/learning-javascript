/**
 * Lezione: Programmazione Asincrona in JavaScript
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🎯 La Programmazione Asincrona è come:
 * - Ordinare al ristorante: fai l'ordine e aspetti mentre il cuoco prepara
 * - Lavare i vestiti: avvii la lavatrice e fai altro mentre lava
 * 
 * 📝 Concetti Chiave:
 * 
 * 1. Callbacks (Vecchio Metodo)
 * Come lasciare il numero al ristorante:
 * - "Ti chiamo quando il tavolo è pronto"
 * - Il problema è il "callback hell": 
 *   Come dover chiamare il ristorante, che deve chiamare il cuoco,
 *   che deve chiamare il cameriere, ecc.
 * 
 * 2. Promises (Promesse)
 * Come il buzzer del ristorante:
 * - Pending: stai aspettando (buzzer non ancora suonato)
 * - Fulfilled: il tavolo è pronto (buzzer suona)
 * - Rejected: c'è un problema (non ci sono tavoli)
 * 
 * Stati di una Promise:
 * 🕒 Pending: "In preparazione"
 * ✅ Fulfilled: "Pronto!"
 * ❌ Rejected: "Mi dispiace, è finito"
 * 
 * 3. Async/Await
 * Come avere un cameriere personale:
 * - async: "Questo cameriere si occuperà solo di te"
 * - await: "Aspetta che il piatto sia pronto"
 * 
 * 4. Promise Methods:
 * 
 * Promise.all()
 * Come ordinare più piatti:
 * - Aspetta che TUTTI i piatti siano pronti
 * - Se uno fallisce, fallisce tutto
 * 
 * Promise.race()
 * Come una gara tra camerieri:
 * - Prendi il risultato del più veloce
 * - Ignora gli altri risultati
 * 
 * Promise.allSettled()
 * Come ordinare al buffet:
 * - Aspetta che tutti i piatti siano pronti o non disponibili
 * - Ricevi informazioni su ogni piatto
 * 
 * ⚠️ Best Practices:
 * 1. Preferisci async/await a .then()
 * 2. Usa try/catch per gestire errori
 * 3. Evita il callback hell
 * 4. Usa Promise.all() per operazioni parallele
 */

// 1. Esempio di callback hell (scenario da evitare)
// Come una catena di telefonate: ognuno deve aspettare l'altro
function callbackHellExample(userId) {
    getDatiUtente(userId, (utente) => {
        getOrdini(utente.id, (ordini) => {
            getDettagliOrdine(ordini[0].id, (dettagli) => {
                console.log(dettagli);
            });
        });
    });
}

// 2. Promise - Versione moderna e più pulita
// Come dare il buzzer al cliente
function getDatiUtente(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const utente = { id: userId, nome: 'Mario' };
            if (utente) {
                resolve(utente);  // Il buzzer suona: il tavolo è pronto
            } else {
                reject(new Error('Utente non trovato')); // Non ci sono tavoli
            }
        }, 1000);
    });
}

// 3. async/await - Ancora più pulito e leggibile
// Come avere un cameriere dedicato che gestisce tutto
async function getDatiCompleti(userId) {
    try {
        const utente = await getDatiUtente(userId);      // Aspetta i dati utente
        const ordini = await getOrdini(utente.id);       // Poi prendi gli ordini
        const dettagli = await getDettagliOrdine(ordini[0].id); // Infine i dettagli
        return dettagli;
    } catch (error) {
        console.error('Errore:', error);
        throw error;
    }
}

// 4. Promise.all - Esegui più promise in parallelo
// Come ordinare più piatti contemporaneamente
async function getDatiMultipli(userIds) {
    try {
        const promises = userIds.map(id => getDatiUtente(id));
        const utenti = await Promise.all(promises);  // Aspetta che tutti siano pronti
        return utenti;
    } catch (error) {
        console.error('Errore nel recupero multiplo:', error);
        throw error;
    }
}

// 5. Promise.race - Prendi il primo risultato
// Come una gara tra camerieri: vince il più veloce
async function getDatiConTimeout(userId) {
    const timeout = new Promise((_, reject) => 
        setTimeout(() => reject(new Error('Timeout')), 5000)
    );
    
    return Promise.race([
        getDatiUtente(userId),
        timeout
    ]);
}

// 6. Promise.allSettled - Gestisci tutti i risultati
// Come controllare lo stato di tutti gli ordini al buffet
async function getDatiSicuri(userIds) {
    const results = await Promise.allSettled(
        userIds.map(id => getDatiUtente(id))
    );
    
    return results.map(result => ({
        success: result.status === 'fulfilled',
        value: result.status === 'fulfilled' ? result.value : null,
        error: result.status === 'rejected' ? result.reason : null
    }));
}

// Funzioni di supporto per gli esempi
function getOrdini(userId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve([{ id: 1, userId, prodotto: 'Pizza' }]);
        }, 1000);
    });
}

function getDettagliOrdine(orderId) {
    return new Promise(resolve => {
        setTimeout(() => {
            resolve({ id: orderId, stato: 'consegnato', data: new Date() });
        }, 1000);
    });
}

/**
 * Esempi Pratici:
 * 
 * 1. Uso base di Promise:
 * getDatiUtente(1)
 *     .then(utente => console.log(utente))
 *     .catch(error => console.error(error));
 * 
 * 2. Uso di async/await:
 * async function esempio() {
 *     try {
 *         const utente = await getDatiUtente(1);
 *         console.log(utente);
 *     } catch (error) {
 *         console.error(error);
 *     }
 * }
 * 
 * 3. Uso di Promise.all:
 * async function esempioMultiplo() {
 *     const utenti = await getDatiMultipli([1, 2, 3]);
 *     console.log(utenti);
 * }
 */

module.exports = {
    getDatiUtente,
    getDatiCompleti,
    getDatiMultipli,
    getDatiConTimeout,
    getDatiSicuri,
    getOrdini,
    getDettagliOrdine
};