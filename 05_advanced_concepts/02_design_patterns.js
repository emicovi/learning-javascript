/**
 * Lezione 2: Design Patterns in JavaScript
 * 
 * In questa lezione imparerai:
 * 1. Pattern Creazionali (Singleton, Factory, Builder)
 * 2. Pattern Strutturali (Adapter, Decorator, Facade)
 * 3. Pattern Comportamentali (Observer, Strategy, Command)
 * 4. Module Pattern e Revealing Module
 * 5. Dependency Injection
 * 6. Best Practices
 */

// 1. PATTERN CREAZIONALI

// Singleton Pattern
class Database {
    static #instance = null;
    
    constructor() {
        if (Database.#instance) {
            return Database.#instance;
        }
        this.data = new Map();
        Database.#instance = this;
    }

    static getInstance() {
        if (!Database.#instance) {
            Database.#instance = new Database();
        }
        return Database.#instance;
    }

    set(key, value) {
        this.data.set(key, value);
    }

    get(key) {
        return this.data.get(key);
    }
}

// Factory Pattern
class VehicleFactory {
    createVehicle(type, options) {
        switch (type.toLowerCase()) {
            case 'car':
                return new Car(options);
            case 'bike':
                return new Bike(options);
            case 'truck':
                return new Truck(options);
            default:
                throw new Error(`Vehicle type ${type} not supported`);
        }
    }
}

// Builder Pattern
class UIComponentBuilder {
    constructor() {
        this.reset();
    }

    reset() {
        this.component = {
            type: '',
            props: {},
            children: [],
            styles: {}
        };
    }

    setType(type) {
        this.component.type = type;
        return this;
    }

    addProps(props) {
        this.component.props = { ...this.component.props, ...props };
        return this;
    }

    addChild(child) {
        this.component.children.push(child);
        return this;
    }

    setStyles(styles) {
        this.component.styles = { ...this.component.styles, ...styles };
        return this;
    }

    build() {
        const result = this.component;
        this.reset();
        return result;
    }
}

// 2. PATTERN STRUTTURALI

// Adapter Pattern
class OldAPI {
    getDataInXML() {
        return '<data><item>1</item><item>2</item></data>';
    }
}

class NewAPI {
    constructor(adapter) {
        this.adapter = adapter;
    }

    getData() {
        const xmlData = this.adapter.getDataInXML();
        // Converti XML in JSON
        return JSON.parse(this.xmlToJson(xmlData));
    }

    xmlToJson(xml) {
        // Implementazione semplificata
        return '{"data": [1, 2]}';
    }
}

// Decorator Pattern
class Logger {
    constructor(component) {
        this.component = component;
    }

    operation(...args) {
        console.log(`Chiamata operation con args:`, args);
        const result = this.component.operation(...args);
        console.log(`Risultato:`, result);
        return result;
    }
}

// Facade Pattern
class SystemFacade {
    constructor() {
        this.database = new Database();
        this.auth = new AuthSystem();
        this.logger = new Logger();
    }

    performComplexOperation(data) {
        this.logger.log('Starting operation');
        if (this.auth.checkPermissions()) {
            this.database.save(data);
            this.logger.log('Operation completed');
            return true;
        }
        return false;
    }
}

// 3. PATTERN COMPORTAMENTALI

// Observer Pattern
class EventEmitter {
    constructor() {
        this.events = new Map();
    }

    on(event, callback) {
        if (!this.events.has(event)) {
            this.events.set(event, []);
        }
        this.events.get(event).push(callback);
    }

    emit(event, data) {
        if (this.events.has(event)) {
            this.events.get(event).forEach(callback => callback(data));
        }
    }

    off(event, callback) {
        if (this.events.has(event)) {
            const callbacks = this.events.get(event);
            const index = callbacks.indexOf(callback);
            if (index > -1) {
                callbacks.splice(index, 1);
            }
        }
    }
}

// Strategy Pattern
class PaymentProcessor {
    constructor() {
        this.strategy = null;
    }

    setStrategy(strategy) {
        this.strategy = strategy;
    }

    processPayment(amount) {
        if (!this.strategy) {
            throw new Error('Payment strategy not set');
        }
        return this.strategy.process(amount);
    }
}

// Command Pattern
class CommandManager {
    constructor() {
        this.commands = [];
        this.current = -1;
    }

    execute(command) {
        command.execute();
        this.commands.push(command);
        this.current++;
    }

    undo() {
        if (this.current >= 0) {
            const command = this.commands[this.current];
            command.undo();
            this.current--;
        }
    }

    redo() {
        if (this.current < this.commands.length - 1) {
            this.current++;
            const command = this.commands[this.current];
            command.execute();
        }
    }
}

// 4. MODULE PATTERN
const UserModule = (function() {
    // Private variables
    let currentUser = null;
    
    // Private functions
    function validateUser(user) {
        return user.username && user.password;
    }
    
    // Public interface
    return {
        login(user) {
            if (validateUser(user)) {
                currentUser = user;
                return true;
            }
            return false;
        },
        
        logout() {
            currentUser = null;
        },
        
        getCurrentUser() {
            return currentUser;
        }
    };
})();

// 5. DEPENDENCY INJECTION
class ServiceContainer {
    constructor() {
        this.services = new Map();
    }

    register(name, service) {
        this.services.set(name, service);
    }

    resolve(name) {
        if (!this.services.has(name)) {
            throw new Error(`Service ${name} not found`);
        }
        return this.services.get(name);
    }
}

// Esempi di utilizzo dei pattern
function esempiUtilizzo() {
    // Singleton
    const db1 = Database.getInstance();
    const db2 = Database.getInstance();
    console.log(db1 === db2); // true

    // Builder
    const builder = new UIComponentBuilder();
    const button = builder
        .setType('button')
        .addProps({ text: 'Click me' })
        .setStyles({ color: 'blue' })
        .build();

    // Observer
    const emitter = new EventEmitter();
    emitter.on('update', data => console.log(data));
    emitter.emit('update', { message: 'Hello' });

    // Strategy
    const processor = new PaymentProcessor();
    processor.setStrategy({
        process: amount => `Processed ${amount}€`
    });
    console.log(processor.processPayment(100));
}

module.exports = {
    Database,
    VehicleFactory,
    UIComponentBuilder,
    NewAPI,
    SystemFacade,
    EventEmitter,
    PaymentProcessor,
    CommandManager,
    UserModule,
    ServiceContainer,
    esempiUtilizzo
};
