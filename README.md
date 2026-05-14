# 📌 PROGETTO – QUINTA

## 👤 Cognome Nome
**Kurtulaj Stiven**

---

## 📘 Titolo
**Responsabile delle finanze personali**

---

## 💬 Tagline
> "Tieni sotto controllo le tue finanze, un clic alla volta"

---

## 📖 Descrizione completa
Expense Manager – Silver Palm Tree è un’applicazione web per la gestione delle finanze personali e aziendali sviluppata con architettura **multi-tenant**.

Il sistema permette agli utenti di registrare e gestire entrate, uscite, budget e promemoria di pagamento, mantenendo una separazione completa dei dati tra diversi gruppi di utenti (tenant).

Ogni utente appartiene a un tenant (azienda o spazio di lavoro) e può accedere esclusivamente alle informazioni relative al proprio ambiente.

---

L’applicazione è strutturata su un backend Node.js con API REST e un database MySQL relazionale, mentre il frontend è sviluppato in React per garantire una gestione dinamica e interattiva dei dati.

---

Il sistema gestisce le seguenti aree principali:

- **Gestione utenti e tenant:** creazione utenti associati a un tenant e isolamento dei dati tra organizzazioni.
- **Gestione transazioni:** registrazione, modifica ed eliminazione di entrate e uscite con classificazione per categoria.
- **Gestione budget:** impostazione di limiti di spesa mensili per categoria e monitoraggio delle spese rispetto al budget.
- **Gestione promemoria:** creazione e gestione di scadenze di pagamento con stato di pagamento aggiornabile.
- **Analisi dati:** calcolo dinamico di saldo, riepiloghi mensili e analisi delle spese basate sulle transazioni registrate.

---

Tutti i dati sono memorizzati in un database MySQL composto dalle seguenti entità principali:
- tenants
- users
- transactions
- budgets
- reminders

---

Il sistema è progettato per garantire:
- separazione sicura dei dati tra tenant
- gestione centralizzata delle finanze
- scalabilità dell’architettura backend
- interrogazione efficiente dei dati tramite query SQL

---

## 🎯 Target
Persone che vogliono monitorare e gestire facilmente le proprie spese e entrate personali.

---

## 🏆 Concorrenti
- Menta  
- YNAB (Hai bisogno di un budget)  
- Spendee  

---

## 🛠️ Tecnologia
- **React** (frontend)
- **Node.js + Express** (backend)
- **MySQL** (database)
- **Multi-tenant** (architettura)

---

# 📑 REQUISITI FUNZIONALITÀ APPLICAZIONE

# 🔐 1. Autenticazione e gestione utenti

## ✔ Registrazione
Gli utenti possono creare un account associato a un tenant inserendo email e password.

## ✔ Login
Accesso sicuro tramite credenziali personali.

## ✔ Logout
Possibilità di terminare la sessione in qualsiasi momento.

## ✔ Isolamento dati
Ogni utente visualizza solo i dati del proprio tenant.

---

# 💸 2. Gestione transazioni

## ✔ Inserimento transazione
Possibilità di registrare:

- Tipo (entrata / uscita)
- Importo
- Categoria
- Descrizione
- Data

## ✔ Modifica transazione
Aggiornamento dei dati di una transazione esistente.

## ✔ Eliminazione transazione
Rimozione di una transazione dallo storico.

## ✔ Storico transazioni
Visualizzazione completa delle operazioni finanziarie.

## ✔ Calcolo saldo
Il sistema aggiorna automaticamente il saldo in base alle transazioni.

---

# 📊 3. Budget mensile

## ✔ Creazione budget
Impostazione di un limite di spesa per categoria.

## ✔ Monitoraggio budget
Visualizzazione dello stato di utilizzo del budget.

## ✔ Aggiornamento budget
Possibilità di modificare i limiti mensili.

## ✔ Controllo superamento
Evidenza del superamento del budget definito.

---

# ⏰ 4. Promemoria pagamenti

## ✔ Creazione promemoria
Inserimento di pagamenti futuri con data di scadenza.

## ✔ Stato pagamento
Gestione dello stato (pagato / non pagato).

## ✔ Modifica ed eliminazione
Aggiornamento o rimozione dei promemoria.

## ✔ Visualizzazione elenco
Consultazione dei pagamenti programmati.

---

# 📈 5. Dashboard e riepilogo

## ✔ Dashboard principale
Panoramica generale con:

- Saldo attuale
- Entrate mensili
- Uscite mensili

