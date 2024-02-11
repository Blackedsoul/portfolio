<?php
// Verifica se il file CSV esiste
$csv_file = 'work_report.csv';
if (file_exists($csv_file)) {
    // Invia l'header per indicare che il file è un file CSV
    header('Content-Type: text/csv');
    header('Content-Disposition: attachment; filename="work_report.csv"');

    // Leggi il contenuto del file CSV e stampalo in output
    readfile($csv_file);
} else {
    echo "Il file CSV non esiste.";
}
?>
