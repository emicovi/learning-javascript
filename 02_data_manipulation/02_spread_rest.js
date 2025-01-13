/**
 * Lezione: Operatori Spread e Rest in JavaScript
 * 
 * TEORIA SEMPLIFICATA:
 * 
 * 🎯 Spread Operator (...) - "Spargere"
 * Pensa allo spread operator come:
 * 
 * 1. Con gli Array:
 * - Come versare il contenuto di una scatola
 * - Esempio: versare caramelle da una scatola in una più grande
 * [...scatola1, ...scatola2] = unire due scatole di caramelle
 * 
 * 2. Con gli Oggetti:
 * - Come fare una fotocopia e aggiungere modifiche
 * - Esempio: copiare una ricetta e aggiungere nuovi ingredienti
 * { ...ricettaBase, nuovoIngrediente: 'sale' }
 * 
 * 🎨 Casi d'uso dello Spread:
 * 1. Unire array: [...arr1, ...arr2]
 * - Come mescolare due mazzi di carte
 * 
 * 2. Copiare oggetti: { ...oggetto }
 * - Come fare una fotocopia di un documento
 * 
 * 3. Passare elementi a funzioni: Math.max(...numeri)
 * - Come distribuire carte da un mazzo
 * 
 * 🎯 Rest Parameter (...) - "Raccogliere"
 * Pensa al rest parameter come:
 * - Un sacchetto che raccoglie tutto il resto
 * - Come dire "e tutto il resto mettilo qui"
 * 
 * Esempio della vita reale:
 * Quando fai la spesa:
 * - Prendi latte, uova, e... tutto il resto nel carrello
 * 
 * ⚠️ Best Practices:
 * 1. Usa spread per copiare array/oggetti
 * 2. Usa rest per parametri variabili
 * 3. Ricorda: spread "espande", rest "raccoglie"
 */

// Spread operator con array
// Come unire due scatole di costruzioni
export const combineArrays = (arr1, arr2) => {
    return [...arr1, ...arr2];  // Versa il contenuto di entrambe le scatole
};

// Spread operator con oggetti
// Come fare una scheda anagrafica combinando informazioni
export const mergeObjects = (obj1, obj2) => {
    return { ...obj1, ...obj2 };  // Unisce tutte le informazioni
};

// Rest parameter in funzioni
// Come un salvadanaio che raccoglie tutte le monete
export const sumAll = (...numbers) => {
    return numbers.reduce((acc, curr) => acc + curr, 0);
};

// Clonazione profonda di un array
// Come fare una fotocopia esatta
export const cloneArray = (arr) => {
    return [...arr];  // Crea una nuova copia indipendente
};

// Esempio di uso combinato di spread e rest
// Come prendere tutti i biscotti tranne il primo e metterli in un nuovo pacco
export const removeFirstAndCombine = (arr1, ...arrays) => {
    const [, ...restArr1] = arr1;  // Salta il primo elemento
    return [...restArr1, ...arrays.flat()];  // Combina tutto il resto
};

/**
 * Esempi pratici di utilizzo:
 * 
 * 1. Spread con Array:
 * const numeri = [1, 2, 3];
 * const altriNumeri = [4, 5, 6];
 * const tuttiNumeri = [...numeri, ...altriNumeri]; // [1, 2, 3, 4, 5, 6]
 * 
 * 2. Spread con Oggetti:
 * const persona = { nome: 'Mario', età: 30 };
 * const dettagli = { lavoro: 'dev', città: 'Roma' };
 * const schedaCompleta = { ...persona, ...dettagli };
 * 
 * 3. Rest in Funzioni:
 * function log(primo, ...altri) {
 *     console.log('Primo:', primo);
 *     console.log('Altri:', altri);
 * }
 * log('uno', 'due', 'tre'); // Altri: ['due', 'tre']
 */