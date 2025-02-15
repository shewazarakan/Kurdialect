document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const installButton = document.getElementById('installButton');
    let deferredPrompt;

    // Show the install prompt when available
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredPrompt = event;
        if (installButton) {
            installButton.style.display = 'block'; // Show the install button
        }
    });

    if (installButton) {
        installButton.addEventListener('click', () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    console.log(choiceResult.outcome);
                    deferredPrompt = null; // Reset the prompt
                });
            }
        });
    }

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

                // Determine which column the match is from
                let soraniMatch = result.سۆرانی && result.سۆرانی.toLowerCase().includes(query.toLowerCase());
                let badiniMatch = result.بادینی && result.بادینی.toLowerCase().includes(query.toLowerCase());
                let hawramiMatch = result.هەورامی && result.هەورامی.toLowerCase().includes(query.toLowerCase());

                // Only show the columns with matching data
                let resultHTML = '';

                if (soraniMatch) {
                    resultHTML += `<p style="color: ${soraniColor};"><strong>سۆرانی:</strong> ${result.سۆرانی}</p>`;
                }
                if (badiniMatch) {
                    resultHTML += `<p style="color: ${badiniColor};"><strong>بادینی:</strong> ${result.بادینی}</p>`;
                }
                if (hawramiMatch) {
                    resultHTML += `<p style="color: ${hawramiColor};"><strong>هەورامی:</strong> ${result.هەورامی}</p>`;
                }

                row.innerHTML = resultHTML;

                // Add the result row to the output container
                outputContainer.appendChild(row);
            });
        }
    }
}
