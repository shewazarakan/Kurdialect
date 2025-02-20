document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const installButton = document.getElementById('installButton');
    const outputContainer = document.getElementById('output');

    // Hide install button if app is installed
    if (window.matchMedia('(display-mode: standalone)').matches) {
        installButton.style.display = 'none';
    }

    if (installButton) {
        installButton.addEventListener('click', () => {
            // Redirect to install PWA manually
            alert('To install, click the browser’s install button or add to home screen.');
        });
    }

    // Fetch data and perform the search
    const fetchData = async () => {
        try {
            // Show loading screen
            loadingScreen.style.display = 'flex';

            const response = await fetch('data.json');
            const jsonData = await response.json();
            const data = jsonData.values.slice(1); // Remove headers

            // Hide loading screen once data is fetched
            loadingScreen.style.display = 'none';

            // Handle the search functionality
            searchButton.addEventListener('click', () => {
                const searchTerm = document.getElementById('searchInput').value.trim();
                if (searchTerm) {
                    // Filter the data based on search term
                    const filteredData = data.filter(row =>
                        row.some(cell => cell.includes(searchTerm))
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
                            resultDiv.classList.add('result-box'); // Add class for styling

                            let resultHTML = '';
                            const sorani = row[0];
                            const badini = row[1];
                            const hawrami = row[2];
                            const imageUrl = "path_to_image"; // Adjust image URL accordingly

                            if (sorani.includes(searchTerm)) {
                                resultHTML += `<p><strong style="color: #c05510;">سۆرانی</strong>: <span style="color: black;">${sorani}</span></p>`;
                                resultHTML += `<p><strong style="color: #f5c265;">بادینی</strong>: <span style="color: black;">${badini}</span></p>`;
                                resultHTML += `<p><strong style="color: #2e6095;">هەورامی</strong>: <span style="color: black;">${hawrami}</span></p>`;
                            } else if (badini.includes(searchTerm)) {
                                resultHTML += `<p><strong style="color: #f5c265;">بادینی</strong>: <span style="color: black;">${badini}</span></p>`;
                                resultHTML += `<p><strong style="color: #c05510;">سۆرانی</strong>: <span style="color: black;">${sorani}</span></p>`;
                                resultHTML += `<p><strong style="color: #2e6095;">هەورامی</strong>: <span style="color: black;">${hawrami}</span></p>`;
                            } else if (hawrami.includes(searchTerm)) {
                                resultHTML += `<p><strong style="color: #2e6095;">هەورامی</strong>: <span style="color: black;">${hawrami}</span></p>`;
                                resultHTML += `<p><strong style="color: #c05510;">سۆرانی</strong>: <span style="color: black;">${sorani}</span></p>`;
                                resultHTML += `<p><strong style="color: #f5c265;">بادینی</strong>: <span style="color: black;">${badini}</span></p>`;
                            }

                            resultHTML += `<img src="${imageUrl}" alt="Image" class="result-image">`;

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
