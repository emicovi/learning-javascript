/**
 * Lezione: Scalabilità e Architetture Distribuite
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🎯 Cos'è la Scalabilità?
 * Come gestire un ristorante che diventa sempre più popolare:
 * - Verticale: Cucina più grande
 * - Orizzontale: Aprire nuove sedi
 * - Distribuita: Più cucine che lavorano insieme
 * 
 * 📦 Microservizi:
 * Come dividere un ristorante in stazioni specializzate:
 * - Cucina calda
 * - Cucina fredda
 * - Bar
 * - Dessert
 * Ognuno fa una cosa sola, ma la fa bene!
 * 
 * 🔄 Load Balancing:
 * Come un maitre che distribuisce i clienti ai tavoli:
 * - Round Robin: Un tavolo dopo l'altro
 * - Least Connections: Al tavolo più libero
 * - Weighted: Basato sulle dimensioni del tavolo
 * 
 * 💾 Database Scaling:
 * Come organizzare il magazzino del ristorante:
 * - Sharding: Dividere gli ingredienti in diversi magazzini
 * - Replication: Copie di backup in case di emergenza
 * - Partitioning: Organizzare per tipo di ingrediente
 * 
 * 🌐 Distribuzione Geografica:
 * Come aprire filiali in diverse città:
 * - CDN: Menu e foto vicino ai clienti
 * - Edge Computing: Preparazioni base in ogni sede
 * - Replication: Stesse ricette ovunque
 */

// 1. Sistema di Load Balancing
class LoadBalancer {
    constructor() {
        this.servers = [];
        this.currentIndex = 0;
    }

    addServer(server) {
        this.servers.push({
            instance: server,
            connections: 0,
            health: true
        });
    }

    // Round Robin
    getNextServer() {
        if (this.servers.length === 0) return null;

        const server = this.servers[this.currentIndex];
        this.currentIndex = (this.currentIndex + 1) % this.servers.length;
        return server.instance;
    }

    // Least Connections
    getLeastLoadedServer() {
        if (this.servers.length === 0) return null;

        return this.servers.reduce((min, server) => 
            server.connections < min.connections ? server : min
        ).instance;
    }

    // Health Check
    async healthCheck() {
        for (let server of this.servers) {
            try {
                const healthy = await server.instance.ping();
                server.health = healthy;
            } catch (error) {
                server.health = false;
            }
        }
    }
}

// 2. Microservice Registry
class ServiceRegistry {
    constructor() {
        this.services = new Map();
        this.dependencies = new Map();
    }

    registerService(name, endpoint, healthCheckUrl) {
        this.services.set(name, {
            endpoint,
            healthCheckUrl,
            status: 'active',
            lastCheck: Date.now()
        });
    }

    addDependency(serviceName, dependsOn) {
        if (!this.dependencies.has(serviceName)) {
            this.dependencies.set(serviceName, new Set());
        }
        this.dependencies.get(serviceName).add(dependsOn);
    }

    async checkServiceHealth(name) {
        const service = this.services.get(name);
        if (!service) return false;

        try {
            const response = await fetch(service.healthCheckUrl);
            service.status = response.ok ? 'active' : 'failing';
            service.lastCheck = Date.now();
            return response.ok;
        } catch (error) {
            service.status = 'failing';
            service.lastCheck = Date.now();
            return false;
        }
    }
}

// 3. Sistema di Circuit Breaker
class CircuitBreaker {
    constructor(service, options = {}) {
        this.service = service;
        this.failureThreshold = options.failureThreshold || 5;
        this.resetTimeout = options.resetTimeout || 60000;
        this.failures = 0;
        this.state = 'closed'; // closed, open, half-open
        this.lastFailure = null;
    }

    async execute(request) {
        if (this.state === 'open') {
            if (Date.now() - this.lastFailure >= this.resetTimeout) {
                this.state = 'half-open';
            } else {
                throw new Error('Circuit breaker is open');
            }
        }

        try {
            const result = await this.service(request);
            this.onSuccess();
            return result;
        } catch (error) {
            this.onFailure();
            throw error;
        }
    }

    onSuccess() {
        this.failures = 0;
        this.state = 'closed';
    }

    onFailure() {
        this.failures++;
        this.lastFailure = Date.now();
        if (this.failures >= this.failureThreshold) {
            this.state = 'open';
        }
    }
}

// 4. Esempio di Uso
class MicroserviceExample {
    constructor() {
        this.registry = new ServiceRegistry();
        this.loadBalancer = new LoadBalancer();
        
        // Registra servizi
        this.registry.registerService(
            'orders',
            'http://orders-service:3000',
            'http://orders-service:3000/health'
        );
        this.registry.registerService(
            'inventory',
            'http://inventory-service:3001',
            'http://inventory-service:3001/health'
        );
        
        // Configura dipendenze
        this.registry.addDependency('orders', 'inventory');
        
        // Circuit breaker per il servizio ordini
        this.ordersBreaker = new CircuitBreaker(
            async (order) => {
                const service = this.loadBalancer.getNextServer();
                return await service.processOrder(order);
            },
            { failureThreshold: 3, resetTimeout: 30000 }
        );
    }

    async createOrder(order) {
        try {
            return await this.ordersBreaker.execute(order);
        } catch (error) {
            console.error('Order processing failed:', error);
            throw new Error('Unable to process order');
        }
    }
}

module.exports = {
    LoadBalancer,
    ServiceRegistry,
    CircuitBreaker,
    MicroserviceExample
};