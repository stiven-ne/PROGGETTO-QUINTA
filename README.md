#PROGETTO-QUINTA

#Cognome Nome
Kurtulaj Stiven

#Titolo
Responsabile delle finanze personali

#Tagline
"Tieni sotto controllo le tue finanze, un clic alla volta"

#Descrizione
Applicazione web per monitorare e gestire spese e entrate personali, con categorie, report mensili e budget personalizzati.

#Descrizione completa
L'app consente agli utenti di inserire entrate e uscite, categorizzarle (es. cibo, affitto, tempo libero), visualizzare grafici e riepiloghi mensili, impostare budget per categoria, ricevere promemoria per pagamenti ricorrenti ed esportare dati in CSV/PDF. Autenticazione tramite JWT per proteggere i dati degli utenti. Flusso principale: registrazione/login → dashboard con saldo e grafici → aggiunta/gestione transazioni → impostazione budget e promemoria → esportazione report.

#Target
Persone che vogliono monitorare e gestire facilmente le proprie spese e entrate personali.

#Concorrenti

Menta
YNAB (Hai bisogno di un budget)
Spendee
Tecnologia:

HTML, CSS, JavaScript (frontend)
PHP (backend)
SQL (database)

#REQUISITI FUNZIONALITÀ APPLICAZIONE

1. Gestione Autenticazione Utenti

1.1 L’applicazione deve permettere la registrazione di un nuovo utente.
1.2 L’applicazione deve permettere il login tramite email e password.
1.3 Il sistema deve utilizzare JWT per autenticare le richieste.
1.4 Il sistema deve impedire l’accesso ai dati personali senza autenticazione.
1.5 L’utente deve poter effettuare il logout.

2. Gestione delle Transazioni (Entrate/Uscite)

2.1 L’utente deve poter inserire manualmente una transazione, specificando:

tipo (entrata o uscita)

importo

categoria

data

descrizione opzionale

2.2 L’utente deve poter modificare una transazione esistente.
2.3 L’utente deve poter eliminare una transazione.
2.4 L’app deve aggiornare automaticamente:

il saldo attuale

i grafici delle spese e delle entrate

il riepilogo mensile

2.5 L’utente deve poter inserire entrate extra o occasionali.

3. Gestione Categorie

3.1 L’app deve fornire un set di categorie predefinite (Cibo, Affitto, Trasporti, ecc.).
3.2 L’utente deve poter aggiungere nuove categorie personalizzate.
3.3 L’utente deve poter modificare o eliminare categorie create da lui (se non obbligatorie di sistema).

4. Gestione del Budget Mensile

4.1 L’utente deve poter impostare un budget per categoria (es. 300€ per Spesa alimentare).
4.2 L’app deve calcolare la percentuale di budget utilizzato.
4.3 Il sistema deve inviare notifiche/avvisi quando:

viene superato il 75% della soglia

viene raggiunto o superato il 100%

4.4 I budget devono essere modificabili e ripetuti mensilmente.

5. Promemoria e Pagamenti Ricorrenti

5.1 L’utente deve poter configurare un promemoria per pagamenti ricorrenti (es. affitto).
5.2 L’app deve inviare una notifica prima della scadenza (es. 2 giorni prima).
5.3 L’utente deve poter visualizzare i promemoria in un calendario integrato.
5.4 Il promemoria deve essere modificabile o cancellabile.

6. Dashboard e Visualizzazione Dati

6.1 L’applicazione deve mostrare nella dashboard:

saldo attuale

totale entrate/uscite del mese

grafici aggiornati automaticamente

6.2 Devono essere disponibili grafici:

a torta (spese per categoria)

a barre (entrate/uscite nel mese)
6.3 L’utente deve poter vedere un riepilogo finanziario mensile.

7. Storico e Confronto tra Mesi

7.1 L’utente deve accedere allo storico delle transazioni suddiviso per mesi/anni.
7.2 Il sistema deve permettere il confronto tra due mesi (es. settembre vs ottobre).
7.3 L’utente deve poter analizzare:

variazione percentuale delle spese

categorie più costose

miglioramenti o peggioramenti

8. Esportazione dei Dati

8.1 L’utente deve poter esportare i dati finanziari nei formati:

CSV

PDF

8.2 L’utente deve poter esportare:

i dati mensili

i dati annuali

l’intero storico

8.3 Il file esportato deve seguire una struttura leggibile e ordinata.

9. Notifiche

9.1 L’app deve inviare notifiche per:

superamento budget

promemoria pagamenti ricorrenti

riepilogo mensile disponibile

9.2 Le notifiche devono essere visibili nella dashboard.

10. Sicurezza e Protezione dei Dati

10.1 L’app deve proteggere i dati tramite autenticazione JWT.
10.2 Le password devono essere salvate tramite hashing sicuro.
10.3 Ogni utente deve poter accedere solo ai propri dati.

11. Interfaccia Web

11.1 L’app deve essere navigabile tramite browser web (HTML, CSS, JS).
11.2 Tutte le principali sezioni devono essere accessibili dal menù:

Dashboard

Transazioni

Budget

Promemoria

Report

Storico

11.3 L’interfaccia deve essere responsiva e fruibile anche da mobile.

#LINK RISULTATO IA
https://finanza-zen-31.lovable.app

#LINK PUBBLICO WEB APP:
