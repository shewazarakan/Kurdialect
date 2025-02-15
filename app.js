window.onload = () => {
    const loadingScreen = document.getElementById('loadingScreen');
    loadingScreen.style.display = 'none'; // Hide the loading screen when the page loads
};

// Show the loading screen when search starts
document.getElementById('searchButton').addEventListener('click', () => {
    document.getElementById('loadingScreen').style.display = 'flex'; // Show loading screen

    const query = document.getElementById('searchInput').value;
    if (query) {
        fetchSearchResults(query).then(results => {
            document.getElementById('loadingScreen').style.display = 'none'; // Hide loading screen
            displayResults(results);
        });
    }
});

// Fetch the search results from your API
function fetchSearchResults(query) {
    return fetch(`https://sheetdb.io/api/v1/cg3gwaj5yfawg?search=${query}`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching search results:', error);
            document.getElementById('loadingScreen').style.display = 'none'; // Hide loading screen on error
        });
}

// Display the results on the page
function displayResults(results) {
    const outputContainer = document.getElementById('output');
    outputContainer.innerHTML = ''; // Clear previous results

    if (results.length === 0) {
        outputContainer.innerHTML = '<p>No results found.</p>';
    } else {
        results.forEach(result => {
            const row = document.createElement('div');
            row.innerHTML = `
                <p><strong>سۆرانی:</strong> ${result.سۆرانی}</p>
                <p><strong>بادینی:</strong> ${result.بادینی}</p>
                <p><strong>هەورامی:</strong> ${result.هەورامی}</p>
            `;
            outputContainer.appendChild(row);
        });
    }
}
