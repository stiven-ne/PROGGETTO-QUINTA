# 🧾 Scenari d’Uso Dettagliati

Di seguito vengono riportati i principali scenari d’uso dell’applicazione **Silver Palm Tree – Expense Manager**, coerenti con il modello UML e con il database MySQL.

---

# 💸 Scenario 1 — Creazione Transazione

## 👤 Attore
Utente

## 📌 Descrizione
L’utente inserisce una nuova transazione (entrata o uscita) nel sistema.

## 🔄 Flusso principale
1. L’utente accede alla sezione “Transazioni”
2. Seleziona “Crea transazione”
3. Inserisce i dati richiesti:
   - tipo (entrata / uscita)
   - importo
   - categoria
   - descrizione
   - data
4. Il sistema valida i dati inseriti
5. La transazione viene salvata nel database nella tabella `transactions`
6. Il sistema associa automaticamente `user_id` e `tenant_id`
7. Il saldo della dashboard viene aggiornato

## 🗄️ Tabella coinvolta
- transactions

---

# 📊 Scenario 2 — Gestione Budget

## 👤 Attore
Utente

## 📌 Descrizione
L’utente crea e gestisce un budget mensile per categoria di spesa.

## 🔄 Flusso principale
1. L’utente accede alla sezione “Budget”
2. Seleziona “Crea budget”
3. Inserisce:
   - categoria
   - limite di spesa
   - mese
   - anno
4. Il sistema valida i dati
5. Il budget viene salvato nella tabella `budgets`
6. Il sistema calcola le spese già effettuate dalla tabella `transactions`
7. Viene mostrato lo stato del budget (speso / rimanente)

## 🗄️ Tabella coinvolta
- budgets

---

# ⏰ Scenario 3 — Gestione Promemoria

## 👤 Attore
Utente

## 📌 Descrizione
L’utente crea promemoria per scadenze di pagamento future.

## 🔄 Flusso principale
1. L’utente accede alla sezione “Promemoria”
2. Seleziona “Nuovo promemoria”
3. Inserisce:
   - titolo
   - importo
   - data di scadenza
4. Il sistema valida i dati inseriti
5. Il promemoria viene salvato nella tabella `reminders`
6. Il sistema associa `user_id` e `tenant_id`
7. Il promemoria viene visualizzato nella lista scadenze
8. L’utente può segnarlo come “pagato”

## 🗄️ Tabella coinvolta
- reminders

---

# 🧠 Coerenza con il sistema

Tutti gli scenari sono coerenti con:

- 👤 Attore unico: Utente
- 🏢 Sistema multi-tenant (tenant_id)
- 🗄️ Database MySQL:
  - users
  - transactions
  - budgets
  - reminders

---

# ✔ Obiettivo

Questi scenari descrivono le principali operazioni di scrittura e lettura sul database dell’applicazione e sono allineati al diagramma UML dei casi d’uso.
