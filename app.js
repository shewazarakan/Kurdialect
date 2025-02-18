// Loading Screen Element
const loadingScreen = document.getElementById('loading');
const appContent = document.getElementById('app');
const searchResultsDiv = document.getElementById('results');
const searchButton = document.getElementById('search-button');
const clearButton = document.getElementById('clear-button');

// Google Sheets API URL (this is your SheetDB API endpoint, automatically set from the URL)
const googleSheetsAPI = 'https://sheetdb.io/api/v1/cg3gwaj5yfawg';

// Fetch the data from Google Sheets API
fetch(googleSheetsAPI)
    .then(response => response.json()) // Parse the JSON response
    .then(data => {
        // Hide the loading screen once the data is fetched
        loadingScreen.style.display = 'none';
        appContent.style.display = 'block'; // Show the app content

        // Handle the data and set up search functionality
        setupSearch(data);
    })
    .catch(error => {
        // Handle errors (if the API request fails)
        console.error('Error fetching data:', error);
        loadingScreen.innerHTML = 'Failed to load data. Please try again later.';
    });

// Setup Search functionality
function setupSearch(data) {
    searchButton.addEventListener('click', () => {
        const searchTerm = document.getElementById('search-input').value.toLowerCase();
        const filteredData = data.filter(row => row.sورانی.toLowerCase().includes(searchTerm) || row.bادینی.toLowerCase().includes(searchTerm) || row.hەورامی.toLowerCase().includes(searchTerm));

        displaySearchResults(filteredData);
    });

    clearButton.addEventListener('click', () => {
        document.getElementById('search-input').value = '';
        searchResultsDiv.innerHTML = ''; // Clear the results
    });
}

// Display Search Results
function displaySearchResults(results) {
    searchResultsDiv.innerHTML = ''; // Clear any previous results

    if (results.length === 0) {
        searchResultsDiv.innerHTML = '<p>No results found.</p>';
        return;
    }

    // Render the results (for simplicity, just display all the data in the search result)
    results.forEach(row => {
        const resultDiv = document.createElement('div');
        resultDiv.innerHTML = `
            <div style="color: #c05510;">Data: ${row.sورانی}</div>
            <div style="color: #f5c265;">Data: ${row.bادینی}</div>
            <div style="color: #2e6095;">Data: ${row.hەورامی}</div>
        `;
        searchResultsDiv.appendChild(resultDiv);
    });
}
