// Fetching the data from the Google Sheets API (via SheetDB)
const sheetApiUrl = 'https://sheetdb.io/api/v1/cg3gwaj5yfawg'; // Your API URL
const searchButton = document.getElementById('searchButton');
const clearButton = document.getElementById('clearButton');
const searchInput = document.getElementById('searchInput');
const outputContainer = document.getElementById('output');

// Function to perform search
const performSearch = async () => {
    const searchTerm = searchInput.value.trim().toLowerCase();
    if (!searchTerm) return; // Do nothing if the search term is empty

    try {
        const response = await fetch(sheetApiUrl);
        const data = await response.json();

        const results = data.filter((row) => {
            // Check if the search term matches any column (case-insensitive)
            return (
                row['سۆرانی'].toLowerCase().includes(searchTerm) ||
                row['بادینی'].toLowerCase().includes(searchTerm) ||
                row['هەورامی'].toLowerCase().includes(searchTerm)
            );
        });

        displayResults(results, searchTerm);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

// Function to display search results
const displayResults = (results, searchTerm) => {
    if (results.length === 0) {
        outputContainer.innerHTML = 'No results found.';
        return;
    }

    // Clear previous results
    outputContainer.innerHTML = '';

    // Create a table to display results
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');

    // Create table headers dynamically based on the columns
    const headers = ['سۆرانی', 'بادینی', 'هەورامی'];
    headers.forEach((header) => {
        const th = document.createElement('th');
        th.style.backgroundColor = searchTerm === header.toLowerCase() ? '#c05510' : '#f5c400';
        th.textContent = header;
        headerRow.appendChild(th);
    });

    table.appendChild(headerRow);

    // Display each result as a table row
    results.forEach((row) => {
        const rowElement = document.createElement('tr');
        headers.forEach((column) => {
            const td = document.createElement('td');
            td.style.color = '#000000';
            td.textContent = row[column];
            rowElement.appendChild(td);
        });
        table.appendChild(rowElement);
    });

    outputContainer.appendChild(table);
};

// Search button click handler
searchButton.addEventListener('click', performSearch);

// Clear button click handler
clearButton.addEventListener('click', () => {
    searchInput.value = '';
    outputContainer.innerHTML = '';
});

// PWA Install Button
let deferredPrompt;

const installButton = document.querySelector('.install-btn');

// Listen for beforeinstallprompt event
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault(); // Prevent the default install prompt
    deferredPrompt = e; // Store the event for later use
    installButton.style.display = 'block'; // Show the install button
});

// When the user clicks the install button, show the install prompt
installButton.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt(); // Show the install prompt
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the A2HS prompt');
            } else {
                console.log('User dismissed the A2HS prompt');
            }
            deferredPrompt = null; // Reset the deferred prompt
        });
    }
});
