<?php
session_start();

function startWorkSession($siteName) {
    $_SESSION['start_time'] = time();
    $_SESSION['site_name'] = $siteName;
}

function endWorkSession() {
    if (isset($_SESSION['start_time'])) {
        $start_time = $_SESSION['start_time'];
        $end_time = time();
        $session_duration = $end_time - $start_time;

        saveToCSV($start_time, $end_time, $session_duration, $_SESSION['site_name']);

        if (!isset($_SESSION['total_duration'])) {
            $_SESSION['total_duration'] = 0;
        }
        $_SESSION['total_duration'] += $session_duration;

        unset($_SESSION['start_time']);
        unset($_SESSION['site_name']);
    }

    // Invia la risposta al client
    sendResponse();
}

function saveToCSV($start_time, $end_time, $duration, $siteName) {
    $csv_file = 'work_report.csv';

    if (!file_exists($csv_file)) {
        $csv_header = "Date,Start Time,End Time,Duration,Site Name\n";
        file_put_contents($csv_file, $csv_header);
    }

    $date = date('Y-m-d');
    $start_time_formatted = date('H:i:s', $start_time);
    $end_time_formatted = date('H:i:s', $end_time);
    $csv_data = "$date,$start_time_formatted,$end_time_formatted," . gmdate("H:i:s", $duration) . ",$siteName\n";
    file_put_contents($csv_file, $csv_data, FILE_APPEND);
}

function sendResponse() {
    $response = array(
        'totalDuration' => gmdate("H:i:s", $_SESSION['total_duration']),
        'downloadLink' => 'work_report.csv'
    );
    echo json_encode($response);
}

// Handle AJAX requests
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $action = $_POST['action'];
    switch ($action) {
        case 'start':
            $siteName = $_POST['siteName'];
            startWorkSession($siteName);
            break;
        case 'end':
            endWorkSession();
            break;
        default:
            // Handle other actions if needed
            break;
    }
}
?>
