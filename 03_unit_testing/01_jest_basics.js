/**
 * Questo modulo introduce i concetti base dei test unitari con Jest
 */

// Funzione semplice per somma
export const sum = (a, b) => {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new TypeError('I parametri devono essere numeri');
    }
    return a + b;
};

// Funzione asincrona che simula una chiamata API
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
export const processData = (data, successCallback, errorCallback) => {
    if (!Array.isArray(data)) {
        errorCallback('Data deve essere un array');
        return;
    }

    const processed = data.map(item => item * 2);
    successCallback(processed);
};

// Funzione che usa timer
export const delayedGreeting = (name, delay = 1000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Ciao, ${name}!`);
        }, delay);
    });
};

// Funzione che usa external dependencies (da mockare nei test)
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