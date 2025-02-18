const API_KEY = 'AIzaSyAf5iWmlgcpHOOib8wClGC5hH2DoX0g3OM';  // Your Google Sheets API key
const SPREADSHEET_ID = '1nE2ohOnINWPDd2u3_ajVBXaM8lR3gQqvUSe0pE9UJH4';  // Your Google Sheets ID
const RANGE = 'database3';  // The range you're using

// Fetch data from Google Sheets API
async function fetchData(query) {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${RANGE}?key=${API_KEY}`;
    console.log(`Fetching data from: ${url}`);

    try {
        const response = await fetch(url);
        const data = await response.json();
        
        if (data.error) {
            console.error("Error fetching data:", data.error.message);
            return [];
        }
        
        console.log("Fetched data:", data.values);
        return data.values;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        return [];
    }
}

// Search functionality
document.getElementById("searchButton").addEventListener("click", async () => {
    const searchTerm = document.getElementById("searchInput").value.trim();
    
    if (!searchTerm) {
        alert("Please enter a search term.");
        return;
    }

    const data = await fetchData(searchTerm);
    if (data.length === 0) {
        alert("No data found or error occurred.");
        return;
    }

    const results = searchInData(data, searchTerm);
    displayResults(results);
});

// Search logic to match terms
function searchInData(data, searchTerm) {
    return data.filter(row => 
        row.some(cell => cell.toLowerCase().includes(searchTerm.toLowerCase()))
    );
}

// Display search results
function displayResults(results) {
    const output = document.getElementById("output");
    output.innerHTML = '';

    if (results.length > 0) {
        results.forEach(row => {
            const rowDiv = document.createElement("div");
            row.forEach((cell, index) => {
                const cellDiv = document.createElement("div");
                cellDiv.textContent = cell;
                cellDiv.style.color = "#000000";  // Data is black
                rowDiv.appendChild(cellDiv);
            });
            output.appendChild(rowDiv);
        });
    } else {
        output.innerHTML = "<p>No results found.</p>";
    }
}

// Clear search input
document.getElementById("clearButton").addEventListener("click", () => {
    document.getElementById("searchInput").value = '';
    document.getElementById("output").innerHTML = '';
});

// Install PWA
let deferredPrompt;
const installButton = document.getElementById("installButton");

window.addEventListener("beforeinstallprompt", (event) => {
    deferredPrompt = event;
    installButton.style.display = "block";  // Show the install button when the prompt is available
});

installButton.addEventListener("click", () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then((result) => {
        if (result.outcome === 'accepted') {
            console.log('User accepted the install prompt');
        } else {
            console.log('User dismissed the install prompt');
        }
        deferredPrompt = null;
    });
});

// Register Service Worker for offline functionality
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/service-worker.js')
            .then((registration) => {
                console.log('Service Worker registered:', registration);
            })
            .catch((error) => {
                console.log('Service Worker registration failed:', error);
            });
    });
}
