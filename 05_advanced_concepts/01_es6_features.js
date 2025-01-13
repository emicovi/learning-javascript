/**
 * Lezione: ES6+ Features Avanzate
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🎯 Concetti Avanzati ES6+:
 * 
 * 1. Generators e Iterators
 * Come un distributore automatico:
 * - yield è come premere il pulsante per il prossimo prodotto
 * - Ogni volta che premi, ottieni un nuovo elemento
 * - Puoi fermarti quando vuoi
 * 
 * Esempio pratico:
 * - Come distribuire carte da un mazzo
 * - Come servire clienti uno alla volta
 * 
 * 2. Proxy e Reflection
 * Come un maggiordomo che controlla accessi e modifiche:
 * - Proxy: il maggiordomo che intercetta le richieste
 * - Reflection: il modo in cui il maggiordomo esegue le azioni
 * 
 * Esempio pratico:
 * - Controllare chi accede a una stanza
 * - Registrare tutte le attività
 * 
 * 3. WeakMap e WeakSet
 * Come una bacheca con post-it:
 * - WeakMap: post-it che cadono quando rimuovi la foto
 * - WeakSet: lista di elementi che spariscono automaticamente
 * 
 * Vantaggi:
 * - Evita memory leaks
 * - Pulisce automaticamente
 * 
 * 4. Symbol
 * Come un timbro unico per documenti:
 * - Crea identificatori unici
 * - Non può essere duplicato
 * - Perfetto per proprietà private
 * 
 * 5. Decorators
 * Come aggiungere funzionalità a un oggetto:
 * - @readonly: come mettere un lucchetto
 * - @log: come installare una telecamera
 * 
 * 6. Optional Chaining (?.)
 * Come cercare qualcosa in casa:
 * - Controlla se c'è il garage
 * - SE c'è, controlla se c'è l'auto
 * - SE c'è, controlla se c'è la chiave
 * 
 * 7. Nullish Coalescing (??)
 * Come avere un piano B:
 * - Usa il valore se esiste
 * - Altrimenti usa il valore di default
 * 
 * ⚠️ Best Practices:
 * 1. Usa Generators per dati sequenziali
 * 2. Usa Proxy per logging e validazione
 * 3. Usa WeakMap/WeakSet per dati temporanei
 * 4. Usa Symbol per proprietà veramente private
 */

// 1. Generators e Iterators
function* numeroGenerator() {
    yield 1;
    yield 2;
    yield 3;
}

function* rangeGenerator(start, end) {
    for (let i = start; i <= end; i++) {
        yield i;
    }
}

class IterableCollection {
    constructor(items) {
        this.items = items;
    }

    *[Symbol.iterator]() {
        for (const item of this.items) {
            yield item;
        }
    }
}

// 2. Proxy e Reflection
const handler = {
    get(target, prop) {
        console.log(`Accesso alla proprietà: ${prop}`);
        return Reflect.get(target, prop);
    },
    set(target, prop, value) {
        console.log(`Impostazione proprietà: ${prop} = ${value}`);
        return Reflect.set(target, prop, value);
    }
};

function createValidatedObject(initialData, validator) {
    return new Proxy(initialData, {
        set(target, prop, value) {
            if (validator(prop, value)) {
                return Reflect.set(target, prop, value);
            }
            throw new Error(`Validazione fallita per ${prop}`);
        }
    });
}

// 3. WeakMap e WeakSet
class DOMNodeData {
    constructor() {
        // WeakMap permette garbage collection
        this.nodeData = new WeakMap();
    }

    setData(node, data) {
        this.nodeData.set(node, data);
    }

    getData(node) {
        return this.nodeData.get(node);
    }
}

class UniqueObjectTracker {
    constructor() {
        // WeakSet per oggetti unici
        this.trackedObjects = new WeakSet();
    }

    track(obj) {
        if (this.trackedObjects.has(obj)) {
            return false;
        }
        this.trackedObjects.add(obj);
        return true;
    }
}

// 4. Symbol e proprietà uniche
const TYPE = Symbol('type');
const METADATA = Symbol('metadata');

class SpecialObject {
    constructor(type) {
        this[TYPE] = type;
        this[METADATA] = {
            created: new Date(),
            id: Math.random().toString(36)
        };
    }

    getMetadata() {
        return this[METADATA];
    }
}

// 5. Decorators (Stage 3)
// Nota: Richiede configurazione Babel
function readonly(target, key, descriptor) {
    descriptor.writable = false;
    return descriptor;
}

function log(target, key, descriptor) {
    const original = descriptor.value;
    descriptor.value = function(...args) {
        console.log(`Chiamata ${key} con args:`, args);
        return original.apply(this, args);
    };
    return descriptor;
}

class Example {
    @readonly
    pi() { return 3.14159; }

    @log
    sum(a, b) {
        return a + b;
    }
}

// 6. Optional Chaining e Nullish Coalescing
class APIResponse {
    static extractData(response) {
        // Optional chaining
        const data = response?.data?.items?.[0];
        // Nullish coalescing
        const status = response?.status ?? 'pending';
        return { data, status };
    }
}

// 7. Tagged Templates
function html(strings, ...values) {
    return strings.reduce((result, str, i) => {
        return result + str + (values[i] || '');
    }, '');
}

// 8. BigInt e numeric separators
const bigNumber = 1_000_000_000_000_000n;
const budget = 1_000_000; // più leggibile

/**
 * Esempi Pratici:
 * 
 * 1. Generator:
 * const numeri = numeroGenerator();
 * for (const n of numeri) {
 *     console.log(n); // 1, 2, 3
 * }
 * 
 * 2. Proxy:
 * const user = new Proxy({}, handler);
 * user.nome = 'Mario'; // Logga l'accesso
 * 
 * 3. WeakMap:
 * const cache = new WeakMap();
 * const user = { id: 1 };
 * cache.set(user, { data: 'cached' });
 * // Se user viene eliminato, cache si pulisce da sola
 * 
 * 4. Optional Chaining:
 * const nome = user?.info?.name ?? 'Sconosciuto';
 */

module.exports = {
    numeroGenerator,
    rangeGenerator,
    IterableCollection,
    createValidatedObject,
    DOMNodeData,
    UniqueObjectTracker,
    SpecialObject,
    APIResponse,
    html,
    esempiUtilizzo
};
