/**
 * Lezione: Design Patterns in JavaScript
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🎯 Cos'è un Design Pattern?
 * Come una ricetta collaudata per risolvere problemi comuni:
 * - Non devi reinventare la ruota
 * - Soluzioni testate e affidabili
 * - Vocabolario comune tra sviluppatori
 * 
 * 1. PATTERN CREAZIONALI:
 * Come diverse ricette per creare oggetti
 * 
 * Singleton:
 * Come avere un solo telecomando per tutta la TV:
 * - Una sola istanza per tutto il programma
 * - Esempio: configurazione globale, connessione database
 * 
 * Factory:
 * Come una fabbrica di giocattoli:
 * - Dai le specifiche (tipo)
 * - La fabbrica produce l'oggetto giusto
 * - Esempio: creare diversi tipi di documenti
 * 
 * Builder:
 * Come preparare un panino al fast food:
 * - Scegli il pane
 * - Aggiungi gli ingredienti
 * - Personalizza come vuoi
 * 
 * 2. PATTERN STRUTTURALI:
 * Come organizzare oggetti e classi
 * 
 * Adapter:
 * Come un adattatore per prese elettriche:
 * - Converte un'interfaccia in un'altra
 * - Fa funzionare insieme sistemi incompatibili
 * - Esempio: convertire dati XML in JSON
 * 
 * Decorator:
 * Come aggiungere accessori a un vestito:
 * - Aggiunge funzionalità senza modificare la classe
 * - Esempio: aggiungere logging, caching
 * 
 * Facade:
 * Come il telecomando universale:
 * - Semplifica un sistema complesso
 * - Nasconde i dettagli complicati
 * - Esempio: libreria di utility
 * 
 * 3. PATTERN COMPORTAMENTALI:
 * Come gestire interazioni tra oggetti
 * 
 * Observer:
 * Come un sistema di notifiche:
 * - Gli abbonati ricevono aggiornamenti
 * - Il publisher invia le novità
 * - Esempio: aggiornamenti UI, eventi
 * 
 * Strategy:
 * Come scegliere il mezzo di trasporto:
 * - Cambi strategia in base alle necessità
 * - Esempio: diversi metodi di pagamento
 * 
 * Command:
 * Come un telecomando con undo/redo:
 * - Incapsula azioni in oggetti
 * - Può annullare/ripetere operazioni
 * 
 * 4. MODULE PATTERN:
 * Come organizzare un cassetto:
 * - Tutto ha il suo posto
 * - Alcune cose sono private
 * - Altre sono pubbliche
 * 
 * 5. DEPENDENCY INJECTION:
 * Come fornire ingredienti a un cuoco:
 * - Non cerca gli ingredienti da solo
 * - Li riceve già pronti
 * - Più facile cambiare ingredienti
 * 
 * ⚠️ Best Practices:
 * 1. Usa il pattern più semplice che risolve il problema
 * 2. Non forzare l'uso di pattern non necessari
 * 3. Documenta il perché usi un certo pattern
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
        return JSON.parse(this.xmlToJson(xmlData));
    }

    xmlToJson(xml) {
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

/**
 * Esempi di Utilizzo dei Pattern:
 * 
 * 1. Singleton:
 * const config = Database.getInstance();
 * config.set('theme', 'dark');
 * 
 * 2. Factory:
 * const factory = new VehicleFactory();
 * const car = factory.createVehicle('car', { color: 'red' });
 * 
 * 3. Observer:
 * const events = new EventEmitter();
 * events.on('userLogin', user => console.log(`${user} logged in`));
 * events.emit('userLogin', 'Mario');
 */

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
    ServiceContainer
};
