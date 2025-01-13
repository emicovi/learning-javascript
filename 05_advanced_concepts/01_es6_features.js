/**
 * Lezione 1: ES6+ Features Avanzate
 * 
 * In questa lezione imparerai:
 * 1. Generators e Iterators
 * 2. Proxy e Reflection
 * 3. WeakMap e WeakSet
 * 4. Symbol e proprietà uniche
 * 5. Decorators (Stage 3)
 * 6. Optional Chaining e Nullish Coalescing
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

// Esempi di utilizzo
function esempiUtilizzo() {
    // Generator
    const numeri = numeroGenerator();
    console.log([...numeri]); // [1, 2, 3]

    // Proxy
    const user = new Proxy({}, handler);
    user.nome = 'Mario';

    // Symbol
    const obj = new SpecialObject('test');
    console.log(obj.getMetadata());

    // Template literal taggato
    const nome = 'Mario';
    const saluto = html`<div>Ciao ${nome}!</div>`;

    // Optional chaining e nullish coalescing
    const config = {
        settings: {
            theme: {
                color: 'dark'
            }
        }
    };
    const color = config?.settings?.theme?.color ?? 'light';
}

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
