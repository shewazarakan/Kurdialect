document.addEventListener("DOMContentLoaded", function () {
    let searchButton = document.getElementById("searchButton");
    let clearButton = document.getElementById("clearButton");
    let searchInput = document.getElementById("searchInput");
    let output = document.getElementById("output");
    let loadingScreen = document.getElementById("loadingScreen");

    async function fetchData() {
        loadingScreen.style.display = "flex";
        try {
            let response = await fetch("https://sheetdb.io/api/v1/cg3gwaj5yfawg");
            let data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            output.innerHTML = "Error fetching data.";
            return [];
        } finally {
            loadingScreen.style.display = "none";
        }
    }

    async function searchData() {
        let searchTerm = searchInput.value.trim().toLowerCase();
        if (!searchTerm) {
            output.innerHTML = "Please enter a search term.";
            return;
        }

        let data = await fetchData();
        let results = data.filter(row =>
            row["سۆرانی"]?.toLowerCase().includes(searchTerm) ||
            row["بادینی"]?.toLowerCase().includes(searchTerm) ||
            row["هەورامی"]?.toLowerCase().includes(searchTerm)
        );

        if (results.length === 0) {
            output.innerHTML = "No results found.";
            return;
        }

        let outputHTML = "";
        results.forEach(row => {
            let searchInSorani = row["سۆرانی"]?.toLowerCase().includes(searchTerm);
            let searchInBadini = row["بادینی"]?.toLowerCase().includes(searchTerm);
            let searchInHawrami = row["هەورامی"]?.toLowerCase().includes(searchTerm);

            let soraniColor = searchInSorani ? "#012169" : "#f5c400";
            let badiniColor = searchInBadini ? "#012169" : "#f5c400";
            let hawramiColor = searchInHawrami ? "#012169" : "#f5c400";

            outputHTML += `
                <div class="result">
                    <strong style="color: ${soraniColor};">سۆرانی:</strong> <span style="color: #000;">${row["سۆرانی"] || "N/A"}</span><br>
                    <strong style="color: ${badiniColor};">بادینی:</strong> <span style="color: #000;">${row["بادینی"] || "N/A"}</span><br>
                    <strong style="color: ${hawramiColor};">هەورامی:</strong> <span style="color: #000;">${row["هەورامی"] || "N/A"}</span>
                </div><br>
            `;
        });

        output.innerHTML = outputHTML;
    }

    searchButton.addEventListener("click", searchData);
    clearButton.addEventListener("click", function () {
        searchInput.value = "";
        output.innerHTML = "";
    });
});
