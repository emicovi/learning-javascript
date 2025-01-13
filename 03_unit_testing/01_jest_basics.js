/**
 * Lezione: Test Unitari con Jest
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🎯 Cos'è il Testing?
 * Pensa ai test come a:
 * - Un controllo qualità in una fabbrica
 * - Un assaggio prima di servire un piatto
 * - Una prova generale prima di uno spettacolo
 * 
 * 🔍 Tipi di Test:
 * 
 * 1. Test Unitari
 * Come controllare singoli ingredienti:
 * - Verifica che lo zucchero sia dolce
 * - Controlla che la farina non sia umida
 * - Testa che il lievito funzioni
 * 
 * 2. Test Asincroni
 * Come aspettare che il dolce sia cotto:
 * - Metti in forno
 * - Aspetta il tempo necessario
 * - Controlla se è pronto
 * 
 * 3. Mock e Stub
 * Come provare una ricetta senza alcuni ingredienti:
 * - Usa sostituti per ingredienti costosi
 * - Simula componenti non disponibili
 * - Testa la logica senza dipendenze esterne
 * 
 * 🛠️ Componenti del Testing:
 * 
 * 1. Describe
 * Come un capitolo di un libro di ricette:
 * - Raggruppa test correlati
 * - Definisce il contesto
 * 
 * 2. It/Test
 * Come singoli passaggi della ricetta:
 * - Verifica un comportamento specifico
 * - Testa un caso d'uso
 * 
 * 3. Expect
 * Come verificare il risultato:
 * - Il dolce è alto abbastanza?
 * - Il colore è giusto?
 * - Il sapore è quello atteso?
 * 
 * ⚠️ Best Practices:
 * 1. Testa un solo concetto per volta
 * 2. Usa nomi descrittivi per i test
 * 3. Prepara i dati di test (setup)
 * 4. Pulisci dopo i test (teardown)
 */

// Funzione semplice per somma
// Come sommare ingredienti in una ricetta
export const sum = (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError('I parametri devono essere numeri');
    }
    return a + b;
};

// Funzione asincrona che simula una chiamata API
// Come ordinare ingredienti dal fornitore
export const fetchUserData = async (userId) => {
    if (!userId) {
        throw new Error('userId è richiesto');
    }
    
    // Simula una chiamata API
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                id: userId,
                name: 'Mario Rossi',
                email: 'mario@example.com'
            });
        }, 100);
    });
};

// Classe da testare
// Come gestire un carrello della spesa
export class ShoppingCart {
    constructor() {
        this.items = [];
    }

    addItem(item) {
        if (!item.name || !item.price) {
            throw new Error('Item deve avere nome e prezzo');
        }
        this.items.push(item);
    }

    removeItem(itemName) {
        const index = this.items.findIndex(item => item.name === itemName);
        if (index === -1) {
            throw new Error('Item non trovato');
        }
        this.items.splice(index, 1);
    }

    getTotal() {
        return this.items.reduce((total, item) => total + item.price, 0);
    }

    clear() {
        this.items = [];
    }
}

// Funzione con callback
// Come dare istruzioni a un assistente
export const processData = (data, successCallback, errorCallback) => {
    if (!Array.isArray(data)) {
        errorCallback('Data deve essere un array');
        return;
    }

    const processed = data.map(item => item * 2);
    successCallback(processed);
};

// Funzione che usa timer
// Come impostare un timer per la cottura
export const delayedGreeting = (name, delay = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Ciao, ${name}!`);
        }, delay);
    });
};

// Funzione che usa external dependencies (da mockare nei test)
// Come simulare un database per i test
export class DatabaseService {
    constructor(db) {
        this.db = db;
    }

    async saveUser(user) {
        if (!user.name || !user.email) {
            throw new Error('Nome e email sono richiesti');
        }
        return this.db.save('users', user);
    }

    async getUser(id) {
        const user = await this.db.get('users', id);
        if (!user) {
            throw new Error('Utente non trovato');
        }
        return user;
    }
}

/**
 * Esempi di Test:
 * 
 * 1. Test Sincrono:
 * test('somma 1 + 2 fa 3', () => {
 *     expect(sum(1, 2)).toBe(3);
 * });
 * 
 * 2. Test Asincrono:
 * test('carica dati utente', async () => {
 *     const user = await fetchUserData(1);
 *     expect(user.name).toBe('Mario Rossi');
 * });
 * 
 * 3. Test con Mock:
 * test('salva utente nel db', async () => {
 *     const mockDb = {
 *         save: jest.fn().mockResolvedValue(true)
 *     };
 *     const service = new DatabaseService(mockDb);
 *     await service.saveUser({name: 'Mario', email: 'mario@example.com'});
 *     expect(mockDb.save).toHaveBeenCalled();
 * });
 */