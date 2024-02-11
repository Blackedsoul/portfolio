<?php
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $nomeSito = $_POST["nome_sito"];
    $tempoLavorato = $_POST["tempo_lavorato"];

    // Nome del file CSV
    $csvFile = "report_ore_lavoro.csv";

    // Leggi i dati esistenti dal file CSV
    $existingData = array();
    if (file_exists($csvFile)) {
        $file = fopen($csvFile, "r");
        $header = fgetcsv($file); // Leggi l'intestazione

        while ($row = fgetcsv($file)) {
            // Salva i dati esistenti in un array associativo (sito => array("tempo" => tempoTotale, "records" => array()))
            $existingData[$row[0]]["tempo"] = $row[1];
            $existingData[$row[0]]["records"] = json_decode($row[2], true);
        }

        fclose($file);
    }

    // Aggiorna il tempo per il sito corrente e aggiungi il nuovo record
    if (array_key_exists($nomeSito, $existingData)) {
        $existingData[$nomeSito]["tempo"] += $tempoLavorato;
        $existingData[$nomeSito]["records"][] = array("tempo" => $tempoLavorato, "timestamp" => time());
    } else {
        $existingData[$nomeSito]["tempo"] = $tempoLavorato;
        $existingData[$nomeSito]["records"] = array(array("tempo" => $tempoLavorato, "timestamp" => time()));
    }

    // Scrivi i dati aggiornati nel file CSV
    $file = fopen($csvFile, "w");
    fputcsv($file, array_merge($header, array("Tempo Totale"))); // Scrivi l'intestazione
    foreach ($existingData as $site => $data) {
        fputcsv($file, array($site, $data["tempo"], json_encode($data["records"])));
    }
    fclose($file);

    // Invia una risposta JSON per confermare il salvataggio
    echo json_encode(array("success" => true));
}
?>
