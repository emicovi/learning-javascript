/**
 * Questo modulo copre la manipolazione di dati JSON in JavaScript
 */

// Validazione JSON
export const isValidJSON = (str) => {
    try {
        JSON.parse(str);
        return true;
    } catch (e) {
        return false;
    }
};

// Parse sicuro con gestione errori
export const safeJSONParse = (str, fallback = null) => {
    try {
        return JSON.parse(str);
    } catch (e) {
        return fallback;
    }
};

// Stringify con gestione dei cicli
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