## ✔ Riepilogo mensile
Analisi delle finanze per mese.

## ✔ Distribuzione categorie
Visualizzazione delle spese per categoria.

---

# 📉 6. Analisi dati

## ✔ Storico finanziario
Analisi delle transazioni nel tempo.

## ✔ Confronto periodi
Confronto tra mesi diversi.

## ✔ Analisi categorie
Individuazione delle categorie con maggiore spesa.

---

# 🏢 7. Multi-Tenant System

## ✔ Gestione tenant
Ogni utente appartiene a un tenant (azienda/gruppo).

## ✔ Separazione dati
I dati sono completamente isolati tra i tenant.

---

# 🌐 8. Interfaccia utente

## ✔ Accesso web
Utilizzo dell’app direttamente dal browser.

## ✔ Navigazione semplice
Sezioni principali:

- Dashboard
- Transazioni
- Budget
- Promemoria
- Storico

## ✔ Design responsivo
Ottimizzato per desktop e dispositivi mobili.

---

# Funzionalità che leggono/modificano i database

# 📦 Database

Il database MySQL include le seguenti tabelle:

- tenants
- users
- transactions
- budgets
- reminders

---

# 👤 USERS (Tabella: users)

## Operazioni supportate:

### ➕ Inserimento
- Registrazione nuovo utente con associazione a tenant

### 📖 Lettura
- Recupero dati utente tramite email o ID
- Verifica credenziali di login
- Recupero utenti per tenant

### ✏️ Modifica
- Aggiornamento refresh_token
- Aggiornamento ruolo (user/admin)
- Modifica dati utente (se prevista dal backend)

### ❌ Eliminazione
- Eliminazione utente (cascata su dati collegati)

---

# 💸 TRANSACTIONS (Tabella: transactions)

## Operazioni supportate:

### ➕ Inserimento
- Creazione nuova transazione (entrata / uscita)

### 📖 Lettura
- Recupero transazioni per utente
- Recupero transazioni per tenant
- Filtri per data, tipo e categoria

### ✏️ Modifica
- Aggiornamento importo
- Aggiornamento categoria
- Aggiornamento descrizione
- Aggiornamento data

### ❌ Eliminazione
- Eliminazione transazione per ID

---

# 📊 BUDGETS (Tabella: budgets)

## Operazioni supportate:

### ➕ Inserimento
- Creazione budget per categoria e mese

### 📖 Lettura
- Recupero budget per utente
- Recupero budget per tenant
- Recupero budget per mese/anno

### ✏️ Modifica
- Aggiornamento limite di spesa
- Modifica categoria
- Modifica periodo (mese/anno)

### ❌ Eliminazione
- Eliminazione budget per ID

---

# ⏰ REMINDERS (Tabella: reminders)

## Operazioni supportate:

### ➕ Inserimento
- Creazione promemoria pagamento

### 📖 Lettura
- Recupero promemoria per utente
- Recupero promemoria per tenant
- Filtri per data scadenza e stato pagamento

### ✏️ Modifica
- Aggiornamento titolo
- Aggiornamento importo
- Aggiornamento data scadenza
- Aggiornamento stato (pagato / non pagato)

### ❌ Eliminazione
- Eliminazione promemoria per ID

---

# 🏢 TENANTS (Tabella: tenants)

## Operazioni supportate:

### ➕ Inserimento
- Creazione nuovo tenant (azienda/spazio)

### 📖 Lettura
- Recupero lista tenant
- Recupero tenant per slug o ID

### ✏️ Modifica
- Aggiornamento nome tenant
- Aggiornamento slug

### ❌ Eliminazione
- Eliminazione tenant (cascata su utenti e dati collegati)

---

# 🔐 REGOLE DI ACCESSO DATI

- Tutte le query sono filtrate tramite `tenant_id`
- Ogni utente può accedere solo ai propri dati
- Le relazioni sono protette da foreign key

---

# 📌 NOTE TECNICHE

- Tutte le operazioni sono gestite tramite API REST (Node.js)
- Le modifiche ai dati avvengono tramite query SQL su MySQL
- Le eliminazioni utilizzano CASCADE dove definito
---

---

# 🚀 Obiettivo del progetto

Fornire un sistema semplice ma completo per la gestione delle finanze personali e aziendali, con supporto multi-utente e separazione dei dati.

---

# 🔗 Link Risultato IA
[https://finanza-zen-31.lovable.app](https://lovable.dev/projects/ce45cbf1-a5aa-49a0-8d86-66056851fc9d?utm_source=lovable-badge)

---


