/**
 * Lezione: Destructuring in JavaScript
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🎯 Cos'è il Destructuring?
 * Pensa al destructuring come:
 * - Aprire un pacco e prendere direttamente ciò che ti serve
 * - Spacchettare un kit e utilizzare solo gli strumenti necessari
 * 
 * 🎨 Array Destructuring:
 * Come aprire una scatola di colori:
 * const [rosso, blu, verde] = colori;
 * 
 * Esempi della vita reale:
 * 1. Come prendere posate da un cassetto:
 *    const [forchetta, coltello] = posate;
 * 
 * 2. Come estrarre i vincitori da una gara:
 *    const [primo, secondo, terzo] = classificati;
 * 
 * 📦 Object Destructuring:
 * Come leggere un modulo con vari campi:
 * const { nome, età, città } = persona;
 * 
 * Esempi della vita reale:
 * 1. Come compilare un form:
 *    const { email, password } = datiUtente;
 * 
 * 2. Come leggere un indirizzo:
 *    const { via, civico, cap } = indirizzo;
 * 
 * 🎯 Casi Speciali:
 * 
 * 1. Valori Default:
 * Come avere un piano B:
 * const { colore = 'bianco' } = preferenze;
 * 
 * 2. Rinominare Variabili:
 * Come dare un soprannome:
 * const { nome: firstName } = persona;
 * 
 * 3. Destructuring Annidato:
 * Come aprire scatole dentro altre scatole:
 * const { indirizzo: { città, cap } } = utente;
 * 
 * ⚠️ Best Practices:
 * 1. Usa il destructuring per rendere il codice più leggibile
 * 2. Fornisci sempre valori default per dati opzionali
 * 3. Usa il destructuring nei parametri delle funzioni
 * 4. Non esagerare con il destructuring annidato
 */

// Array destructuring base
// Come prendere i primi due elementi da una lista
export const getFirstAndSecond = (arr) => {
    const [first, second] = arr;
    return { first, second };
};

// Array destructuring con rest
// Come prendere il primo elemento e raccogliere il resto
export const getFirstAndRest = (arr) => {
    const [first, ...rest] = arr;
    return { first, rest };
};

// Object destructuring base
// Come estrarre informazioni da una carta d'identità
export const getUserInfo = (user) => {
    const { name, age } = user;
    return `${name} ha ${age} anni`;
};

// Object destructuring con valori default
// Come impostare preferenze con valori predefiniti
export const getConfigValues = (config) => {
    const { 
        theme = 'light',      // Se non specificato, usa light
        language = 'it',      // Se non specificato, usa italiano
        notifications = true  // Se non specificato, attiva le notifiche
    } = config;
    return { theme, language, notifications };
};

// Destructuring annidato 
// Come aprire una matrioska e prendere oggetti specifici
export const extractNestedData = (data) => {
    const { 
        user: { name, address: { city } },  // Estrae dati annidati
        settings: { theme }
    } = data;
    return { name, city, theme };
};

// Rinominare variabili durante il destructuring
// Come dare soprannomi a proprietà
export const getCircleProperties = (circle) => {
    const { radius: r, diameter: d } = circle;  // r e d sono i nuovi nomi
    return { radius: r, diameter: d };
};

// Destructuring in parametri di funzione
// Come specificare direttamente cosa ci serve
export const printPersonInfo = ({ name, age, city = 'Sconosciuta' }) => {
    return `${name}, ${age} anni, vive a ${city}`;
};

// Destructuring misto array e oggetti
// Come prendere il primo impiegato da una lista
export const getCompanyFirstEmployee = (company) => {
    const [{ name, role }] = company.employees;
    return { name, role };
};

/**
 * Esempi Pratici:
 * 
 * 1. Scambio di variabili:
 * let a = 1, b = 2;
 * [a, b] = [b, a];  // Ora a = 2 e b = 1
 * 
 * 2. Ignorare elementi:
 * const [, , terzo] = [1, 2, 3];  // terzo = 3
 * 
 * 3. Combinare con spread:
 * const [testa, ...coda] = [1, 2, 3, 4];
 * // testa = 1, coda = [2, 3, 4]
 * 
 * 4. Destructuring multiplo:
 * const { nome, età: age, indirizzo: { città: city } } = persona;
 */