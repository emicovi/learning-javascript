/**
 * Lezione 6: Oggetti in JavaScript
 * 
 * In questa lezione imparerai:
 * 1. Cosa sono gli oggetti e come crearli
 * 2. Come aggiungere metodi e proprietà
 * 3. Come usare i metodi built-in degli oggetti
 * 4. Come usare getter e setter
 * 5. Come funziona l'ereditarietà con i prototipi
 * 6. Come destrutturare gli oggetti
 * 
 * CONCETTI CHIAVE:
 * - Gli oggetti sono come contenitori che raggruppano dati e funzionalità correlate
 * - Pensa a un oggetto come a una scheda anagrafica: ha proprietà (nome, età) e azioni (saluta, cammina)
 * - Le proprietà sono come etichette che descrivono l'oggetto
 * - I metodi sono come azioni che l'oggetto può compiere
 */

// 1. Creazione di oggetti base
// Come una scheda persona
const persona = {
    nome: 'Mario',         // Proprietà semplice
    età: 30,              // Altra proprietà
    professione: 'sviluppatore'
};

// Aggiungere e modificare proprietà
// Come aggiornare una scheda
function modificaOggetto(oggetto) {
    oggetto.nuovaProprietà = 'valore';          // Aggiunge una nuova proprietà
    delete oggetto.proprietàDaRimuovere;        // Rimuove una proprietà
    return oggetto;
}

// 2. Oggetto con metodi
// Come una calcolatrice che mantiene il risultato
const calcolatrice = {
    valore: 0,
    // Metodi che possono essere concatenati
    aggiungi(n) {
        this.valore += n;
        return this;  // Permette la concatenazione
    },
    sottrai(n) {
        this.valore -= n;
        return this;
    },
    moltiplica(n) {
        this.valore *= n;
        return this;
    },
    // Esempio d'uso: calcolatrice.aggiungi(5).sottrai(2).moltiplica(3)
    getValore() {
        return this.valore;
    }
};

// 3. Object methods (metodi built-in)
// Strumenti per esplorare gli oggetti
function analizzaOggetto(oggetto) {
    return {
        chiavi: Object.keys(oggetto),         // Lista delle proprietà
        valori: Object.values(oggetto),       // Lista dei valori
        entries: Object.entries(oggetto),     // Lista di [chiave, valore]
        hasNome: Object.hasOwn(oggetto, 'nome') // Verifica se ha una proprietà
    };
}

// 4. Getter e Setter
// Come un conto bancario che tiene traccia delle modifiche
const contoBancario = {
    _saldo: 0,         // _ indica che è "privato"
    _movimenti: [],    // Storia delle transazioni
    
    // Getter: legge il saldo
    get saldo() {
        return this._saldo;
    },
    
    // Setter: modifica il saldo e registra il movimento
    set saldo(nuovoSaldo) {
        this._movimenti.push({
            data: new Date(),
            vecchioSaldo: this._saldo,
            nuovoSaldo: nuovoSaldo
        });
        this._saldo = nuovoSaldo;
    }
};

// 5. Prototipi e ereditarietà
// Come un progetto base che può essere esteso
// Veicolo è il "progetto base"
function Veicolo(marca, modello) {
    this.marca = marca;
    this.modello = modello;
}

// Aggiungiamo funzionalità al progetto base
Veicolo.prototype.descrizione = function() {
    return `${this.marca} ${this.modello}`;
};

// Auto è una versione specializzata di Veicolo
function Auto(marca, modello, porte) {
    // Chiama il costruttore del "progetto base"
    Veicolo.call(this, marca, modello);
    this.porte = porte;
}

// Collega Auto a Veicolo (eredita le funzionalità)
Auto.prototype = Object.create(Veicolo.prototype);
Auto.prototype.constructor = Auto;

// 6. Destructuring
// Come estrarre ingredienti da una ricetta
function estraiDatiPersona(persona) {
    // Estrae proprietà specifiche e fornisce valori di default
    const { nome, età, professione = 'disoccupato' } = persona;
    return `${nome} ha ${età} anni ed è ${professione}`;
}

// 7. Shallow vs Deep copy
// Come fare copie di un documento
function esempiCopy() {
    const originale = {
        nome: 'Mario',
        indirizzo: {
            via: 'Roma',
            città: 'Milano'
        }
    };

    // Shallow copy (copia superficiale)
    // Come una fotocopia: copia solo il primo livello
    const shallowCopy = { ...originale };
    
    // Deep copy (copia profonda)
    // Come riscrivere tutto il documento da zero
    const deepCopy = JSON.parse(JSON.stringify(originale));
    
    // Modifica per dimostrare la differenza
    shallowCopy.indirizzo.città = 'Roma';    // Modifica anche l'originale
    deepCopy.indirizzo.città = 'Napoli';     // Non modifica l'originale
    
    return {
        originale,
        shallowCopy,
        deepCopy
    };
}

// Esempio pratico: Sistema di gestione studenti
// Come un registro elettronico
class GestioneStudenti {
    constructor() {
        this.studenti = new Map();  // Usa Map per gestire gli studenti
    }

    // Aggiunge un nuovo studente
    aggiungiStudente(id, nome, corsi = []) {
        this.studenti.set(id, {
            nome,
            corsi,
            voti: {}  // Oggetto per tenere traccia dei voti per corso
        });
    }

    // Aggiunge un voto a uno studente
    aggiungiVoto(id, corso, voto) {
        const studente = this.studenti.get(id);
        if (!studente) throw new Error('Studente non trovato');
        
        // Inizializza l'array dei voti se non esiste
        if (!studente.voti[corso]) {
            studente.voti[corso] = [];
        }
        studente.voti[corso].push(voto);
    }

    // Calcola la media dei voti di uno studente
    calcolaMedia(id) {
        const studente = this.studenti.get(id);
        if (!studente) throw new Error('Studente non trovato');

        // Prende tutti i voti da tutti i corsi
        const voti = Object.values(studente.voti).flat();
        if (voti.length === 0) return 0;
        
        // Calcola la media
        return voti.reduce((acc, val) => acc + val, 0) / voti.length;
    }
}

module.exports = {
    persona,
    modificaOggetto,
    calcolatrice,
    analizzaOggetto,
    contoBancario,
    Veicolo,
    Auto,
    estraiDatiPersona,
    esempiCopy,
    GestioneStudenti
};
