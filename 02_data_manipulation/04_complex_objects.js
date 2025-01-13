/**
 * Lezione: Gestione Avanzata degli Oggetti in JavaScript
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🎯 Operazioni Avanzate sugli Oggetti:
 * 
 * 1. Deep Clone (Clonazione Profonda):
 * Come fare una copia perfetta di un documento complesso:
 * - Shallow Copy = fotocopia solo della prima pagina
 * - Deep Copy = fotocopia di tutte le pagine, inclusi allegati
 * 
 * Esempio pratico:
 * - Come copiare una ricetta con tutti i sotto-ingredienti
 * - Come duplicare un intero albero genealogico
 * 
 * 2. Deep Merge (Fusione Profonda):
 * Come unire due ricette di famiglia:
 * - Prendi il meglio da entrambe
 * - Gestisci sovrapposizioni intelligentemente
 * - Mantieni le strutture complesse
 * 
 * Esempio pratico:
 * - Unire due configurazioni complesse
 * - Combinare dati utente con impostazioni predefinite
 * 
 * 3. Flatten Object (Appiattimento):
 * Come trasformare una struttura 3D in 2D:
 * - Trasforma una scatola con compartimenti in un singolo vassoio
 * - Mantiene tutti gli elementi ma con riferimenti "piatti"
 * 
 * Esempio pratico:
 * - Trasformare un menu con sottomenu in lista piatta
 * - Convertire una gerarchia aziendale in lista di ruoli
 * 
 * 4. Schema Validation (Validazione):
 * Come verificare che un modulo sia compilato correttamente:
 * - Controlla che ci siano tutti i campi richiesti
 * - Verifica che i tipi di dati siano corretti
 * 
 * 5. Object Transformation (Trasformazione):
 * Come tradurre un documento in una lingua diversa:
 * - Mantieni la struttura
 * - Cambia solo il contenuto necessario
 * 
 * ⚠️ Best Practices:
 * 1. Usa deep clone solo quando necessario (è costoso)
 * 2. Preferisci strutture piatte quando possibile
 * 3. Valida sempre i dati in ingresso
 * 4. Documenta la struttura attesa degli oggetti
 */

// Deep clone di un oggetto
// Come fare una copia esatta di un documento complesso
export const deepClone = (obj) => {
    return JSON.parse(JSON.stringify(obj));
};

// Deep merge di due oggetti
// Come unire due ricette mantenendo tutti gli ingredienti e le istruzioni
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
// Come trasformare una struttura ad albero in una lista piatta
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
// Come costruire una struttura gerarchica da un percorso
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
// Come verificare che un modulo sia compilato correttamente
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
// Come applicare un set di trasformazioni a un oggetto
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
// Come selezionare solo ciò che serve da un insieme di dati
export const filterObjectProperties = (obj, predicate) => {
    return Object.entries(obj)
        .filter(([key, value]) => predicate(key, value))
        .reduce((acc, [key, value]) => ({ ...acc, [key]: value }), {});
};

/**
 * Esempi Pratici di Utilizzo:
 * 
 * 1. Deep Clone:
 * const utente = {
 *     nome: 'Mario',
 *     preferenze: { tema: 'scuro' }
 * };
 * const copia = deepClone(utente);
 * 
 * 2. Deep Merge:
 * const base = { tema: 'chiaro', lingua: 'it' };
 * const personalizzato = { tema: 'scuro' };
 * const config = deepMerge(base, personalizzato);
 * 
 * 3. Flatten:
 * const dati = {
 *     utente: {
 *         nome: 'Mario',
 *         indirizzo: { città: 'Roma' }
 *     }
 * };
 * // Diventa: { 'utente.nome': 'Mario', 'utente.indirizzo.città': 'Roma' }
 */