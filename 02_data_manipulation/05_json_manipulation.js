/**
 * Lezione: Manipolazione JSON in JavaScript
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🎯 Cos'è il JSON?
 * JSON è come un formato universale per scambiarsi messaggi:
 * - Come scrivere una lettera in un linguaggio che tutti capiscono
 * - Come usare un formato standard per compilare un modulo
 * 
 * 📝 Concetti Base:
 * 
 * 1. Validazione JSON
 * Come controllare che una lettera sia scritta correttamente:
 * - Verifica che la sintassi sia corretta
 * - Controlla che il formato sia valido
 * 
 * 2. Parsing Sicuro
 * Come leggere una lettera con cautela:
 * - Prima controlla che sia leggibile
 * - Se non lo è, hai un piano B (fallback)
 * 
 * 3. Stringify con Gestione Cicli
 * Come fare una fotocopia evitando loop infiniti:
 * - Identifica riferimenti circolari
 * - Evita di copiare le stesse cose all'infinito
 * 
 * 4. Trasformazione
 * Come tradurre un documento:
 * - Mantieni la struttura
 * - Cambia solo il contenuto necessario
 * 
 * 5. Sanitizzazione
 * Come censurare informazioni sensibili:
 * - Nascondi password e dati privati
 * - Mantieni visibili le informazioni pubbliche
 * 
 * 6. Confronto (Diff)
 * Come confrontare due versioni di un documento:
 * - Trova cosa è stato aggiunto
 * - Trova cosa è stato rimosso
 * - Trova cosa è stato modificato
 * 
 * 7. Compressione
 * Come fare un riassunto efficace:
 * - Rimuovi le parti non necessarie
 * - Mantieni solo l'essenziale
 * 
 * ⚠️ Best Practices:
 * 1. Sempre validare JSON in ingresso
 * 2. Usare try-catch per gestire errori
 * 3. Sanitizzare dati sensibili
 * 4. Fare backup prima di modifiche
 */

// Validazione JSON
// Come verificare che un messaggio sia scritto nel formato corretto
export const isValidJSON = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};

// Parse sicuro con gestione errori
// Come leggere un messaggio con un piano B se è illeggibile
export const safeJSONParse = (str, fallback = null) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return fallback;
    }
};

// Stringify con gestione dei cicli
// Come fare una copia evitando loop infiniti
export const safeJSONStringify = (obj, spacing = 2) => {
    const seen = new WeakSet();
    return JSON.stringify(obj, (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return '[Circular Reference]';
            }
            seen.add(value);
        }
        return value;
    }, spacing);
};

// Trasformazione JSON con schema
// Come tradurre un documento seguendo regole precise
export const transformJSON = (json, schema) => {
    const parsed = typeof json === 'string' ? JSON.parse(json) : json;
    
    return Object.keys(schema).reduce((acc, key) => {
        if (key in parsed) {
            acc[key] = schema[key](parsed[key]);
        }
        return acc;
    }, {});
};

// Filtraggio proprietà sensibili
// Come censurare informazioni riservate in un documento
export const sanitizeJSON = (json, sensitiveKeys = ['password', 'token', 'secret']) => {
    const parsed = typeof json === 'string' ? JSON.parse(json) : json;
    
    const sanitize = (obj) => {
        if (Array.isArray(obj)) {
            return obj.map(item => sanitize(item));
        }
        
        if (obj && typeof obj === 'object') {
            return Object.keys(obj).reduce((acc, key) => {
                const value = obj[key];
                if (sensitiveKeys.includes(key.toLowerCase())) {
                    acc[key] = '***';
                } else if (typeof value === 'object' && value !== null) {
                    acc[key] = sanitize(value);
                } else {
                    acc[key] = value;
                }
                return acc;
            }, {});
        }
        
        return obj;
    };
    
    return sanitize(parsed);
};

// Diff tra due JSON
// Come confrontare due versioni di un documento e trovare le differenze
export const jsonDiff = (json1, json2) => {
    const obj1 = typeof json1 === 'string' ? JSON.parse(json1) : json1;
    const obj2 = typeof json2 === 'string' ? JSON.parse(json2) : json2;
    
    const compare = (a, b, path = '') => {
        const differences = [];
        
        if (Array.isArray(a) && Array.isArray(b)) {
            if (a.length !== b.length) {
                differences.push(`${path}: Lunghezza array diversa`);
            }
            a.forEach((item, i) => {
                if (i < b.length) {
                    differences.push(...compare(item, b[i], `${path}[${i}]`));
                }
            });
        } else if (typeof a === 'object' && typeof b === 'object' && a !== null && b !== null) {
            const keys = new Set([...Object.keys(a), ...Object.keys(b)]);
            keys.forEach(key => {
                const newPath = path ? `${path}.${key}` : key;
                if (!(key in a)) {
                    differences.push(`${newPath}: Proprietà aggiunta in B`);
                } else if (!(key in b)) {
                    differences.push(`${newPath}: Proprietà rimossa in B`);
                } else {
                    differences.push(...compare(a[key], b[key], newPath));
                }
            });
        } else if (a !== b) {
            differences.push(`${path}: Valore cambiato da ${JSON.stringify(a)} a ${JSON.stringify(b)}`);
        }
        
        return differences;
    };
    
    return compare(obj1, obj2);
};

// Compressione JSON
// Come fare un riassunto efficace mantenendo solo l'essenziale
export const compressJSON = (json) => {
    const obj = typeof json === 'string' ? JSON.parse(json) : json;
    
    const compress = (data) => {
        if (Array.isArray(data)) {
            if (data.length === 0) return null;
            return data.map(item => compress(item)).filter(item => item !== null);
        }
        
        if (typeof data === 'object' && data !== null) {
            const compressed = Object.keys(data).reduce((acc, key) => {
                const value = data[key];
                const compressedValue = compress(value);
                if (compressedValue !== null && compressedValue !== undefined && compressedValue !== '') {
                    acc[key] = compressedValue;
                }
                return acc;
            }, {});
            return Object.keys(compressed).length > 0 ? compressed : null;
        }
        
        return data;
    };
    
    return compress(obj);
};

/**
 * Esempi Pratici:
 * 
 * 1. Validazione:
 * const valido = isValidJSON('{"nome": "Mario"}'); // true
 * const nonValido = isValidJSON('{nome: Mario}');  // false
 * 
 * 2. Sanitizzazione:
 * const dati = {
 *     utente: 'mario',
 *     password: '12345',
 *     email: 'mario@example.com'
 * };
 * const pulito = sanitizeJSON(dati);
 * // Result: { utente: 'mario', password: '***', email: 'mario@example.com' }
 * 
 * 3. Compressione:
 * const dati = {
 *     nome: 'Mario',
 *     età: 30,
 *     note: '',
 *     indirizzo: null
 * };
 * const compresso = compressJSON(dati);
 * // Result: { nome: 'Mario', età: 30 }
 */