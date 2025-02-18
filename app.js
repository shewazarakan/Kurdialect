const searchButton = document.getElementById("search-button");
const clearButton = document.getElementById("clear-button");
const searchInput = document.getElementById("search-input");
const resultsContainer = document.getElementById("results-body");
const loadingScreen = document.getElementById("loading");
const appContent = document.getElementById("app");
const installButton = document.getElementById("install-button");

let deferredPrompt; // To store the install event

// Google Sheets API URL
let apiUrl = "https://sheets.googleapis.com/v4/spreadsheets/1nE2ohOnINWPDd2u3_ajVBXaM8lR3gQqvUSe0pE9UJH4/values/database3?key=YOUR_API_KEY";

// Show loading screen while fetching data
function showLoading() {
    loadingScreen.style.display = "block";
    appContent.style.display = "none";
}

// Hide loading screen and show app content
function hideLoading() {
    loadingScreen.style.display = "none";
    appContent.style.display = "block";
}

// Fetch data from Google Sheets API
async function fetchData(query) {
    showLoading();
    const response = await fetch(apiUrl);
    const data = await response.json();
    const rows = data.values.slice(1); // Exclude header row
    const results = [];

    rows.forEach((row) => {
        if (row[0].includes(query) || row[1].includes(query) || row[2].includes(query)) {
            results.push(row);
        }
    });

    displayResults(results);
}

// Display search results
function displayResults(results) {
    resultsContainer.innerHTML = "";

    if (results.length > 0) {
        results.forEach((row) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${row[0]}</td>
                <td>${row[1]}</td>
                <td>${row[2]}</td>
            `;
            resultsContainer.appendChild(tr);
        });
    } else {
        resultsContainer.innerHTML = "<tr><td colspan='3'>No results found</td></tr>";
    }

    hideLoading();
}

// Clear search results
clearButton.addEventListener("click", () => {
    searchInput.value = "";
    resultsContainer.innerHTML = "";
});

// Search button event
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchData(query);
    }
});

// Handle Install Button Logic
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    installButton.style.display = "block"; // Show the install button
});

installButton.addEventListener("click", () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                installButton.style.display = "none"; // Hide button after install
            }
            deferredPrompt = null;
        });
    }
});
