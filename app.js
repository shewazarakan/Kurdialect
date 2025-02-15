document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const installButton = document.getElementById('installButton');
    const outputContainer = document.getElementById('output');
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

    // Fetch data and perform the search
    const fetchData = async () => {
        try {
            // Show loading screen
            loadingScreen.style.display = 'flex';

            const response = await fetch('https://sheetdb.io/api/v1/cg3gwaj5yfawg');
            const data = await response.json();

            // Hide loading screen once data is fetched
            loadingScreen.style.display = 'none';

            // Handle the search functionality
            searchButton.addEventListener('click', () => {
                const searchTerm = document.getElementById('searchInput').value.trim();
                if (searchTerm) {
                    // Filter the data based on search term
                    const filteredData = data.filter(row => 
                        row['سۆرانی'].includes(searchTerm) || 
                        row['بادینی'].includes(searchTerm) || 
                        row['هەورامی'].includes(searchTerm)
                    );

                    if (filteredData.length > 0) {
                        // Clear previous results
                        outputContainer.innerHTML = '<h3><strong>SEARCH RESULTS</strong></h3>';

                        filteredData.forEach(row => {
                            const resultDiv = document.createElement('div');
                            let resultHTML = '';

                            // Find the column the data comes from
                            if (row['سۆرانی'].includes(searchTerm)) {
                                resultHTML += `<p><strong>سۆرانی</strong>: ${row['سۆرانی']}</p>`;
                                resultHTML += `<p><strong>بادینی</strong>: ${row['بادینی']}</p>`;
                                resultHTML += `<p><strong>هەورامی</strong>: ${row['هەورامی']}</p>`;
                            } else if (row['بادینی'].includes(searchTerm)) {
                                resultHTML += `<p><strong>بادینی</strong>: ${row['بادینی']}</p>`;
                                resultHTML += `<p><strong>سۆرانی</strong>: ${row['سۆرانی']}</p>`;
                                resultHTML += `<p><strong>هەورامی</strong>: ${row['هەورامی']}</p>`;
                            } else if (row['هەورامی'].includes(searchTerm)) {
                                resultHTML += `<p><strong>هەورامی</strong>: ${row['هەورامی']}</p>`;
                                resultHTML += `<p><strong>سۆرانی</strong>: ${row['سۆرانی']}</p>`;
                                resultHTML += `<p><strong>بادینی</strong>: ${row['بادینی']}</p>`;
                            }

                            resultDiv.innerHTML = resultHTML;
                            outputContainer.appendChild(resultDiv);
                        });
                    } else {
                        outputContainer.innerHTML = '<p>No results found.</p>';
                    }
                }
            });

            // Handle clear button
            clearButton.addEventListener('click', () => {
                document.getElementById('searchInput').value = '';
                outputContainer.innerHTML = '';
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();
});
