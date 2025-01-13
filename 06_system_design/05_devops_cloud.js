/**
 * Lezione: DevOps e Cloud Services
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🎯 DevOps:
 * Come gestire un ristorante moderno:
 * - CI/CD: Automazione della cucina
 * - Docker: Ingredienti preconfezionati
 * - Kubernetes: Gestione di multiple cucine
 * 
 * ☁️ Cloud Services:
 * Come affittare attrezzature invece di comprarle:
 * - IaaS: Affitti la cucina
 * - PaaS: Affitti cucina + attrezzature
 * - SaaS: Ordini piatti pronti
 * 
 * 🔄 CI/CD Pipeline:
 * Come una catena di montaggio:
 * - Build: Prepara gli ingredienti
 * - Test: Controlla qualità
 * - Deploy: Servi al cliente
 * 
 * 📦 Containerization:
 * Come lunch box preconfezionati:
 * - Isolamento: Ogni piatto nel suo contenitore
 * - Portabilità: Funziona ovunque
 * - Scalabilità: Facile da replicare
 */

// 1. CI/CD Pipeline Manager
class CIPipeline {
    constructor() {
        this.stages = [];
        this.currentBuild = null;
        this.buildHistory = [];
    }

    // Aggiungi stage alla pipeline
    addStage(name, handler) {
        this.stages.push({
            name,
            handler
        });
    }

    // Esegui la pipeline
    async run(code) {
        this.currentBuild = {
            id: Date.now(),
            stages: [],
            startTime: new Date(),
            status: 'running'
        };

        try {
            for (const stage of this.stages) {
                const stageResult = {
                    name: stage.name,
                    startTime: new Date(),
                    status: 'running'
                };

                this.currentBuild.stages.push(stageResult);

                try {
                    await stage.handler(code);
                    stageResult.status = 'success';
                } catch (error) {
                    stageResult.status = 'failed';
                    stageResult.error = error.message;
                    throw error;
                } finally {
                    stageResult.endTime = new Date();
                }
            }

            this.currentBuild.status = 'success';
        } catch (error) {
            this.currentBuild.status = 'failed';
            this.currentBuild.error = error.message;
        } finally {
            this.currentBuild.endTime = new Date();
            this.buildHistory.push(this.currentBuild);
        }

        return this.currentBuild;
    }
}

// 2. Container Manager (Docker-like)
class Container {
    constructor(config) {
        this.id = Math.random().toString(36).substr(2, 9);
        this.image = config.image;
        this.env = config.env || {};
        this.ports = config.ports || {};
        this.status = 'created';
        this.logs = [];
    }

    async start() {
        this.status = 'running';
        this.startTime = Date.now();
        this.log('Container started');
    }

    async stop() {
        this.status = 'stopped';
        this.stopTime = Date.now();
        this.log('Container stopped');
    }

    log(message) {
        this.logs.push({
            timestamp: Date.now(),
            message
        });
    }

    getState() {
        return {
            id: this.id,
            image: this.image,
            status: this.status,
            uptime: this.startTime ? Date.now() - this.startTime : 0
        };
    }
}

// 3. Orchestration Manager (Kubernetes-like)
class ClusterManager {
    constructor() {
        this.nodes = new Map();
        this.services = new Map();
        this.deployments = new Map();
    }

    // Registra un nuovo nodo
    addNode(nodeName, capacity) {
        this.nodes.set(nodeName, {
            name: nodeName,
            capacity,
            containers: new Map(),
            status: 'ready'
        });
    }

    // Crea un deployment
    createDeployment(name, config) {
        const deployment = {
            name,
            replicas: config.replicas || 1,
            template: config.template,
            containers: new Map()
        };

        this.deployments.set(name, deployment);
        return this.scaleDeployment(name, deployment.replicas);
    }

