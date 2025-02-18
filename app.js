let searchResults = [];
const apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1nE2ohOnINWPDd2u3_ajVBXaM8lR3gQqvUSe0pE9UJH4/values/database3!A1:C1000?key=YOUR_API_KEY';
const installButton = document.getElementById('install-btn');

// Listen for search input change
document.getElementById('searchInput').addEventListener('input', function() {
    searchResults = [];
    document.getElementById('resultsBox').style.display = 'none';
    document.getElementById('errorMessages').textContent = '';
});

// Perform search when Search button is clicked
function searchData() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (!searchTerm) {
        document.getElementById('errorMessages').textContent = 'Please enter a search term.';
        return;
    }
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            searchResults = [];
            const values = data.values;
            for (let row of values) {
                if (row[0].includes(searchTerm) || row[1].includes(searchTerm) || row[2].includes(searchTerm)) {
                    searchResults.push(row);
                }
            }

            if (searchResults.length === 0) {
                document.getElementById('errorMessages').textContent = 'No results found.';
            } else {
                displayResults();
            }
        })
        .catch(error => {
            document.getElementById('errorMessages').textContent = 'Error fetching data.';
            console.error(error);
        });
}

// Display results in the results box
function displayResults() {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = '';
    searchResults.forEach(result => {
        const rowDiv = document.createElement('div');
        
        rowDiv.innerHTML = `
            <div class="column sorani">سۆرانی: <span class="data">${result[0]}</span></div>
            <div class="column badini">بادینی: <span class="data">${result[1]}</span></div>
            <div class="column herami">هەورامی: <span class="data">${result[2]}</span></div>
        `;
        resultsDiv.appendChild(rowDiv);
    });

    document.getElementById('resultsBox').style.display = 'block';
}

// Clear the search input and results
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('errorMessages').textContent = '';
    document.getElementById('resultsBox').style.display = 'none';
}

// Service Worker install logic for PWA
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (event) => {
    deferredPrompt = event;
    installButton.style.display = 'block';
});

installButton.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            } else {
                console.log('User dismissed the install prompt');
            }
            deferredPrompt = null;
            installButton.style.display = 'none';
        });
    }
});
