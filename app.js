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
                        // Only display one matching row
                        const row = filteredData[0]; // Use the first matched row

                        outputContainer.innerHTML = `
                            <table>
                                <tr>
                                    <th style="background-color: #c05510;">سۆرانی</th>
                                    <th style="background-color: #f5c265;">بادینی</th>
                                    <th style="background-color: #2e6095;">هەورامی</th>
                                </tr>
                                <tr>
                                    <td style="color: #000;">${row['سۆرانی']}</td>
                                    <td style="color: #000;">${row['بادینی']}</td>
                                    <td style="color: #000;">${row['هەورامی']}</td>
                                </tr>
                            </table>
                        `;
                    } else {
                        outputContainer.innerHTML = `<p>No results found for "${searchTerm}".</p>`;
                    }
                } else {
                    outputContainer.innerHTML = '';
                }
            });

            // Clear input
            clearButton.addEventListener('click', () => {
                document.getElementById('searchInput').value = '';
                outputContainer.innerHTML = '';
            });

        } catch (error) {
            console.error('Error fetching data:', error);
            loadingScreen.style.display = 'none'; // Hide loading screen in case of error
        }
    };

    fetchData();
});
