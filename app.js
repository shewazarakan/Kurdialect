function searchData() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (!searchTerm) return;

    // Simulated data retrieval
    const data = {
        sorani: 'دانا٢',
        badini: 'داتا٣',
        hawrami: 'داتا'
    };

    // Determine which column is the input column
    let inputColumn = '';
    for (const [key, value] of Object.entries(data)) {
        if (value === searchTerm) {
            inputColumn = key;
            break;
        }
    }

    // Update the results and apply styles
    const searchResults = document.getElementById('searchResults');
    searchResults.innerHTML = '<h2>Search Results</h2>'; // Clear previous results and add header

    ['sorani', 'badini', 'hawrami'].forEach(column => {
        const resultText = data[column] || 'No data';
        const resultDiv = document.createElement('div');
        const columnNameSpan = document.createElement('span');
        columnNameSpan.classList.add('column-name');
        columnNameSpan.textContent = `${getColumnDisplayName(column)}: `;
        const resultSpan = document.createElement('span');
        resultSpan.textContent = resultText;

        if (column === inputColumn) {
            columnNameSpan.classList.add('input-column');
        } else {
            columnNameSpan.classList.add('output-column');
        }

        resultDiv.appendChild(columnNameSpan);
        resultDiv.appendChild(resultSpan);
        searchResults.appendChild(resultDiv);
    });
}

function clearData() {
    document.getElementById('searchInput').value = '';
    document.getElementById('searchResults').innerHTML = '';
}

function getColumnDisplayName(column) {
    const columnNames = {
        sorani: 'سۆرانی',
        badini: 'بادینی',
        hawrami: 'هەورامی'
    };
    return columnNames[column] || column;
}
