/**
 * Questo modulo copre la gestione avanzata degli oggetti in JavaScript
 */

// Deep clone di un oggetto
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

// Deep merge di due oggetti
export const deepMerge = (target, source) => {
    const output = { ...target };
    
    for (const key in source) {
        if (source[key] instanceof Object && key in target) {
            output[key] = deepMerge(target[key], source[key]);
        } else {
            output[key] = source[key];
        }
    }
    
    return output;
};

// Flatten di un oggetto nidificato
export const flattenObject = (obj, prefix = '') => {
    return Object.keys(obj).reduce((acc, key) => {
        const pre = prefix.length ? `${prefix}.` : '';
        
        if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
            Object.assign(acc, flattenObject(obj[key], pre + key));
        } else {
            acc[pre + key] = obj[key];
        }
        
        return acc;
    }, {});
};

// Creare un oggetto path-based
export const createNestedObject = (path, value) => {
    const parts = path.split('.');
    const result = {};
    let current = result;
    
    for (let i = 0; i < parts.length - 1; i++) {
        current[parts[i]] = {};
        current = current[parts[i]];
    }
    
    current[parts[parts.length - 1]] = value;
    return result;
};

// Validate object schema
export const validateSchema = (obj, schema) => {
    for (const key in schema) {
        // Verifica esistenza della proprietà
        if (!(key in obj)) {
            return { valid: false, error: `Proprietà mancante: ${key}` };
        }
        
        // Verifica tipo
        if (typeof obj[key] !== schema[key]) {
            return { 
                valid: false, 
                error: `Tipo non valido per ${key}: atteso ${schema[key]}, ricevuto ${typeof obj[key]}` 
            };
        }
    }
    
    return { valid: true };
};

// Object transformation
export const transformObject = (obj, transformations) => {
    const result = {};
    
    for (const key in transformations) {
        if (key in obj) {
            const transformer = transformations[key];
            result[key] = transformer(obj[key]);
        }
    }
    
    return result;
};

// Filtrare proprietà di un oggetto
export const filterObjectProperties = (obj, predicate) => {
    return Object.entries(obj)
        .filter(([key, value]) => predicate(key, value))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};