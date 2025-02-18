document.addEventListener("DOMContentLoaded", function() {
    const searchButton = document.getElementById('searchButton');
    const clearButton = document.getElementById('clearButton');
    const searchInput = document.getElementById('searchInput');
    const searchResultsContainer = document.getElementById('searchResults');
    
    // Hide the search results initially
    searchResultsContainer.style.display = 'none';  // Ensure it’s hidden initially

    searchButton.addEventListener('click', function() {
        const searchQuery = searchInput.value.trim();

        // Check if there's a search term
        if (!searchQuery) {
            alert("Please enter a search term");
            return;
        }

        // Fetch data from Google Sheets API (Replace the URL with actual endpoint)
        fetchData(searchQuery);
    });

    clearButton.addEventListener('click', function() {
        searchInput.value = '';
        searchResultsContainer.style.display = 'none'; // Hide results when cleared
    });

    function fetchData(query) {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/1nE2ohOnINWPDd2u3_ajVBXaM8lR3gQqvUSe0pE9UJH4/values:batchGet?ranges=Sheet1!A1:C1000&key=AIzaSyAf5iWmlgcpHOOib8wClGC5hH2DoX0g3OM`)
            .then(response => response.json())
            .then(data => {
                const rows = data.valueRanges[0].values;
                const results = [];
                let found = false;

                rows.forEach(row => {
                    if (row[0].toLowerCase().includes(query.toLowerCase())) {
                        results.push(row);
                        found = true;
                    }
                });

                if (found) {
                    displayResults(results);
                } else {
                    searchResultsContainer.innerHTML = "No results found.";
                    searchResultsContainer.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                searchResultsContainer.innerHTML = "Error fetching data.";
                searchResultsContainer.style.display = 'block';
            });
    }

    function displayResults(results) {
        let output = '';
        results.forEach(result => {
            output += `
                <div class="result-row">
                    <span class="column-sorani">${result[0]}</span>: 
                    <span class="column-badini">${result[1]}</span>, 
                    <span class="column-hawarami">${result[2]}</span>
                </div>
            `;
        });
        searchResultsContainer.innerHTML = output;
        searchResultsContainer.style.display = 'block'; // Show the results
    }
});
