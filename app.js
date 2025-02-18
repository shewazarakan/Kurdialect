document.addEventListener('DOMContentLoaded', () => {
    const searchButton = document.getElementById("searchButton");
    const clearButton = document.getElementById("clearButton");
    const searchInput = document.getElementById("searchInput");
    const outputContainer = document.getElementById("output");
    const installButton = document.getElementById('installButton');
    let deferredPrompt;

    // Event listener for search button
    searchButton.addEventListener("click", () => {
        const searchTerm = searchInput.value.trim().toLowerCase();

        if (!searchTerm) {
            alert("Please enter a search term");
            return;
        }

        fetch(`https://sheets.googleapis.com/v4/spreadsheets/1nE2ohOnINWPDd2u3_ajVBXaM8lR3gQqvUSe0pE9UJH4/values/database3?key=AIzaSyAf5iWmlgcpHOOib8wClGC5hH2DoX0g3OM`)
            .then((response) => response.json())
            .then((data) => {
                const rows = data.values;
                let outputHtml = "";

                rows.forEach(row => {
                    let matchingData = null;
                    let soraniData, badiniData, hawramiData;
                    
                    // Check each column for a match to the search term
                    if (row[0].toLowerCase() === searchTerm) {
                        soraniData = row[0];
                        badiniData = row[1];
                        hawramiData = row[2];
                        matchingData = true;
                    } else if (row[1].toLowerCase() === searchTerm) {
                        soraniData = row[0];
                        badiniData = row[1];
                        hawramiData = row[2];
                        matchingData = true;
                    } else if (row[2].toLowerCase() === searchTerm) {
                        soraniData = row[0];
                        badiniData = row[1];
                        hawramiData = row[2];
                        matchingData = true;
                    }

                    // If there's a match, display the results
                    if (matchingData) {
                        outputHtml += `
                            <div class="search-result">
                                <span class="sorani">${soraniData}</span>
                                <span class="badini">${badiniData}</span>
                                <span class="hawrami">${hawramiData}</span>
                            </div>
                        `;
                    }
                });

                // Update the output container with the result
                outputContainer.innerHTML = outputHtml;
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
            });
    });

    // Event listener for clear button
    clearButton.addEventListener("click", () => {
        searchInput.value = "";
        outputContainer.innerHTML = "";
    });

    // Show the install button when the beforeinstallprompt event is triggered
    window.addEventListener('beforeinstallprompt', (event) => {
        event.preventDefault();
        deferredPrompt = event;
        installButton.style.display = 'flex'; // Show the install button
    });

    // Install button click handler
    if (installButton) {
        installButton.addEventListener('click', () => {
            if (deferredPrompt) {
                deferredPrompt.prompt();
                deferredPrompt.userChoice.then((choiceResult) => {
                    console.log(choiceResult.outcome);
                    deferredPrompt = null; // Reset the prompt after user choice
                });
            }
        });
    }
});
