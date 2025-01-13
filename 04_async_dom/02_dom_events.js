/**
 * Lezione: Manipolazione del DOM e Eventi
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🎯 Cos'è il DOM?
 * Il DOM è come l'albero genealogico di una pagina web:
 * - HTML è il capostipite
 * - Body e Head sono i figli
 * - Tutti gli elementi sono discendenti
 * 
 * 📝 Concetti Chiave:
 * 
 * 1. Selezione degli Elementi
 * Come trovare persone in un edificio:
 * - getElementById: cerca per numero appartamento
 * - getElementsByClassName: cerca per cognome
 * - querySelector: cerca con criteri specifici
 * 
 * 2. Creazione e Modifica
 * Come arredare una stanza:
 * - createElement: comprare un mobile nuovo
 * - appendChild: posizionare il mobile
 * - setAttribute: personalizzare il mobile
 * 
 * 3. Eventi
 * Come un sistema di campanelli:
 * - click: qualcuno suona
 * - submit: consegna un pacco
 * - hover: passa davanti al sensore
 * 
 * 4. Event Bubbling
 * Come gridare in un palazzo:
 * - L'evento parte dal piano più basso
 * - Sale fino all'attico
 * - Ogni piano può "ascoltare"
 * 
 * Esempio pratico:
 * click su un bottone ->
 * bottone -> div -> body -> html
 * 
 * 5. Event Delegation
 * Come un portiere che gestisce pacchi per tutto il palazzo:
 * - Invece di un campanello per appartamento
 * - Un portiere gestisce tutto
 * - Più efficiente e facile da gestire
 * 
 * 6. Performance
 * Come gestire un trasloco:
 * - Batch Updates: spostare più mobili insieme
 * - Debounce: aspettare che finisca di piovere prima di uscire
 * - Throttle: bere acqua a intervalli regolari
 * 
 * ⚠️ Best Practices:
 * 1. Minimizza le manipolazioni DOM
 * 2. Usa la delegazione degli eventi
 * 3. Batch update quando possibile
 * 4. Pulisci gli event listener
 */

// 1. Selezionare elementi
const getDOMElements = () => ({
    // Metodi di selezione moderni
    byId: (id) => document.getElementById(id),
    byClass: (className) => document.getElementsByClassName(className),
    byQuery: (selector) => document.querySelector(selector),
    byQueryAll: (selector) => document.querySelectorAll(selector)
});

// 2. Creare e modificare elementi
class DOMManipulator {
    static createElement(tag, attributes = {}, textContent = '') {
        const element = document.createElement(tag);
        
        // Imposta gli attributi
        Object.entries(attributes).forEach(([key, value]) => {
            element.setAttribute(key, value);
        });
        
        // Imposta il contenuto
        if (textContent) {
            element.textContent = textContent;
        }
        
        return element;
    }

    static appendChildren(parent, ...children) {
        children.forEach(child => parent.appendChild(child));
    }

    static updateStyles(element, styles) {
        Object.assign(element.style, styles);
    }

    static toggleClass(element, className) {
        element.classList.toggle(className);
    }
}

// 3. Gestione Eventi
class EventHandler {
    constructor(element) {
        this.element = element;
        this.events = new Map();
    }

    on(eventType, callback, options = {}) {
        const handler = (e) => {
            callback(e);
        };
        
        this.element.addEventListener(eventType, handler, options);
        this.events.set(callback, handler);
        
        return this; // Per concatenamento
    }

    off(eventType, callback) {
        const handler = this.events.get(callback);
        if (handler) {
            this.element.removeEventListener(eventType, handler);
            this.events.delete(callback);
        }
        
        return this;
    }
}

// 4. Delegazione degli Eventi
class EventDelegator {
    static delegate(parentElement, childSelector, eventType, handler) {
        parentElement.addEventListener(eventType, (e) => {
            const targetElement = e.target.closest(childSelector);
            
            if (targetElement && parentElement.contains(targetElement)) {
                handler(e, targetElement);
            }
        });
    }
}

// 5. Esempio di Componente Riutilizzabile
class TodoList {
    constructor(containerId) {
        this.container = document.getElementById(containerId);
        this.todos = [];
        this.setupUI();
    }

    setupUI() {
        // Crea form
        const form = DOMManipulator.createElement('form', { class: 'todo-form' });
        const input = DOMManipulator.createElement('input', {
            type: 'text',
            placeholder: 'Aggiungi todo'
        });
        const button = DOMManipulator.createElement('button', 
            { type: 'submit' }, 
            'Aggiungi'
        );

        // Crea lista
        this.list = DOMManipulator.createElement('ul', { class: 'todo-list' });

        // Assembla UI
        DOMManipulator.appendChildren(form, input, button);
        DOMManipulator.appendChildren(this.container, form, this.list);

        // Eventi
        const eventHandler = new EventHandler(form);
        eventHandler.on('submit', (e) => {
            e.preventDefault();
            if (input.value.trim()) {
                this.addTodo(input.value);
                input.value = '';
            }
        });

        // Delegazione eventi per i todo
        EventDelegator.delegate(
            this.list,
            'li',
            'click',
            (e, li) => this.toggleTodo(li)
        );
    }

    addTodo(text) {
        const todo = DOMManipulator.createElement('li', {}, text);
        this.list.appendChild(todo);
        this.todos.push({ text, completed: false });
    }

    toggleTodo(li) {
        const index = Array.from(this.list.children).indexOf(li);
        this.todos[index].completed = !this.todos[index].completed;
        DOMManipulator.toggleClass(li, 'completed');
    }
}

// 6. Performance Utilities
const DOMPerformance = {
    batchUpdates(updates) {
        // Usa DocumentFragment per batch updates
        const fragment = document.createDocumentFragment();
        updates.forEach(update => fragment.appendChild(update));
        return fragment;
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function executedFunction(...args) {
            if (!inThrottle) {
                func(...args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

/**
 * Esempi Pratici:
 * 
 * 1. Creazione di un elemento:
 * const div = DOMManipulator.createElement('div', {
 *     class: 'container',
 *     id: 'main'
 * }, 'Contenuto');
 * 
 * 2. Gestione eventi:
 * const handler = new EventHandler(button);
 * handler.on('click', () => console.log('click'))
 *        .on('mouseover', () => console.log('hover'));
 * 
 * 3. Delegazione eventi:
 * EventDelegator.delegate(
 *     document.body,
 *     'button',
 *     'click',
 *     (e, button) => console.log('Button clicked:', button)
 * );
 */

// Esporta tutto per i test e il riutilizzo
module.exports = {
    getDOMElements,
    DOMManipulator,
    EventHandler,
    EventDelegator,
    TodoList,
    DOMPerformance
};