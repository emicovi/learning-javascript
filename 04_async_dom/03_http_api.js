/**
 * Lezione: HTTP Requests e Interazione con API
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🎯 Cos'è una API?
 * Un'API è come un cameriere in un ristorante:
 * - Tu (il client) fai richieste
 * - Il cameriere (API) porta le richieste in cucina (server)
 * - La cucina prepara e il cameriere riporta la risposta
 * 
 * 📝 Metodi HTTP principali:
 * 
 * GET: Come chiedere un menu
 * - "Vorrei vedere la lista dei piatti disponibili"
 * - Non modifica nulla, solo richiede informazioni
 * 
 * POST: Come ordinare un piatto nuovo
 * - "Vorrei ordinare una pizza margherita"
 * - Crea nuove risorse sul server
 * 
 * PUT: Come modificare un ordine esistente
 * - "Vorrei aggiungere funghi alla mia pizza"
 * - Aggiorna completamente una risorsa
 * 
 * DELETE: Come cancellare un ordine
 * - "Vorrei annullare il mio ordine"
 * - Rimuove una risorsa
 * 
 * 🔑 Autenticazione:
 * Come un braccialetto in un resort:
 * - Login = ricevi il braccialetto
 * - Token = mostri il braccialetto per accedere ai servizi
 * - Logout = restituisci il braccialetto
 * 
 * 🚦 Status Code HTTP:
 * - 200: "Ecco il suo ordine" (OK)
 * - 201: "Ordine creato" (Created)
 * - 400: "Non ho capito l'ordine" (Bad Request)
 * - 401: "Mi mostri il braccialetto?" (Unauthorized)
 * - 404: "Questo piatto non esiste" (Not Found)
 * - 500: "La cucina è in fiamme" (Server Error)
 * 
 * ⚡ Gestione Errori:
 * Come gestire problemi al ristorante:
 * - Verifica se il piatto è disponibile
 * - Gestisci alternative se un ingrediente manca
 * - Comunica chiaramente i problemi al cliente
 * 
 * 🔄 Rate Limiting:
 * Come gestire troppe ordinazioni:
 * - Limita il numero di ordini per tavolo
 * - Metti in coda le richieste eccessive
 * - Previeni il sovraccarico della cucina
 * 
 * 📦 Caching:
 * Come tenere il menu a portata di mano:
 * - Salva temporaneamente informazioni frequenti
 * - Evita di chiedere sempre le stesse cose
 * - Migliora le performance
 * 
 * ⚠️ Best Practices:
 * 1. Gestisci sempre gli errori
 * 2. Usa autenticazione quando necessario
 * 3. Implementa rate limiting
 * 4. Utilizza il caching appropriatamente
 */

// 1. Classe base per le chiamate HTTP
class HTTPClient {
    constructor(baseURL = '', defaultHeaders = {}) {
        this.baseURL = baseURL;
        this.defaultHeaders = {
            'Content-Type': 'application/json',
            ...defaultHeaders
        };
    }

    // Metodo per costruire l'URL completo
    buildURL(endpoint) {
        return `${this.baseURL}${endpoint}`;
    }