    // Scala un deployment
    async scaleDeployment(name, replicas) {
        const deployment = this.deployments.get(name);
        if (!deployment) throw new Error('Deployment not found');

        const currentReplicas = deployment.containers.size;
        
        if (replicas > currentReplicas) {
            // Scale up
            for (let i = currentReplicas; i < replicas; i++) {
                const container = new Container(deployment.template);
                deployment.containers.set(container.id, container);
                await this.scheduleContainer(container);
            }
        } else if (replicas < currentReplicas) {
            // Scale down
            const containersToRemove = Array.from(deployment.containers.values())
                .slice(replicas - currentReplicas);
            
            for (const container of containersToRemove) {
                await container.stop();
                deployment.containers.delete(container.id);
            }
        }

        return Array.from(deployment.containers.values());
    }

    // Trova il nodo migliore per un container
    scheduleContainer(container) {
        const availableNodes = Array.from(this.nodes.values())
            .filter(node => node.status === 'ready');

        if (availableNodes.length === 0) {
            throw new Error('No nodes available');
        }

        // Simple scheduling: choose the node with least containers
        const selectedNode = availableNodes.reduce((a, b) => 
            a.containers.size < b.containers.size ? a : b
        );

        selectedNode.containers.set(container.id, container);
        return container.start();
    }
}

// 4. Cloud Service Simulator
class CloudProvider {
    constructor() {
        this.resources = new Map();
        this.billing = new Map();
    }

    // Provisioning di risorse
    async provisionResource(type, config) {
        const resource = {
            id: Math.random().toString(36).substr(2, 9),
            type,
            config,
            status: 'provisioning',
            startTime: Date.now()
        };

        this.resources.set(resource.id, resource);
        this.startBilling(resource.id);

        // Simula il tempo di provisioning
        await new Promise(resolve => setTimeout(resolve, 1000));
        resource.status = 'running';

        return resource;
    }

    // Gestione fatturazione
    startBilling(resourceId) {
        const resource = this.resources.get(resourceId);
        if (!resource) return;

        this.billing.set(resourceId, {
            startTime: Date.now(),
            rate: this.getResourceRate(resource.type)
        });
    }

    getResourceRate(type) {
        const rates = {
            'vm': 0.1,      // $0.10 per hour
            'database': 0.2, // $0.20 per hour
            'storage': 0.05  // $0.05 per hour
        };
        return rates[type] || 0.1;
    }

    getBilling(resourceId) {
        const billing = this.billing.get(resourceId);
        if (!billing) return 0;

        const hours = (Date.now() - billing.startTime) / (1000 * 60 * 60);
        return hours * billing.rate;
    }
}

// 5. Esempio di Utilizzo
class DevOpsExample {
    constructor() {
        this.pipeline = new CIPipeline();
        this.cluster = new ClusterManager();
        this.cloud = new CloudProvider();

        // Setup pipeline
        this.setupPipeline();
    }

    setupPipeline() {
        // Stage: Build
        this.pipeline.addStage('build', async (code) => {
            console.log('Building application...');
            // Simula build
            await new Promise(resolve => setTimeout(resolve, 1000));
        });

        // Stage: Test
        this.pipeline.addStage('test', async (code) => {
            console.log('Running tests...');
            // Simula tests
            await new Promise(resolve => setTimeout(resolve, 500));
        });

        // Stage: Deploy
        this.pipeline.addStage('deploy', async (code) => {
            console.log('Deploying application...');
            
            // Crea deployment su Kubernetes
            await this.cluster.createDeployment('app', {
                replicas: 3,
                template: {
                    image: 'app:latest',
                    env: { NODE_ENV: 'production' }
                }
            });
        });
    }

    async deployToCloud() {
        // Provision infrastructure
        const vm = await this.cloud.provisionResource('vm', {
            size: 'medium',
            region: 'eu-west'
        });

        const db = await this.cloud.provisionResource('database', {
            type: 'mysql',
            size: 'small'
        });

        // Run pipeline
        return await this.pipeline.run('production');
    }
}

module.exports = {
    CIPipeline,
    Container,
    ClusterManager,
    CloudProvider,
    DevOpsExample
};