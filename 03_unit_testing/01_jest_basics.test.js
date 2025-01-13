/**
 * Test dimostrativi per Jest che coprono vari scenari di testing
 */

import {
    sum,
    fetchUserData,
    ShoppingCart,
    processData,
    delayedGreeting,
    DatabaseService
} from './01_jest_basics';

// Test suite per funzioni sincrone
describe('Funzioni sincrone', () => {
    test('sum dovrebbe sommare correttamente due numeri', () => {
        expect(sum(1, 2)).toBe(3);
        expect(sum(-1, 1)).toBe(0);
        expect(sum(0, 0)).toBe(0);
    });

    test('sum dovrebbe lanciare errore per input non numerici', () => {
        expect(() => sum('1', 2)).toThrow(TypeError);
        expect(() => sum(1, '2')).toThrow(TypeError);
        expect(() => sum(null, undefined)).toThrow(TypeError);
    });
});

// Test suite per funzioni asincrone
describe('Funzioni asincrone', () => {
    test('fetchUserData dovrebbe restituire i dati utente', async () => {
        const userData = await fetchUserData(1);
        expect(userData).toEqual({
            id: 1,
            name: 'Mario Rossi',
            email: 'mario@example.com'
        });
    });

    test('fetchUserData dovrebbe lanciare errore senza userId', async () => {
        await expect(fetchUserData()).rejects.toThrow('userId è richiesto');
    });
});

// Test suite per classi con setup/teardown
describe('ShoppingCart', () => {
    let cart;

    // Setup - eseguito prima di ogni test
    beforeEach(() => {
        cart = new ShoppingCart();
    });

    test('dovrebbe iniziare vuoto', () => {
        expect(cart.items).toHaveLength(0);
        expect(cart.getTotal()).toBe(0);
    });

    test('dovrebbe aggiungere items correttamente', () => {
        const item = { name: 'Test Item', price: 10 };
        cart.addItem(item);
        expect(cart.items).toHaveLength(1);
        expect(cart.items[0]).toEqual(item);
    });

    test('dovrebbe calcolare il totale correttamente', () => {
        cart.addItem({ name: 'Item 1', price: 10 });
        cart.addItem({ name: 'Item 2', price: 20 });
        expect(cart.getTotal()).toBe(30);
    });

    test('dovrebbe rimuovere items correttamente', () => {
        cart.addItem({ name: 'Item 1', price: 10 });
        cart.removeItem('Item 1');
        expect(cart.items).toHaveLength(0);
    });

    test('dovrebbe lanciare errore rimuovendo item inesistente', () => {
        expect(() => cart.removeItem('Non esiste')).toThrow('Item non trovato');
    });
});

// Test con mock di callbacks
describe('Process Data con callbacks', () => {
    test('dovrebbe processare i dati correttamente', () => {
        const successCallback = jest.fn();
        const errorCallback = jest.fn();
        
        processData([1, 2, 3], successCallback, errorCallback);
        
        expect(successCallback).toHaveBeenCalledWith([2, 4, 6]);
        expect(errorCallback).not.toHaveBeenCalled();
    });

    test('dovrebbe chiamare errorCallback per input non valido', () => {
        const successCallback = jest.fn();
        const errorCallback = jest.fn();
        
        processData('not an array', successCallback, errorCallback);
        
        expect(errorCallback).toHaveBeenCalledWith('Data deve essere un array');
        expect(successCallback).not.toHaveBeenCalled();
    });
});

// Test con timer mockati
describe('Delayed Greeting con timer mock', () => {
    beforeEach(() => {
        jest.useFakeTimers();
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('dovrebbe risolvere dopo il delay specificato', async () => {
        const promise = delayedGreeting('Mario');
        
        jest.advanceTimersByTime(1000);
        
        const result = await promise;
        expect(result).toBe('Ciao, Mario!');
    });
});

// Test con mock di dependencies esterne
describe('DatabaseService con mock', () => {
    let dbService;
    let mockDb;

    beforeEach(() => {
        // Mock del database
        mockDb = {
            save: jest.fn(),
            get: jest.fn()
        };
        dbService = new DatabaseService(mockDb);
    });

    test('saveUser dovrebbe salvare utente valido', async () => {
        const user = { name: 'Mario', email: 'mario@example.com' };
        mockDb.save.mockResolvedValue({ id: 1, ...user });

        const result = await dbService.saveUser(user);
        
        expect(mockDb.save).toHaveBeenCalledWith('users', user);
        expect(result).toEqual({ id: 1, ...user });
    });

    test('getUser dovrebbe recuperare utente esistente', async () => {
        const user = { id: 1, name: 'Mario', email: 'mario@example.com' };
        mockDb.get.mockResolvedValue(user);

        const result = await dbService.getUser(1);
        
        expect(mockDb.get).toHaveBeenCalledWith('users', 1);
        expect(result).toEqual(user);
    });

    test('getUser dovrebbe lanciare errore per utente non trovato', async () => {
        mockDb.get.mockResolvedValue(null);
        
        await expect(dbService.getUser(999)).rejects.toThrow('Utente non trovato');
    });
});