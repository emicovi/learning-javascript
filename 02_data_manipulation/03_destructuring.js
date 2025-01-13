/**
 * Questo modulo copre le tecniche di destructuring in JavaScript
 */

// Array destructuring base
export const getFirstAndSecond = (arr) => {
    const [first, second] = arr;
    return { first, second };
};

// Array destructuring con rest
export const getFirstAndRest = (arr) => {
    const [first, ...rest] = arr;
    return { first, rest };
};

// Object destructuring base
export const getUserInfo = (user) => {
    const { name, age } = user;
    return `${name} ha ${age} anni`;
};

// Object destructuring con valori default
export const getConfigValues = (config) => {
    const { 
        theme = 'light', 
        language = 'it',
        notifications = true 
    } = config;
    return { theme, language, notifications };
};

// Destructuring annidato
export const extractNestedData = (data) => {
    const { 
        user: { name, address: { city } },
        settings: { theme }
    } = data;
    return { name, city, theme };
};

// Rinominare variabili durante il destructuring
export const getCircleProperties = (circle) => {
    const { radius: r, diameter: d } = circle;
    return { radius: r, diameter: d };
};

// Destructuring in parametri di funzione
export const printPersonInfo = ({ name, age, city = 'Sconosciuta' }) => {
    return `${name}, ${age} anni, vive a ${city}`;
};

// Destructuring misto array e oggetti
export const getCompanyFirstEmployee = (company) => {
    const [{ name, role }] = company.employees;
    return { name, role };
};