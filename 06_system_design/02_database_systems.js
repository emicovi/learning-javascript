/**
 * Lezione: Sistemi di Database e Persistenza
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🎯 Tipi di Database:
 * Come diversi tipi di archivi:
 * - SQL: Come un archivio con schedari organizzati (righe e colonne)
 * - NoSQL: Come scatole flessibili che contengono di tutto
 * - Cache: Come un piccolo cassetto per le cose usate spesso
 * 
 * 📊 Database SQL:
 * Come un libro contabile:
 * - Tabelle ben definite
 * - Relazioni tra dati
 * - ACID (Atomicità, Consistenza, Isolamento, Durabilità)
 * - Esempio: MySQL, PostgreSQL
 * 
 * 📦 Database NoSQL:
 * Come contenitori flessibili:
 * - Document: Come fascicoli (MongoDB)
 * - Key-Value: Come armadietti (Redis)
 * - Column: Come schedari verticali (Cassandra)
 * - Graph: Come mappe di collegamenti (Neo4j)
 * 
 * 🔄 Replicazione:
 * Come fare copie di backup:
 * - Master-Slave: Un originale e molte copie
 * - Multi-Master: Più originali sincronizzati
 * 
 * 📈 Sharding:
 * Come dividere un grande archivio:
 * - Orizzontale: Dividi per righe
 * - Verticale: Dividi per colonne
 */

// 1. Database Connection Manager
class DatabaseManager {
    constructor() {
        this.connections = new Map();
    }

    addConnection(name, config) {
        this.connections.set(name, {
            config,
            pool: [],
            status: 'disconnected'
        });
    }

    async connect(name) {
        const connection = this.connections.get(name);
        if (!connection) throw new Error(`Database ${name} not configured`);

        try {
            // Simulazione connessione
            connection.status = 'connected';
            console.log(`Connected to ${name} database`);
        } catch (error) {
            connection.status = 'error';
            throw new Error(`Connection failed: ${error.message}`);
        }
    }
}

// 2. Query Builder (SQL)
class SQLQueryBuilder {
    constructor() {
        this.query = {
            type: '',
            table: '',
            fields: [],
            conditions: [],
            values: [],
            joins: []
        };
    }

    select(fields = ['*']) {
        this.query.type = 'SELECT';
        this.query.fields = fields;
        return this;
    }

    from(table) {
        this.query.table = table;
        return this;
    }

    where(condition) {
        this.query.conditions.push(condition);
        return this;
    }

    join(table, condition) {
        this.query.joins.push({ table, condition });
        return this;
    }

    build() {
        let sql = `${this.query.type} ${this.query.fields.join(', ')} FROM ${this.query.table}`;
        
        if (this.query.joins.length > 0) {
            sql += this.query.joins.map(join => 
                ` JOIN ${join.table} ON ${join.condition}`
            ).join('');
        }

        if (this.query.conditions.length > 0) {
            sql += ` WHERE ${this.query.conditions.join(' AND ')}`;
        }

        return sql;
    }
}

// 3. Document Database Operations (NoSQL)
class DocumentDB {
    constructor() {
        this.collections = new Map();
    }

    // Inserisce un documento
    insert(collection, document) {
        if (!this.collections.has(collection)) {
            this.collections.set(collection, []);
        }
        const doc = { _id: this.generateId(), ...document };
        this.collections.get(collection).push(doc);
        return doc;
    }

    // Trova documenti
    find(collection, query = {}) {
        const docs = this.collections.get(collection) || [];
        return docs.filter(doc => this.matchQuery(doc, query));
    }

    // Aggiorna un documento
    update(collection, query, update) {
        const docs = this.collections.get(collection) || [];
        return docs.map(doc => {
            if (this.matchQuery(doc, query)) {
                return { ...doc, ...update };
            }
            return doc;
        });
    }

    // Elimina documenti
    delete(collection, query) {
        const docs = this.collections.get(collection) || [];
        this.collections.set(
            collection,
            docs.filter(doc => !this.matchQuery(doc, query))
        );
    }

    // Utility per generare ID
    generateId() {
        return Math.random().toString(36).substr(2, 9);
    }

    // Utility per il matching delle query
    matchQuery(doc, query) {
        return Object.entries(query).every(([key, value]) => doc[key] === value);
    }
}

// 4. Cache Manager (Redis-like)
class CacheManager {
    constructor(options = {}) {
        this.store = new Map();
        this.ttl = options.ttl || 3600; // Default 1 hour
    }

    set(key, value, ttl = this.ttl) {
        this.store.set(key, {
            value,
            expiry: Date.now() + (ttl * 1000)
        });
    }

    get(key) {
        const item = this.store.get(key);
        
        if (!item) return null;
        
        if (Date.now() > item.expiry) {
            this.store.delete(key);
            return null;
        }

        return item.value;
    }

    delete(key) {
        return this.store.delete(key);
    }

    clear() {
        this.store.clear();
    }

    // Cleanup expired items
    cleanup() {
        for (const [key, item] of this.store.entries()) {
            if (Date.now() > item.expiry) {
                this.store.delete(key);
            }
        }
    }
}

// 5. Esempio di Utilizzo
class DatabaseExample {
    constructor() {
        this.sql = new SQLQueryBuilder();
        this.nosql = new DocumentDB();
        this.cache = new CacheManager({ ttl: 1800 }); // 30 minutes
    }

    async getUserWithPosts(userId) {
        // Prima controlla la cache
        const cached = this.cache.get(`user_posts_${userId}`);
        if (cached) return cached;

        // Query SQL per user e posts
        const query = this.sql
            .select(['users.*', 'posts.title', 'posts.content'])
            .from('users')
            .join('posts', 'users.id = posts.user_id')
            .where(`users.id = ${userId}`)
            .build();

        // Simula risultato query
        const result = {
            id: userId,
            name: 'Example User',
            posts: [
                { title: 'Post 1', content: 'Content 1' },
                { title: 'Post 2', content: 'Content 2' }
            ]
        };

        // Salva in cache
        this.cache.set(`user_posts_${userId}`, result);

        return result;
    }
}

module.exports = {
    DatabaseManager,
    SQLQueryBuilder,
    DocumentDB,
    CacheManager,
    DatabaseExample
};