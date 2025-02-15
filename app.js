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

                // Define fixed colors for each column
                const soraniColor = '#c05510'; 
                const badiniColor = '#f5c265'; 
                const hawramiColor = '#2e6095'; 

                // Determine the column where the match is found
                let headerText = '';
                let matchedColumn = '';

                if (result.سۆرانی && result.سۆرانی.toLowerCase().includes(query.toLowerCase())) {
                    headerText = 'سۆرانی';
                    matchedColumn = result.سۆرانی;
                } else if (result.بادینی && result.بادینی.toLowerCase().includes(query.toLowerCase())) {
                    headerText = 'بادینی';
                    matchedColumn = result.بادینی;
                } else if (result.هەورامی && result.هەورامی.toLowerCase().includes(query.toLowerCase())) {
                    headerText = 'هەورامی';
                    matchedColumn = result.هەورامی;
                }

                // Always use fixed colors for the columns
                row.innerHTML = `
                    <p style="color: black;"><strong>${headerText}:</strong> ${matchedColumn}</p>
                    <p style="color: black;"><strong>سۆرانی:</strong> ${result.سۆرانی}</p>
                    <p style="color: black;"><strong>بادینی:</strong> ${result.بادینی}</p>
                    <p style="color: black;"><strong>هەورامی:</strong> ${result.هەورامی}</p>
                `;

                // Apply the colors to the columns
                row.querySelector('p:nth-child(1)').style.color = soraniColor;
                row.querySelector('p:nth-child(2)').style.color = badiniColor;
                row.querySelector('p:nth-child(3)').style.color = hawramiColor;

                // Add the header showing which column was used
                const header = document.createElement('h4');
                header.textContent = `Search Results - ${headerText}`;
                header.style.color = '#000'; // Default header color
                outputContainer.appendChild(header);
                outputContainer.appendChild(row);
            });
        }
    }
}
