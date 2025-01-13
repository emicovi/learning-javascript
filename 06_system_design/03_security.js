/**
 * Lezione: Sicurezza nei Sistemi Distribuiti
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🎯 Sicurezza nel Web:
 * Come proteggere un edificio:
 * - Autenticazione: Chi sei? (Badge di ingresso)
 * - Autorizzazione: Cosa puoi fare? (Livelli di accesso)
 * - Crittografia: Messaggi segreti (Cassaforte)
 * 
 * 🔑 OAuth 2.0:
 * Come un concierge in hotel:
 * - Client: Il visitatore
 * - Resource Owner: Il proprietario della stanza
 * - Authorization Server: Il concierge
 * - Resource Server: La stanza
 * 
 * 🎟️ JWT (JSON Web Token):
 * Come un braccialetto di un resort:
 * - Header: Tipo di braccialetto
 * - Payload: Informazioni del cliente
 * - Signature: Timbro di autenticità
 * 
 * 🔒 Crittografia:
 * - Simmetrica: Stessa chiave per aprire e chiudere
 * - Asimmetrica: Chiave pubblica e privata
 * - Hashing: Impronta digitale dei dati
 */

// 1. Sistema di Autenticazione
class AuthenticationService {
    constructor() {
        this.users = new Map();
        this.tokens = new Map();
        this.secretKey = 'your-secret-key'; // In produzione, usa variabili d'ambiente
    }

    // Registrazione utente
    async register(username, password) {
        if (this.users.has(username)) {
            throw new Error('Username already exists');
        }

        const salt = crypto.randomBytes(16).toString('hex');
        const hashedPassword = await this.hashPassword(password, salt);

        this.users.set(username, {
            username,
            password: hashedPassword,
            salt,
            roles: ['user']
        });

        return { username };
    }

    // Login
    async login(username, password) {
        const user = this.users.get(username);
        if (!user) {
            throw new Error('User not found');
        }

        const hashedPassword = await this.hashPassword(password, user.salt);
        if (hashedPassword !== user.password) {
            throw new Error('Invalid password');
        }

        return this.generateJWT(user);
    }

    // Generazione JWT
    generateJWT(user) {
        const header = {
            alg: 'HS256',
            typ: 'JWT'
        };

        const payload = {
            sub: user.username,
            roles: user.roles,
            iat: Date.now(),
            exp: Date.now() + (24 * 60 * 60 * 1000) // 24 ore
        };

        const headerBase64 = Buffer.from(JSON.stringify(header)).toString('base64');
        const payloadBase64 = Buffer.from(JSON.stringify(payload)).toString('base64');
        
        const signature = crypto
            .createHmac('sha256', this.secretKey)
            .update(`${headerBase64}.${payloadBase64}`)
            .digest('base64');

        return `${headerBase64}.${payloadBase64}.${signature}`;
    }

    // Verifica JWT
    verifyJWT(token) {
        try {
            const [headerBase64, payloadBase64, signature] = token.split('.');
            
            const expectedSignature = crypto
                .createHmac('sha256', this.secretKey)
                .update(`${headerBase64}.${payloadBase64}`)
                .digest('base64');

            if (signature !== expectedSignature) {
                throw new Error('Invalid token signature');
            }

            const payload = JSON.parse(Buffer.from(payloadBase64, 'base64').toString());
            
            if (payload.exp < Date.now()) {
                throw new Error('Token expired');
            }

            return payload;
        } catch (error) {
            throw new Error('Token validation failed');
        }
    }

    // Utility per l'hashing delle password
    async hashPassword(password, salt) {
        return new Promise((resolve, reject) => {
            crypto.pbkdf2(
                password,
                salt,
                100000, // iterations
                64,     // key length
                'sha512',
                (err, derivedKey) => {
                    if (err) reject(err);
                    resolve(derivedKey.toString('hex'));
                }
            );
        });
    }
}

// 2. Sistema di Autorizzazione
class AuthorizationService {
    constructor() {
        this.permissions = new Map();
    }

    // Definizione permessi per ruolo
    definePermissions(role, permissions) {
        this.permissions.set(role, new Set(permissions));
    }

    // Verifica permesso
    hasPermission(user, permission) {
        if (!user.roles) return false;

        return user.roles.some(role => {
            const rolePermissions = this.permissions.get(role);
            return rolePermissions && rolePermissions.has(permission);
        });
    }

    // Middleware per verifica permessi
    checkPermission(permission) {
        return (req, res, next) => {
            if (!this.hasPermission(req.user, permission)) {
                throw new Error('Unauthorized');
            }
            next();
        };
    }
}

// 3. OAuth 2.0 Provider
class OAuthProvider {
    constructor() {
        this.clients = new Map();
        this.authorizationCodes = new Map();
        this.accessTokens = new Map();
    }

    // Registrazione client
    registerClient(clientId, clientSecret, redirectUri) {
        this.clients.set(clientId, {
            clientSecret,
            redirectUri
        });
    }

    // Generazione codice di autorizzazione
    generateAuthorizationCode(clientId, scope, userId) {
        const code = crypto.randomBytes(32).toString('hex');
        
        this.authorizationCodes.set(code, {
            clientId,
            scope,
            userId,
            expiresAt: Date.now() + (10 * 60 * 1000) // 10 minuti
        });

        return code;
    }

    // Scambio codice per access token
    exchangeCodeForToken(code, clientId, clientSecret) {
        const authCode = this.authorizationCodes.get(code);
        if (!authCode || authCode.expiresAt < Date.now()) {
            throw new Error('Invalid or expired code');
        }

        const client = this.clients.get(clientId);
        if (!client || client.clientSecret !== clientSecret) {
            throw new Error('Invalid client');
        }

        // Genera access token
        const accessToken = crypto.randomBytes(32).toString('hex');
        this.accessTokens.set(accessToken, {
            clientId,
            userId: authCode.userId,
            scope: authCode.scope,
            expiresAt: Date.now() + (60 * 60 * 1000) // 1 ora
        });

        // Rimuovi il codice usato
        this.authorizationCodes.delete(code);

        return {
            access_token: accessToken,
            token_type: 'Bearer',
            expires_in: 3600
        };
    }
}

// 4. Esempio di Utilizzo
class SecurityExample {
    constructor() {
        this.auth = new AuthenticationService();
        this.authz = new AuthorizationService();
        this.oauth = new OAuthProvider();

        // Setup permessi
        this.authz.definePermissions('admin', ['read', 'write', 'delete']);
        this.authz.definePermissions('user', ['read']);

        // Setup OAuth client
        this.oauth.registerClient(
            'example-client',
            'secret',
            'https://example.com/callback'
        );
    }

    async secureEndpoint(req) {
        try {
            // Verifica token
            const token = req.headers.authorization?.split(' ')[1];
            const user = this.auth.verifyJWT(token);

            // Verifica permessi
            if (!this.authz.hasPermission(user, 'read')) {
                throw new Error('Insufficient permissions');
            }

            return { success: true, data: 'Protected data' };
        } catch (error) {
            throw new Error('Authentication failed');
        }
    }
}

module.exports = {
    AuthenticationService,
    AuthorizationService,
    OAuthProvider,
    SecurityExample
};