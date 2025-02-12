<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="Kurdish dialects translator">
  <title>Kurdişiv</title>
  <link rel="icon" href="icon.png">
  <link rel="manifest" href="manifest.json">
  <style>
    body {
      font-family: Arial, sans-serif;
      background-color: #f0f0f0;
      padding: 20px;
      margin: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
    }

    .container {
      width: 100%;
      max-width: 800px;
      margin: 0 auto;
    }

    #loadingScreen {
      display: none;
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100vh;
      background: rgba(255, 255, 255, 0.8);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5em;
      font-weight: bold;
      color: #012169;
      z-index: 9999;
    }

    #loadingScreen .spinner {
      border: 6px solid #f3f3f3;
      border-top: 6px solid #012169;
      border-radius: 50%;
      width: 30px;
      height: 30px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    .search-container {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .search-container input {
      flex: 1;
      padding: 10px;
      margin-right: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      font-size: 1.1em;
      color: #012169;
    }

    .search-container button {
      padding: 10px 20px;
      border-radius: 5px;
      font-size: 1.1em;
      cursor: pointer;
    }

    .search-btn {
      background-color: #012169;
      color: white;
      border: none;
    }

    .clear-btn {
      background-color: #f5c400;
      color: white;
      border: none;
    }

    .install-btn {
      position: fixed;
      bottom: 20px;
      left: 20px;
      background-color: #f5c400;
      border-radius: 50%;
      padding: 15px;
      color: white;
      font-size: 24px;
      cursor: pointer;
      z-index: 999;
    }

    .results-box {
      margin-top: 20px;
      background-color: #fff;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
      display: none;
    }

    .results-box table {
      width: 100%;
      border-collapse: collapse;
    }

    .results-box th, .results-box td {
      padding: 10px;
      text-align: left;
    }

    .results-box th {
      background-color: #012169;
      color: white;
    }

    .results-box td {
      background-color: #f5c400;
      color: black;
    }

    /* Responsive Design */
    @media (max-width: 600px) {
      .search-container {
        flex-direction: column;
        align-items: stretch;
      }
      
      .search-container input {
        margin-bottom: 10px;
      }

      .search-container button {
        margin-top: 10px;
      }
    }
  </style>
</head>
<body>

<div id="loadingScreen">
  <div class="spinner"></div>
  <div>Loading...</div>
</div>

<div class="container">
  <div class="search-container">
    <input type="text" id="searchInput" placeholder="Search for a word..." />
    <button id="searchButton" class="search-btn">Search</button>
    <button id="clearButton" class="clear-btn">Clear</button>
  </div>

  <div class="results-box" id="resultsBox">
    <table>
      <thead>
        <tr>
          <th>Soranî</th>
          <th>Badinî</th>
          <th>Hewramî</th>
        </tr>
      </thead>
      <tbody id="resultsTableBody">
        <!-- Search results will appear here -->
      </tbody>
    </table>
  </div>

  <button class="install-btn" id="installBtn">
    + Install
  </button>
</div>

<script src="app.js"></script>
</body>
</html>
