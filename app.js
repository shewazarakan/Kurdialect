document.getElementById("searchButton").addEventListener("click", searchData);
document.getElementById("clearButton").addEventListener("click", clearSearch);

function searchData() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    if (searchTerm) {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/1nE2ohOnINWPDd2u3_ajVBXaM8lR3gQqvUSe0pE9UJH4/values/database3!A1:C1000?key=AIzaSyAf5iWmlgcpHOOib8wClGC5hH2DoX0g3OM`)
            .then(response => {
                if (!response.ok) {
                    throw new Error("API request failed with status " + response.status);
                }
                return response.json();
            })
            .then(data => {
                const rows = data.values;
                const results = rows.filter(row => 
                    row.some(cell => cell.toLowerCase().includes(searchTerm))
                );

                const outputContainer = document.getElementById("output");
                outputContainer.innerHTML = ""; // Clear previous results
                
                if (results.length > 0) {
                    results.forEach(row => {
                        const resultRow = document.createElement("div");
                        resultRow.style.marginBottom = "10px";

                        row.forEach((cell, index) => {
                            const cellElement = document.createElement("div");
                            cellElement.textContent = cell;
                            cellElement.style.color = "#000000"; // Data color (black)
                            if (index === 0) {
                                cellElement.style.backgroundColor = "#c05510"; // سۆرانی color
                            } else if (index === 1) {
                                cellElement.style.backgroundColor = "#f5c265"; // بادینی color
                            } else if (index === 2) {
                                cellElement.style.backgroundColor = "#2e6095"; // هەورامی color
                            }
                            resultRow.appendChild(cellElement);
                        });

                        outputContainer.appendChild(resultRow);
                    });
                } else {
                    outputContainer.innerHTML = "<p>No results found.</p>";
                }
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                const outputContainer = document.getElementById("output");
                outputContainer.innerHTML = "<p>There was an error fetching data. Please try again later.</p>";
            });
    }
}

function clearSearch() {
    document.getElementById("searchInput").value = "";
    document.getElementById("output").innerHTML = "";
}
