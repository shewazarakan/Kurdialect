document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');

    if (loadingScreen) {
        loadingScreen.style.display = 'none'; // Hide loading screen when page is loaded
    }

    if (searchButton) {
        searchButton.addEventListener('click', () => {
            if (loadingScreen) {
                loadingScreen.style.display = 'flex'; // Show loading screen
            }

            const query = document.getElementById('searchInput').value;
            if (query) {
                fetchSearchResults(query).then(results => {
                    if (loadingScreen) {
                        loadingScreen.style.display = 'none'; // Hide loading screen after results
                    }
                    displayResults(results);
                });
            }
        });
    }

    if (clearButton) {
        clearButton.addEventListener('click', () => {
            document.getElementById('searchInput').value = ''; // Clear input field
            const outputContainer = document.getElementById('output');
            if (outputContainer) {
                outputContainer.innerHTML = ''; // Clear results
            }
        });
    }
});

// Fetch the search results from your API
function fetchSearchResults(query) {
    return fetch(`https://sheetdb.io/api/v1/cg3gwaj5yfawg?search=${query}`)
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching search results:', error);
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none'; // Hide loading screen on error
            }
        });
}

// Display the results on the page
function displayResults(results) {
    const outputContainer = document.getElementById('output');
    if (outputContainer) {
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
}
