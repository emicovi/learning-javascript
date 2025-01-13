/**
 * Lezione 1: Programmazione Asincrona in JavaScript
 * 
 * In questa lezione imparerai:
 * 1. Callbacks e callback hell
 * 2. Promises e loro stati
 * 3. async/await
 * 4. Gestione degli errori
 * 5. Promise methods (all, race, allSettled)
 */

// 1. Esempio di callback hell (scenario da evitare)
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
function getDatiUtente(userId) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const utente = { id: userId, nome: 'Mario' };
            if (utente) {
                resolve(utente);
            } else {
                reject(new Error('Utente non trovato'));
            }
        }, 1000);
    });
}

// 3. async/await - Ancora più pulito e leggibile
async function getDatiCompleti(userId) {
    try {
        const utente = await getDatiUtente(userId);
        const ordini = await getOrdini(utente.id);
        const dettagli = await getDettagliOrdine(ordini[0].id);
        return dettagli;
    } catch (error) {
        console.error('Errore:', error);
        throw error;
    }
}

// 4. Promise.all - Esegui più promise in parallelo
async function getDatiMultipli(userIds) {
    try {
        const promises = userIds.map(id => getDatiUtente(id));
        const utenti = await Promise.all(promises);
        return utenti;
    } catch (error) {
        console.error('Errore nel recupero multiplo:', error);
        throw error;
    }
}

// 5. Promise.race - Prendi il primo risultato
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

module.exports = {
    getDatiUtente,
    getDatiCompleti,
    getDatiMultipli,
    getDatiConTimeout,
    getDatiSicuri,
    getOrdini,
    getDettagliOrdine
};