<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Kurdialect</title>
    <link rel="stylesheet" href="styles.css">
    <link rel="manifest" href="manifest.json">
</head>
<body>
    <!-- Loading Screen -->
    <div id="loadingScreen">
        <div class="spinner"></div>
        <p>Loading...</p>
    </div>

    <!-- Search Section -->
    <div class="search-container">
        <input type="text" id="searchInput" placeholder="Search">
        <div class="button-group">
            <button id="searchButton">Search</button>
            <button id="clearButton">Clear</button>
        </div>
    </div>

    <!-- Search Results -->
    <div id="outputContainer">
        <h3><strong>SEARCH RESULTS</strong></h3>
        <div id="output"></div>
    </div>

    <!-- Install Button -->
    <button id="installButton" style="display: none;">+</button>

    <script src="app.js"></script>

    <!-- Register Service Worker for Offline Support -->
    <script>
        if ("serviceWorker" in navigator) {
            navigator.serviceWorker.register("service-worker.js")
                .then(() => console.log("Service Worker Registered"))
                .catch(error => console.error("Service Worker Registration Failed:", error));
        }
    </script>
</body>
</html>