    // Gestione unificata degli errori
    handleError(error) {
        if (error.response) {
            // Errore server con risposta
            throw new Error(`HTTP Error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
            // Errore di rete
            throw new Error('Network Error: Unable to reach the server');
        } else {
            // Altri errori
            throw new Error(`Error: ${error.message}`);
        }
    }

    // GET request
    async get(endpoint, params = {}) {
        try {
            const queryString = new URLSearchParams(params).toString();
            const url = `${this.buildURL(endpoint)}${queryString ? `?${queryString}` : ''}`;
            
            const response = await fetch(url, {
                method: 'GET',
                headers: this.defaultHeaders
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            this.handleError(error);
        }
    }

    // POST request
    async post(endpoint, data = {}) {
        try {
            const response = await fetch(this.buildURL(endpoint), {
                method: 'POST',
                headers: this.defaultHeaders,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            this.handleError(error);
        }
    }

    // PUT request
    async put(endpoint, data = {}) {
        try {
            const response = await fetch(this.buildURL(endpoint), {
                method: 'PUT',
                headers: this.defaultHeaders,
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            this.handleError(error);
        }
    }

    // DELETE request
    async delete(endpoint) {
        try {
            const response = await fetch(this.buildURL(endpoint), {
                method: 'DELETE',
                headers: this.defaultHeaders
            });

            if (!response.ok) {
                throw new Error(`HTTP Error: ${response.status}`);
            }

            return await response.json();
        } catch (error) {
            this.handleError(error);
        }
    }
}

// 2. Classe per gestire l'autenticazione
class AuthManager {
    constructor(httpClient) {
        this.httpClient = httpClient;
        this.token = null;
    }

    setToken(token) {
        this.token = token;
        this.httpClient.defaultHeaders['Authorization'] = `Bearer ${token}`;
    }

    clearToken() {
        this.token = null;
        delete this.httpClient.defaultHeaders['Authorization'];
    }

    async login(credentials) {
        try {
            const response = await this.httpClient.post('/auth/login', credentials);
            this.setToken(response.token);
            return response;
        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    }

    async logout() {
        try {
            await this.httpClient.post('/auth/logout');
            this.clearToken();
        } catch (error) {
            console.error('Logout failed:', error);
            throw error;
        }
    }
}

// 3. Classe per gestire le risorse API
class APIResource {
    constructor(httpClient, resourcePath) {
        this.httpClient = httpClient;
        this.resourcePath = resourcePath;
    }

    // CRUD operations
    async getAll(params = {}) {
        return await this.httpClient.get(this.resourcePath, params);
    }

    async getById(id) {
        return await this.httpClient.get(`${this.resourcePath}/${id}`);
    }

    async create(data) {
        return await this.httpClient.post(this.resourcePath, data);
    }

    async update(id, data) {
        return await this.httpClient.put(`${this.resourcePath}/${id}`, data);
    }

    async delete(id) {
        return await this.httpClient.delete(`${this.resourcePath}/${id}`);
    }
}

// 4. Esempio di utilizzo con un'API di todos
class TodoAPI {
    constructor(baseURL = 'https://api.example.com') {
        this.httpClient = new HTTPClient(baseURL);
        this.auth = new AuthManager(this.httpClient);
        this.todos = new APIResource(this.httpClient, '/todos');
    }

    // Metodi specifici per i todos
    async getCompletedTodos() {
        return await this.httpClient.get('/todos', { completed: true });
    }

    async toggleTodoStatus(id, completed) {
        return await this.todos.update(id, { completed });
    }

    async searchTodos(query) {
        return await this.httpClient.get('/todos/search', { q: query });
    }
}

// 5. Utility per gestire il rate limiting e caching
class APIUtils {
    static rateLimit(fn, limit = 1000) {
        const queue = [];
        let ongoing = false;

        const processQueue = async () => {
            if (ongoing || queue.length === 0) return;
            ongoing = true;

            const { args, resolve, reject } = queue.shift();

            try {
                const result = await fn(...args);
                resolve(result);
            } catch (error) {
                reject(error);
            } finally {
                ongoing = false;
                setTimeout(processQueue, limit);
            }
        };

        return (...args) => {
            return new Promise((resolve, reject) => {
                queue.push({ args, resolve, reject });
                processQueue();
            });
        };
    }

    static cache(fn, ttl = 60000) {
        const cache = new Map();

        return async (...args) => {
            const key = JSON.stringify(args);
            const cached = cache.get(key);

            if (cached && cached.timestamp > Date.now() - ttl) {
                return cached.value;
            }

            const result = await fn(...args);
            cache.set(key, {
                value: result,
                timestamp: Date.now()
            });

            return result;
        };
    }
}

module.exports = {
    HTTPClient,
    AuthManager,
    APIResource,
    TodoAPI,
    APIUtils
};