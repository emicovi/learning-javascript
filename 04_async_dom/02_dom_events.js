/**
 * Lezione 2: Manipolazione del DOM e Eventi
 * 
 * In questa lezione imparerai:
 * 1. Selezionare elementi del DOM
 * 2. Creare e modificare elementi
 * 3. Eventi e loro gestione
 * 4. Event bubbling e capturing
 * 5. Delegazione degli eventi
 * 6. Best practices per la performance
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

// Esporta tutto per i test e il riutilizzo
module.exports = {
    getDOMElements,
    DOMManipulator,
    EventHandler,
    EventDelegator,
    TodoList,
    DOMPerformance
};