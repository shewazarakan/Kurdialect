document.getElementById("searchButton").addEventListener("click", searchData);
document.getElementById("clearButton").addEventListener("click", clearSearch);

function searchData() {
    let query = document.getElementById("searchBox").value.trim().toLowerCase();
    if (!query) return;

    fetch("https://sheetdb.io/api/v1/cg3gwaj5yfawg")
        .then(response => response.json())
        .then(data => {
            let filteredData = data.filter(row =>
                row["سۆرانی"].toLowerCase().includes(query) ||
                row["بادینی"].toLowerCase().includes(query) ||
                row["هەورامی"].toLowerCase().includes(query)
            );

            let resultsContainer = document.getElementById("resultsContainer");
            resultsContainer.innerHTML = "";

            if (filteredData.length > 0) {
                filteredData.forEach(row => {
                    let resultRow = document.createElement("div");
                    resultRow.classList.add("result-row");
                    resultRow.innerHTML = `
                        <span class="input-column">${row["سۆرانی"]}</span>
                        <span class="output-column">${row["بادینی"]}</span>
                        <span class="output-column">${row["هەورامی"]}</span>
                    `;
                    resultsContainer.appendChild(resultRow);
                });

                document.getElementById("searchResults").style.display = "block";
            } else {
                resultsContainer.innerHTML = "<p>No results found.</p>";
            }
        })
        .catch(error => console.error("Error fetching data:", error));
}

function clearSearch() {
    document.getElementById("searchBox").value = "";
    document.getElementById("searchResults").style.display = "none";
}
