document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const outputContainer = document.getElementById('output');

    // Fetch data from the local file (data.json)
    const fetchData = async () => {
        try {
            // Show loading screen
            loadingScreen.style.display = 'flex';

            const response = await fetch('data.json'); // Ensure this path is correct
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

                            // Determine which column the match is in and format the result
                            if (row[0].includes(searchTerm)) {
                                resultHTML += `<p style="color: #c05510;"><strong>سۆرانی</strong>: ${row[0]}</p>`;
                                resultHTML += `<p style="color: #f5c265;"><strong>بادینی</strong>: ${row[1]}</p>`;
                                resultHTML += `<p style="color: #2e6095;"><strong>هەورامی</strong>: ${row[2]}</p>`;
                            } else if (row[1].includes(searchTerm)) {
                                resultHTML += `<p style="color: #f5c265;"><strong>بادینی</strong>: ${row[1]}</p>`;
                                resultHTML += `<p style="color: #c05510;"><strong>سۆرانی</strong>: ${row[0]}</p>`;
                                resultHTML += `<p style="color: #2e6095;"><strong>هەورامی</strong>: ${row[2]}</p>`;
                            } else if (row[2].includes(searchTerm)) {
                                resultHTML += `<p style="color: #2e6095;"><strong>هەورامی</strong>: ${row[2]}</p>`;
                                resultHTML += `<p style="color: #c05510;"><strong>سۆرانی</strong>: ${row[0]}</p>`;
                                resultHTML += `<p style="color: #f5c265;"><strong>بادینی</strong>: ${row[1]}</p>`;
                            }

                            resultDiv.innerHTML = resultHTML;
                            resultDiv.style.border = '1px solid #ccc'; // Border for the result
                            resultDiv.style.padding = '10px'; // Padding for better readability
                            resultDiv.style.marginBottom = '10px'; // Margin between results
                            resultDiv.style.backgroundColor = '#ffffff'; // White background for results
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
            loadingScreen.style.display = 'none'; // Hide loading screen
            outputContainer.innerHTML = '<p>Error loading data. Please try again later.</p>';
        }
    };

    fetchData();

    // Floating button logic (Install button)
    const floatingButton = document.createElement('button');
    floatingButton.innerHTML = '+'; // Plus sign inside the button
    floatingButton.id = 'floatingButton';
    document.body.appendChild(floatingButton);

    // Apply styles to the floating button (install button)
    const buttonStyles = `
        #floatingButton {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 50%;
            background-color: #c05510; /* Same color as Sorani column */
            color: white;
            font-size: 30px;
            border: none;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
            cursor: pointer;
            z-index: 1000;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.type = 'text/css';
    styleSheet.innerText = buttonStyles;
    document.head.appendChild(styleSheet);

    // Apply styles to the search and clear buttons (square shape)
    const buttonSquareStyles = `
        #searchButton, #clearButton {
            width: 50px;
            height: 50px;
            border-radius: 5px;
            font-size: 16px;
            cursor: pointer;
        }

        #searchButton {
            background-color: #2e6095; /* Search button color */
            color: white;
            border: none;
        }

        #clearButton {
            background-color: #f5c265; /* Clear button color */
            color: black;
            border: none;
        }
    `;
    
    const styleButtonSheet = document.createElement('style');
    styleButtonSheet.type = 'text/css';
    styleButtonSheet.innerText = buttonSquareStyles;
    document.head.appendChild(styleButtonSheet);

    // Set page background color to pure white
    const bodyStyle = `
        body {
            background-color: #ffffff; /* Pure white background */
            margin: 0;
            font-family: Arial, sans-serif;
        }
    `;

    const bodyStyleSheet = document.createElement('style');
    bodyStyleSheet.type = 'text/css';
    bodyStyleSheet.innerText = bodyStyle;
    document.head.appendChild(bodyStyleSheet);
});
