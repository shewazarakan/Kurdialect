// Airtable API Key & Base ID
const API_KEY = "pattdszpPNjdfwO2r.44b8a2e4dcb3f0bf95b2f80fda2a42734ba1ef4ac5d43172d8bdcd3e94016395";
const BASE_ID = "appPMRn6taSjy5Cuw";
const TABLE_NAME = "database2";
const API_URL = `https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`;

let airtableData = [];

// Fetch Data from Airtable
async function fetchData() {
    document.getElementById('loadingScreen').style.display = 'flex';

    try {
        const response = await fetch(API_URL, {
            headers: { Authorization: `Bearer ${API_KEY}` }
        });
        const data = await response.json();

        airtableData = data.records.map(record => ({
            sorani: record.fields["سۆرانی"] || "",
            badini: record.fields["بادینی"] || "",
            hawrami: record.fields["هەورامی"] || ""
        }));

        // Save to localStorage for offline use
        localStorage.setItem('offlineData', JSON.stringify(airtableData));

        document.getElementById('loadingScreen').style.display = 'none';
    } catch (error) {
        console.warn("⚠️ Could not fetch Airtable. Trying offline mode...");
        loadOfflineData();
    }
}

// Load Data from Local Storage (Offline Mode)
function loadOfflineData() {
    const storedData = localStorage.getItem('offlineData');
    if (storedData) {
        airtableData = JSON.parse(storedData);
        console.log("✅ Loaded offline data.");
    } else {
        document.getElementById('output').innerHTML = "⚠️ No internet & no offline data available.";
    }
    document.getElementById('loadingScreen').style.display = 'none';
}

// Search Function
function searchData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    if (!searchTerm) {
        document.getElementById('output').innerHTML = "Please enter a search term.";
        return;
    }

    const results = airtableData.filter(record =>
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

// Register Service Worker (for PWA offline support)
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        .then(() => console.log("✅ Service Worker Registered"))
        .catch(error => console.log("⚠️ Service Worker Failed:", error));
}

// Event Listeners
document.getElementById('searchButton').addEventListener('click', searchData);
document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('output').innerHTML = '';
});

// Load Data on Page Load
fetchData();
