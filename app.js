const searchButton = document.getElementById('search-btn');
const clearButton = document.getElementById('clear-btn');
const installButton = document.getElementById('install-button');
const searchInput = document.getElementById('search-input');
const resultsBox = document.getElementById('search-results-box');
const resultsBody = document.getElementById('results-body');

// Sample Data (replace this with actual data from SheetDB)
const data = [
    { input: 'Kurdish', sorani: 'کوردی', badini: 'کوردی' },
    { input: 'Language', sorani: 'زمان', badini: 'زمان' },
    // Add more data as needed
];

// Event Listeners
searchButton.addEventListener('click', searchData);
clearButton.addEventListener('click', clearResults);

// Search Function
function searchData() {
    const query = searchInput.value.trim().toLowerCase();
    if (query) {
        const results = data.filter(item =>
            item.input.toLowerCase().includes(query)
        );
        displayResults(results);
    }
}

// Display Results
function displayResults(results) {
    resultsBody.innerHTML = '';
    if (results.length > 0) {
        results.forEach(result => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${result.input}</td>
                <td>${result.sorani}</td>
                <td>${result.badini}</td>
            `;
            resultsBody.appendChild(row);
        });
    } else {
        resultsBody.innerHTML = '<tr><td colspan="3">No results found.</td></tr>';
    }
}

// Clear Results
function clearResults() {
    searchInput.value = '';
    resultsBody.innerHTML = '';
}

// Install Button Logic
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (e) => {
    // Prevent the default behavior
    e.preventDefault();
    deferredPrompt = e;

    // Show the install button
    installButton.style.display = 'flex';

    installButton.addEventListener('click', () => {
        // Prompt the user for installation
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null;
        });
    });
});
