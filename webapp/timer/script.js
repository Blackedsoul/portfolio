let startTime;
let timerInterval;

function iniziaLavoro() {
    startTime = new Date();
    updateTimer();

    // Avvia il timer
    timerInterval = setInterval(updateTimer, 1000);

    document.getElementById("conteggio").innerHTML = "Lavoro iniziato alle " + formatTime(startTime);
}

function terminaLavoro() {
    if (!startTime) {
        alert("Errore: devi iniziare il lavoro prima di poterlo terminare.");
        return;
    }

    const endTime = new Date();
    const tempoLavorato = calculateTimeDifference(startTime, endTime);
    const nomeSito = document.getElementById("nomeSito").value;

    if (!nomeSito) {
        alert("Inserisci il nome del sito prima di terminare il lavoro.");
        return;
    }

    document.getElementById("conteggio").innerHTML = `Lavoro terminato alle ${formatTime(endTime)}<br>
        Tempo totale di lavoro: ${tempoLavorato}<br>
        Nome del sito: ${nomeSito}`;

    // Ferma il timer
    clearInterval(timerInterval);

    inviaReport(nomeSito, tempoLavorato);
}

function updateTimer() {
    const currentTime = new Date();
    const tempoTrascorso = calculateTimeDifference(startTime, currentTime);
    document.getElementById("timer").innerHTML = "Tempo: " + tempoTrascorso;
}

function calculateTimeDifference(start, end) {
    const diff = Math.floor((end - start) / 1000);
    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

function formatTime(time) {
    return time.toLocaleTimeString();
}

function inviaReport(nomeSito, tempoLavorato) {
    // Invia i dati al server PHP per la gestione del report
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "gestore_ore_lavoro.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    const data = "nome_sito=" + encodeURIComponent(nomeSito) + "&tempo_lavorato=" + encodeURIComponent(tempoLavorato);
    xhr.send(data);
}

// Aggiungi questa funzione per aggiungere una riga al report HTML
function aggiungiRigaReport(nomeSito, tempoLavorato) {
    const reportTable = document.getElementById("reportTable");
    const newRow = reportTable.insertRow(-1);
    const cell1 = newRow.insertCell(0);
    const cell2 = newRow.insertCell(1);

    cell1.innerHTML = nomeSito;
    cell2.innerHTML = tempoLavorato;
}

// Modifica la funzione inviaReport nel file JavaScript
function inviaReport(nomeSito, tempoLavorato) {
    // Invia i dati al server PHP per la gestione del report
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "gestore_ore_lavoro.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    const data = "nome_sito=" + encodeURIComponent(nomeSito) + "&tempo_lavorato=" + encodeURIComponent(tempoLavorato);
    xhr.send(data);

    // Aggiungi la riga al report HTML
    aggiungiRigaReport(nomeSito, tempoLavorato);
}
// Aggiungi questa funzione per aprire la finestra modale
function apriFinestraModale() {
    document.getElementById("modal").style.display = "block";
}

// Aggiungi questa funzione per chiudere la finestra modale
function chiudiFinestraModale() {
    document.getElementById("modal").style.display = "none";
}

// Modifica la funzione inviaReport nel file JavaScript
function inviaReport(nomeSito, tempoLavorato) {
    // Invia i dati al server PHP per la gestione del report
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "gestore_ore_lavoro.php", true);
    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    const data = "nome_sito=" + encodeURIComponent(nomeSito) + "&tempo_lavorato=" + encodeURIComponent(tempoLavorato);
    xhr.send(data);

    // Aggiungi la riga al report HTML
    aggiungiRigaReport(nomeSito, tempoLavorato);

    // Apri la finestra modale
    apriFinestraModale();
}


// Aggiungi questa funzione per caricare e visualizzare i dati dal file CSV
function caricaDatiCSV() {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const datiCSV = JSON.parse(xhr.responseText);
            visualizzaDatiCSV(datiCSV);
        }
    };
    xhr.open("GET", "carica_dati_csv.php", true);
    xhr.send();
}

// Aggiungi questa funzione per visualizzare i dati nel tuo HTML
function visualizzaDatiCSV(datiCSV) {
    const reportTable = document.getElementById("reportTable");
    // Pulisci la tabella
    while (reportTable.rows.length > 1) {
        reportTable.deleteRow(1);
    }

    // Aggiungi i dati alla tabella
    datiCSV.forEach(function (riga) {
        const newRow = reportTable.insertRow(-1);
        const cell1 = newRow.insertCell(0);
        const cell2 = newRow.insertCell(1);

        cell1.innerHTML = riga.sito;
        cell2.innerHTML = riga.tempo;
    });
}

// Chiamata iniziale per caricare i dati quando la pagina si carica
caricaDatiCSV();