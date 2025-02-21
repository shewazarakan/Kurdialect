document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const outputContainer = document.getElementById('output');
    const installButton = document.getElementById('installButton');
    let deferredPrompt;

    // Fetch data and perform the search
    const fetchData = async () => {
        try {
            loadingScreen.style.display = 'flex'; // Show loading screen

            const response = await fetch('data.json');  // Change to your data source
            const jsonData = await response.json();
            const data = jsonData.values.slice(1); // Remove headers

            loadingScreen.style.display = 'none'; // Hide loading screen

            searchButton.addEventListener('click', () => {
                const searchTerm = document.getElementById('searchInput').value.trim();
                if (searchTerm) {
                    const filteredData = data.filter(row =>
                        row.some(cell => cell.includes(searchTerm))
                    );

                    if (filteredData.length > 0) {
                        outputContainer.innerHTML = '';
                        const resultHeading = document.createElement('h3');
                        resultHeading.innerHTML = '<strong>SEARCH RESULTS</strong>';
                        outputContainer.appendChild(resultHeading);

                        filteredData.forEach(row => {
                            const resultDiv = document.createElement('div');
                            resultDiv.classList.add('search-result');
                            const sorani = row[0];
                            const badini = row[1];
                            const hawrami = row[2];
                            const image = row[3]; // Assuming image URL is in the 4th column

                            const resultTextDiv = document.createElement('div');
                            resultTextDiv.classList.add('result-text');
                            let resultHTML = '';

                            if (sorani.includes(searchTerm)) {
                                resultHTML += `
                                    <p><strong style="color: #c05510;">سۆرانی</strong>: ${sorani}</p>
                                    <p><strong style="color: #2e6095;">هەورامی</strong>: ${hawrami}</p>
                                    <p><strong style="color: #f5c265;">بادینی</strong>: ${badini}</p>
                                `;
                            } else if (badini.includes(searchTerm)) {
                                resultHTML += `
                                    <p><strong style="color: #f5c265;">بادینی</strong>: ${badini}</p>
                                    <p><strong style="color: #c05510;">سۆرانی</strong>: ${sorani}</p>
                                    <p><strong style="color: #2e6095;">هەورامی</strong>: ${hawrami}</p>
                                `;
                            } else if (hawrami.includes(searchTerm)) {
                                resultHTML += `
                                    <p><strong style="color: #2e6095;">هەورامی</strong>: ${hawrami}</p>
                                    <p><strong style="color: #c05510;">سۆرانی</strong>: ${sorani}</p>
                                    <p><strong style="color: #f5c265;">بادینی</strong>: ${badini}</p>
                                `;
                            }

                            resultTextDiv.innerHTML = resultHTML;

                            const resultImageDiv = document.createElement('div');
                            resultImageDiv.classList.add('result-image');
                            resultImageDiv.innerHTML = `<img src="${image}" alt="Image" />`;

                            resultDiv.appendChild(resultTextDiv);
                            resultDiv.appendChild(resultImageDiv);
                            outputContainer.appendChild(resultDiv);
                        });
                    } else {
                        outputContainer.innerHTML = '<p>No results found.</p>';
                    }
                }
            });

            clearButton.addEventListener('click', () => {
                document.getElementById('searchInput').value = '';
                outputContainer.innerHTML = '';
            });

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    fetchData();

    // Install Button Logic
    installButton.style.display = 'flex';  // Always show the install button before installation

    installButton.addEventListener('click', () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then((choiceResult) => {
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
                installButton.style.display = 'none'; // Hide button after installation
            });
        }
    });

    window.addEventListener('appinstalled', () => {
        console.log('App installed');
        installButton.style.display = 'none';  // Hide install button once installed
    });

    window.addEventListener('beforeinstallprompt', (event) => {
        deferredPrompt = event; // Save the event for later
        installButton.style.display = 'flex';  // Show install button
    });
});
