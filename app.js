document.addEventListener("DOMContentLoaded", function () {
    const API_URL = "https://sheetdb.io/api/v1/cg3gwaj5yfawg";
    
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const clearButton = document.getElementById("clearButton");
    const outputContainer = document.getElementById("output");
    const loadingScreen = document.getElementById("loadingScreen");

    let sheetData = [];

    // Fetch Data from Google Sheets
    function fetchData() {
        loadingScreen.style.display = "flex";
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                sheetData = data;
                loadingScreen.style.display = "none";
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                outputContainer.innerHTML = `<p style="color: red;">Error loading data. Please try again.</p>`;
                loadingScreen.style.display = "none";
            });
    }

    // Call fetchData when the page loads
    fetchData();

    // Function to search data
    function searchData() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        if (!searchTerm) {
            outputContainer.innerHTML = "<p>Please enter a search term.</p>";
            return;
        }

        const results = sheetData.filter(row =>
            Object.values(row).some(value => value.toLowerCase().includes(searchTerm))
        );

        if (results.length === 0) {
            outputContainer.innerHTML = "<p>No results found.</p>";
            return;
        }

        // Display Results
        outputContainer.innerHTML = `<h3 style="font-size: 1.5em;">Search Results:</h3>`;
        results.forEach(row => {
            let searchColumn = Object.keys(row).find(key => row[key].toLowerCase().includes(searchTerm));
            let columnsHTML = Object.keys(row).map(key => {
                let headerColor = key === searchColumn ? "#012169" : "#f5c400";
                return `<p><strong style="color: ${headerColor};">${key}:</strong> <span style="color: black;">${row[key]}</span></p>`;
            }).join("");

            outputContainer.innerHTML += `
                <div style="padding: 15px; border: 1px solid #ccc; margin-bottom: 10px; background-color: #fff; border-radius: 8px;">
                    ${columnsHTML}
                </div>`;
        });
    }

    // Event Listeners
    searchButton.addEventListener("click", searchData);
    clearButton.addEventListener("click", () => {
        searchInput.value = "";
        outputContainer.innerHTML = "";
    });
});
