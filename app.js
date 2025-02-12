// Function to fetch data from SheetDB and perform the search
async function searchData() {
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) {
        console.error('Search input element not found');
        return;
    }

    const searchTerm = searchInput.value.trim();
    if (!searchTerm) return;

    const apiUrl = 'https://sheetdb.io/api/v1/cg3gwaj5yfawg/search?limit=1&casesensitive=false&sheet=database3&search=' + encodeURIComponent(searchTerm);

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.length === 0) {
            displayNoResults();
        } else {
            displayResults(data[0], searchTerm);
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to display search results
function displayResults(row, searchTerm) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) {
        console.error('Search results element not found');
        return;
    }

    searchResults.innerHTML = '<h2>Search Results</h2>';

    const columns = ['سۆرانی', 'هەورامی', 'بادینی'];
    columns.forEach((col) => {
        if (row[col]) {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result-item');

            const columnName = document.createElement('span');
            columnName.classList.add('column-name');
            columnName.textContent = `${col}:`;

            const columnData = document.createElement('span');
            columnData.classList.add('column-data');
            columnData.textContent = row[col];

            resultDiv.appendChild(columnName);
            resultDiv.appendChild(columnData);
            searchResults.appendChild(resultDiv);
        }
    });
}

// Function to display a message when no results are found
function displayNoResults() {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) {
        console.error('Search results element not found');
        return;
    }

    searchResults.innerHTML = '<h2>No results found</h2>';
}

// Function to clear search results
function clearData() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.value = '';
    }

    const searchResults = document.getElementById('searchResults');
    if (searchResults) {
        searchResults.innerHTML = '';
    }
}
