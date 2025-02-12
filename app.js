document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const clearButton = document.getElementById("clearButton");
    const output = document.getElementById("output");
    const installButton = document.getElementById("installButton");
    let deferredPrompt;

    // Fetch data from SheetDB API
    async function fetchData() {
        try {
            const response = await fetch("https://sheetdb.io/api/v1/cg3gwaj5yfawg");
            const data = await response.json();
            return data;
        } catch (error) {
            console.error("Error fetching data:", error);
            return [];
        }
    }

    // Search function
    async function searchData() {
        const query = searchInput.value.trim();
        if (!query) return;

        const data = await fetchData();
        const filteredResults = data.filter(row =>
            Object.values(row).some(value => value.toLowerCase().includes(query.toLowerCase()))
        );

        // Display results
        output.innerHTML = filteredResults.length
            ? filteredResults.map(row => `<p>${row["سۆرانی"]} - ${row["بادینی"]} - ${row["هەورامی"]}</p>`).join("")
            : "<p>No results found</p>";
    }

    // Clear function
    function clearSearch() {
        searchInput.value = "";
        output.innerHTML = "";
    }

    // Install PWA
    window.addEventListener("beforeinstallprompt", (event) => {
        event.preventDefault();
        deferredPrompt = event;
        installButton.style.display = "block";
    });

    installButton.addEventListener("click", () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(choice => {
                if (choice.outcome === "accepted") {
                    installButton.style.display = "none";
                }
                deferredPrompt = null;
            });
        }
    });

    // Event listeners
    searchButton.addEventListener("click", searchData);
    clearButton.addEventListener("click", clearSearch);
});
