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
                fetchSearchResults().then(results => {
                    if (loadingScreen) {
                        loadingScreen.style.display = 'none'; // Hide loading screen after results
                    }
                    const filteredResults = filterResults(results, query); // Manually filter results
                    displayResults(filteredResults, query);
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

// Fetch all the data from the API (without search filtering)
function fetchSearchResults() {
    return fetch("https://sheetdb.io/api/v1/cg3gwaj5yfawg")
        .then(response => response.json())
        .catch(error => {
            console.error('Error fetching search results:', error);
            const loadingScreen = document.getElementById('loadingScreen');
            if (loadingScreen) {
                loadingScreen.style.display = 'none'; // Hide loading screen on error
            }
        });
}

// Filter the results based on the query
function filterResults(results, query) {
    return results.filter(result => {
        // Check if any of the columns contain the search query (case insensitive)
        return (result.سۆرانی && result.سۆرانی.toLowerCase().includes(query.toLowerCase())) ||
               (result.بادینی && result.بادینی.toLowerCase().includes(query.toLowerCase())) ||
               (result.هەورامی && result.هەورامی.toLowerCase().includes(query.toLowerCase()));
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
                if (result.سۆرانی && result.سۆرانی.toLowerCase().includes(query.toLowerCase())) {
                    soraniColor = '#c05510'; // Sorani matched, change its header color
                    badiniColor = '#f5c265'; // Other columns have the opposite color
                    hawramiColor = '#2e6095';
                } else if (result.بادینی && result.بادینی.toLowerCase().includes(query.toLowerCase())) {
                    soraniColor = '#f5c265';
                    badiniColor = '#c05510'; // Badini matched, change its header color
                    hawramiColor = '#2e6095';
                } else if (result.هەورامی && result.هەورامی.toLowerCase().includes(query.toLowerCase())) {
                    soraniColor = '#f5c265';
                    badiniColor = '#f5c265';
                    hawramiColor = '#2e6095'; // Hawrami matched, change its header color
                }

                // Display the results with black text, and the colored headers for matching columns
                row.innerHTML = `
                    <p style="color: black;"><strong>سۆرانی:</strong> ${result.سۆرانی}</p>
                    <p style="color: black;"><strong>بادینی:</strong> ${result.بادینی}</p>
                    <p style="color: black;"><strong>هەورامی:</strong> ${result.هەورامی}</p>
                `;
                // Apply the colors to the headers based on matching term
                row.querySelector('p:nth-child(1)').style.color = soraniColor;
                row.querySelector('p:nth-child(2)').style.color = badiniColor;
                row.querySelector('p:nth-child(3)').style.color = hawramiColor;

                outputContainer.appendChild(row);
            });
        }
    }
}
