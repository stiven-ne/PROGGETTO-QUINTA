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
