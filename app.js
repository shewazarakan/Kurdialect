document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const outputContainer = document.getElementById('output');

    // Fetch data and perform the search
    const fetchData = async () => {
        try {
            // Show loading screen
            loadingScreen.style.display = 'flex';

            const response = await fetch('data.json');  // Change to your data source
            const jsonData = await response.json();
            const data = jsonData.values.slice(1); // Remove headers

            // Hide loading screen once data is fetched
            loadingScreen.style.display = 'none';

            // Handle the search functionality
            searchButton.addEventListener('click', () => {
                const searchTerm = document.getElementById('searchInput').value.trim();
                if (searchTerm) {
                    // Filter the data based on the search term
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
                            resultDiv.classList.add('search-result');

                            const sorani = row[0];
                            const badini = row[1];
                            const hawrami = row[2];
                            const image = row[3]; // Assuming image URL is in the 4th column

                            // Create divs for text and image
                            const resultTextDiv = document.createElement('div');
                            resultTextDiv.classList.add('result-text');

                            let resultHTML = '';

                            // Dynamically display data based on the search term
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

                            // Create image div
                            const resultImageDiv = document.createElement('div');
                            resultImageDiv.classList.add('result-image');
                            resultImageDiv.innerHTML = `<img src="${image}" alt="Image" />`;

                            // Append text and image divs to the result div
                            resultDiv.appendChild(resultTextDiv);
                            resultDiv.appendChild(resultImageDiv);

                            // Append result div to output container
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
