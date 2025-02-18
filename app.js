document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const outputContainer = document.getElementById('output');
    const installButton = document.getElementById('installButton');  // Install button (visible)
    let deferredPrompt;

    // Fetch the data from the local data.json
    const fetchData = async () => {
        try {
            // Show loading screen
            loadingScreen.style.display = 'flex';

            const response = await fetch('data.json');
            const data = await response.json();

            // Hide loading screen once data is fetched
            loadingScreen.style.display = 'none';

            // Handle the search functionality
            searchButton.addEventListener('click', () => {
                const searchTerm = document.getElementById('searchInput').value.trim();
                if (searchTerm) {
                    // Filter the data based on search term
                    const filteredData = data.values.filter(row => 
                        row[0].includes(searchTerm) || 
                        row[1].includes(searchTerm) || 
                        row[2].includes(searchTerm)
                    );

                    if (filteredData.length > 0) {
                        // Clear previous results
                        outputContainer.innerHTML = '';

                        // Add search result heading
                        const resultHeading = document.createElement('h3');
                        resultHeading.innerHTML = '<strong>SEARCH RESULTS</strong>';
                        outputContainer.appendChild(resultHeading);

                        filteredData.forEach(row => {
                            const resultDiv = document.createElement('div');
                            let resultHTML = '';

                            // Format the result based on which column the search term is in
                            if (row[0].includes(searchTerm)) {
                                resultHTML += `<p style="color: #c05510;"><strong>سۆرانی:</strong> ${row[0]}</p>`;
                                resultHTML += `<p style="color: #f5c265;"><strong>بادینی:</strong> ${row[1]}</p>`;
                                resultHTML += `<p style="color: #2e6095;"><strong>هەورامی:</strong> ${row[2]}</p>`;
                            } else if (row[1].includes(searchTerm)) {
                                resultHTML += `<p style="color: #f5c265;"><strong>بادینی:</strong> ${row[1]}</p>`;
                                resultHTML += `<p style="color: #c05510;"><strong>سۆرانی:</strong> ${row[0]}</p>`;
                                resultHTML += `<p style="color: #2e6095;"><strong>هەورامی:</strong> ${row[2]}</p>`;
                            } else if (row[2].includes(searchTerm)) {
                                resultHTML += `<p style="color: #2e6095;"><strong>هەورامی:</strong> ${row[2]}</p>`;
                                resultHTML += `<p style="color: #c05510;"><strong>سۆرانی:</strong> ${row[0]}</p>`;
                                resultHTML += `<p style="color: #f5c265;"><strong>بادینی:</strong> ${row[1]}</p>`;
                            }

                            resultDiv.innerHTML = resultHTML;
                            resultDiv.style.border = '1px solid #ccc';
                            resultDiv.style.padding = '10px';
                            resultDiv.style.marginBottom = '10px';
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

    // Install button handling (if needed)
    if (installButton) {
        installButton.style.display = 'block';  // Ensure it is visible
        installButton.addEventListener('click', () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    if (choiceResult.outcome === 'accepted') {
                        console.log('User accepted the A2HS prompt');
                    } else {
                        console.log('User dismissed the A2HS prompt');
                    }
                });
            }
        });
    }

    // Listen for the beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
        e.preventDefault();
        deferredPrompt = e;
        if (installButton) {
            installButton.style.display = 'block'; // Show the install button
        }
    });

});
