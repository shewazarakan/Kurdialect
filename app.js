document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const outputContainer = document.getElementById('output');
    
    // Fetch data from Google Sheets API
    const fetchData = async () => {
        try {
            // Show loading screen
            loadingScreen.style.display = 'flex';

            const response = await fetch('https://sheets.googleapis.com/v4/spreadsheets/1nE2ohOnINWPDd2u3_ajVBXaM8lR3gQqvUSe0pE9UJH4/values/database3?key=AIzaSyAf5iWmlgcpHOOib8wClGC5hH2DoX0g3OM');
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

                        filteredData.forEach(row => {
                            const resultDiv = document.createElement('div');
                            let resultHTML = '';

                            // Determine which column the match is in and format the result
                            if (row[0].includes(searchTerm)) {
                                resultHTML += `<p style="color: #c05510;"><strong>سۆرانی</strong>: <span style="color: #000000;">${row[0]}</span></p>`;
                                resultHTML += `<p style="color: #f5c265;"><strong>بادینی</strong>: <span style="color: #000000;">${row[1]}</span></p>`;
                                resultHTML += `<p style="color: #2e6095;"><strong>هەورامی</strong>: <span style="color: #000000;">${row[2]}</span></p>`;
                            } else if (row[1].includes(searchTerm)) {
                                resultHTML += `<p style="color: #f5c265;"><strong>بادینی</strong>: <span style="color: #000000;">${row[1]}</span></p>`;
                                resultHTML += `<p style="color: #c05510;"><strong>سۆرانی</strong>: <span style="color: #000000;">${row[0]}</span></p>`;
                                resultHTML += `<p style="color: #2e6095;"><strong>هەورامی</strong>: <span style="color: #000000;">${row[2]}</span></p>`;
                            } else if (row[2].includes(searchTerm)) {
                                resultHTML += `<p style="color: #2e6095;"><strong>هەورامی</strong>: <span style="color: #000000;">${row[2]}</span></p>`;
                                resultHTML += `<p style="color: #c05510;"><strong>سۆرانی</strong>: <span style="color: #000000;">${row[0]}</span></p>`;
                                resultHTML += `<p style="color: #f5c265;"><strong>بادینی</strong>: <span style="color: #000000;">${row[1]}</span></p>`;
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
