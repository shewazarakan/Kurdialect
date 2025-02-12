// Function to fetch data from SheetDB and perform the search
async function searchData() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (!searchTerm) return;

    const apiUrl = 'https://sheetdb.io/api/v1/YOUR_API_ID/search?limit=1&casesensitive=false&sheet=Sheet1&search=' + encodeURIComponent(searchTerm);

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
    searchResults.innerHTML = '<h2>Search Results</h2>';

    const columns = ['sorani', 'badini', 'hawrami'];
    columns.forEach((col) => {
        if (row[col]) {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result-item');

            const columnName = document.createElement('span');
            columnName.classList.add('column-name');
            columnName.textContent = `${col.charAt(0).toUpperCase() + col.slice(1)}:`;

            const columnData = document.createElement('span');
            columnData.textContent = row[col];

            if (row[col].toLowerCase() === searchTerm.toLowerCase()) {
                columnName.classList.add('input-column');
            } else {
                columnName.classList.add('output-column');
            }

            resultDiv.appendChild(columnName);
            resultDiv.appendChild(columnData);
            searchResults.appendChild(resultDiv);
        }
    });
}

// Function to display a message when no results are found
function displayNoResults() {
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '<h2>Search Results</h2>';
    const noResultDiv = document.createElement('div');
    noResultDiv.classList.add('no-result');
    noResultDiv.textContent = 'No matching data found.';
    searchResults.appendChild(noResultDiv);
}

// Function to clear search input and results
function clearData() {
    document.getElementById('searchInput').value = '';
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '';
}
