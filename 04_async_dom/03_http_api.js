/**
 * Lezione 3: HTTP Requests e Interazione con API
 * 
 * In questa lezione imparerai:
 * 1. Fetch API nativa
 * 2. Axios e altri HTTP clients
 * 3. REST API interactions
 * 4. Gestione errori HTTP
 * 5. Best practices per chiamate API
 * 6. Autenticazione e headers
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