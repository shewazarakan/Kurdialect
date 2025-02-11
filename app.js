// Initialize offline data storage
let translationData = [];

// Fetch Data from JSON (Offline Support)
async function fetchData() {
    document.getElementById('loadingScreen').style.display = 'flex';

    try {
        const response = await fetch('data.json'); // Load local JSON file
        const data = await response.json();
        translationData = data.records;

        document.getElementById('loadingScreen').style.display = 'none';
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('loadingScreen').style.display = 'none';
    }
}

// Search Function
function searchData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    if (!searchTerm) {
        document.getElementById('output').innerHTML = "Please enter a search term.";
        return;
    }

    const results = translationData.filter(record =>
        record.sorani.toLowerCase().includes(searchTerm) ||
        record.badini.toLowerCase().includes(searchTerm) ||
        record.hawrami.toLowerCase().includes(searchTerm)
    );

    if (results.length === 0) {
        document.getElementById('output').innerHTML = "No results found.";
    } else {
        displayData(results);
    }
}

// Display Results
function displayData(data) {
    let outputHTML = '';
    data.forEach(record => {
        outputHTML += `<div class="result-card">
            <strong style="color: blue;">سۆرانی:</strong> ${record.sorani}<br>
            <strong style="color: lightblue;">بادینی:</strong> ${record.badini}<br>
            <strong style="color: lightblue;">هەورامی:</strong> ${record.hawrami}
        </div>`;
    });

    document.getElementById('output').innerHTML = outputHTML;
}

// Register Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log("Service Worker Registered"))
        .catch(error => console.log("Service Worker Registration Failed:", error));
}

// Event Listeners
document.getElementById('searchButton').addEventListener('click', searchData);
document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('output').innerHTML = '';
});

// Load Data on Page Load
fetchData();
