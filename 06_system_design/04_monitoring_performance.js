/**
 * Lezione: Monitoring e Performance
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🎯 Monitoring:
 * Come un cruscotto dell'auto:
 * - Metriche: Velocità, temperatura, carburante
 * - Alerts: Spie di avvertimento
 * - Logging: Scatola nera
 * 
 * 📊 Metriche Chiave:
 * - Response Time: Quanto è veloce?
 * - Throughput: Quante richieste gestiamo?
 * - Error Rate: Quanti errori?
 * - Resource Usage: CPU, Memoria, Disco
 * 
 * 🚨 Alerting:
 * Come un sistema di allarme:
 * - Warning: "Attenzione, situazione anomala"
 * - Critical: "Emergenza, intervento necessario"
 * - Recovery: "Situazione risolta"
 * 
 * 📈 Performance:
 * Come ottimizzare una fabbrica:
 * - Caching: Magazzino veloce
 * - Load Balancing: Distribuzione del lavoro
 * - Ottimizzazione: Processi più efficienti
 */

// 1. Sistema di Monitoring
class MonitoringSystem {
    constructor() {
        this.metrics = new Map();
        this.alerts = [];
        this.logs = [];
        this.thresholds = new Map();
    }

    // Registra una metrica
    recordMetric(name, value, timestamp = Date.now()) {
        if (!this.metrics.has(name)) {
            this.metrics.set(name, []);
        }

        const metrics = this.metrics.get(name);
        metrics.push({ value, timestamp });

        // Mantieni solo le ultime 1000 metriche
        if (metrics.length > 1000) {
            metrics.shift();
        }

        // Verifica soglie
        this.checkThresholds(name, value);
    }

    // Imposta soglie per gli alert
    setThreshold(metricName, warning, critical) {
        this.thresholds.set(metricName, { warning, critical });
    }

    // Verifica soglie e genera alert
    checkThresholds(metricName, value) {
        const threshold = this.thresholds.get(metricName);
        if (!threshold) return;

        if (value >= threshold.critical) {
            this.createAlert(metricName, 'CRITICAL', value);
        } else if (value >= threshold.warning) {
            this.createAlert(metricName, 'WARNING', value);
        }
    }

    // Crea un alert
    createAlert(metric, level, value) {
        const alert = {
            metric,
            level,
            value,
            timestamp: Date.now()
        };

        this.alerts.push(alert);
        this.log(`ALERT [${level}] ${metric}: ${value}`);
    }

    // Registra un log
    log(message, level = 'INFO') {
        const logEntry = {
            timestamp: Date.now(),
            level,
            message
        };

        this.logs.push(logEntry);
        console.log(`[${level}] ${message}`);
    }

    // Calcola statistiche per una metrica
    getMetricStats(name) {
        const metrics = this.metrics.get(name);
        if (!metrics || metrics.length === 0) {
            return null;
        }

        const values = metrics.map(m => m.value);
        return {
            min: Math.min(...values),
            max: Math.max(...values),
            avg: values.reduce((a, b) => a + b) / values.length,
            count: values.length
        };
    }
}

// 2. Performance Profiler
class PerformanceProfiler {
    constructor() {
        this.traces = new Map();
    }

    // Inizia il tracciamento di un'operazione
    startTrace(operationName) {
        const traceId = Math.random().toString(36).substr(2, 9);
        this.traces.set(traceId, {
            name: operationName,
            startTime: process.hrtime(),
            events: []
        });
        return traceId;
    }

    // Aggiunge un evento al trace
    addTraceEvent(traceId, eventName) {
        const trace = this.traces.get(traceId);
        if (trace) {
            trace.events.push({
                name: eventName,
                timestamp: process.hrtime(trace.startTime)
            });
        }
    }

    // Completa il trace
    endTrace(traceId) {
        const trace = this.traces.get(traceId);
        if (trace) {
            const duration = process.hrtime(trace.startTime);
            const durationMs = (duration[0] * 1000) + (duration[1] / 1000000);
            
            const result = {
                name: trace.name,
                duration: durationMs,
                events: trace.events.map(event => ({
                    name: event.name,
                    timeFromStart: (event.timestamp[0] * 1000) + (event.timestamp[1] / 1000000)
                }))
            };

            this.traces.delete(traceId);
            return result;
        }
    }
}

// 3. Cache Performance Monitor
class CachePerformanceMonitor {
    constructor() {
        this.hits = 0;
        this.misses = 0;
        this.totalRequests = 0;
    }

    recordHit() {
        this.hits++;
        this.totalRequests++;
    }

    recordMiss() {
        this.misses++;
        this.totalRequests++;
    }

    getStats() {
        return {
            hits: this.hits,
            misses: this.misses,
            total: this.totalRequests,
            hitRate: this.totalRequests ? (this.hits / this.totalRequests) * 100 : 0
        };
    }
}

// 4. Resource Usage Monitor
class ResourceMonitor {
    constructor() {
        this.metrics = {
            cpu: [],
            memory: [],
            disk: []
        };
    }

    // Simula il monitoraggio delle risorse
    monitor() {
        setInterval(() => {
            // CPU Usage (simulato)
            const cpuUsage = Math.random() * 100;
            this.metrics.cpu.push({
                timestamp: Date.now(),
                value: cpuUsage
            });

            // Memory Usage (reale)
            const memUsage = process.memoryUsage();
            this.metrics.memory.push({
                timestamp: Date.now(),
                value: (memUsage.heapUsed / memUsage.heapTotal) * 100
            });

            // Mantieni solo gli ultimi 100 valori
            Object.values(this.metrics).forEach(metric => {
                if (metric.length > 100) metric.shift();
            });
        }, 1000);
    }

    getMetrics() {
        return {
            cpu: this.getAverageMetric('cpu'),
            memory: this.getAverageMetric('memory'),
            disk: this.getAverageMetric('disk')
        };
    }

    getAverageMetric(type) {
        const metrics = this.metrics[type];
        if (!metrics.length) return 0;
        
        const sum = metrics.reduce((acc, curr) => acc + curr.value, 0);
        return sum / metrics.length;
    }
}

// 5. Esempio di Utilizzo
class PerformanceExample {
    constructor() {
        this.monitoring = new MonitoringSystem();
        this.profiler = new PerformanceProfiler();
        this.cacheMonitor = new CachePerformanceMonitor();
        this.resourceMonitor = new ResourceMonitor();

        // Setup soglie
        this.monitoring.setThreshold('response_time', 1000, 2000); // ms
        this.monitoring.setThreshold('error_rate', 5, 10);        // percentage
        this.monitoring.setThreshold('cpu_usage', 70, 90);        // percentage
    }

    async handleRequest() {
        const traceId = this.profiler.startTrace('request_handling');

        try {
            // Simula elaborazione
            this.profiler.addTraceEvent(traceId, 'start_processing');
            await new Promise(resolve => setTimeout(resolve, 100));

            // Simula accesso cache
            this.profiler.addTraceEvent(traceId, 'cache_check');
            if (Math.random() > 0.3) {
                this.cacheMonitor.recordHit();
            } else {
                this.cacheMonitor.recordMiss();
            }

            // Registra metriche
            this.monitoring.recordMetric('response_time', 
                this.profiler.endTrace(traceId).duration);

        } catch (error) {
            this.monitoring.log(error.message, 'ERROR');
            throw error;
        }
    }
}

module.exports = {
    MonitoringSystem,
    PerformanceProfiler,
    CachePerformanceMonitor,
    ResourceMonitor,
    PerformanceExample
};