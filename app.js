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

            const query = document.getElementById('searchInput').value.trim();
            if (query) {
                fetchSearchResults(query).then(results => {
                    if (loadingScreen) {
                        loadingScreen.style.display = 'none'; // Hide loading screen after results
                    }
                    displayResults(results, query);
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

// Display the results on the page with proper colors and formatting
function displayResults(results, query) {
    const outputContainer = document.getElementById('output');
    if (outputContainer) {
        outputContainer.innerHTML = ''; // Clear previous results

        if (results.length === 0) {
            outputContainer.innerHTML = '<p>No results found.</p>';
        } else {
            results.forEach(result => {
                const row = document.createElement('div');
                let soraniColor = '#f5c265', badiniColor = '#c05510', hawramiColor = '#2e6095';

                // Check where the query matches to set the correct color headers
                if (result.سۆرانی && result.سۆرانی.includes(query)) {
                    soraniColor = '#c05510';
                    badiniColor = '#f5c265';
                    hawramiColor = '#2e6095';
                } else if (result.بادینی && result.بادینی.includes(query)) {
                    soraniColor = '#f5c265';
                    badiniColor = '#c05510';
                    hawramiColor = '#2e6095';
                } else if (result.هەورامی && result.هەورامی.includes(query)) {
                    soraniColor = '#f5c265';
                    badiniColor = '#f5c265';
                    hawramiColor = '#2e6095';
                }

                row.innerHTML = `
                    <p style="color: ${soraniColor};"><strong>سۆرانی:</strong> ${result.سۆرانی}</p>
                    <p style="color: ${badiniColor};"><strong>بادینی:</strong> ${result.بادینی}</p>
                    <p style="color: ${hawramiColor};"><strong>هەورامی:</strong> ${result.هەورامی}</p>
                `;
                outputContainer.appendChild(row);
            });
        }
    }
}
