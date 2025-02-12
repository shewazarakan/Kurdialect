document.addEventListener("DOMContentLoaded", function () {
    let sheetURL = "https://sheetdb.io/api/v1/cg3gwaj5yfawg";
    let searchButton = document.getElementById("searchButton");
    let clearButton = document.getElementById("clearButton");
    let searchInput = document.getElementById("searchInput");
    let outputContainer = document.getElementById("output");
    let inputDataContainer = document.getElementById("inputDataContainer");
    let loadingScreen = document.getElementById("loadingScreen");

    function fetchData() {
        loadingScreen.style.display = "flex";
        fetch(sheetURL)
            .then(response => response.json())
            .then(data => {
                window.data = data; // Store data globally
                loadingScreen.style.display = "none";
            })
            .catch(error => {
                console.error("Error fetching data:", error);
                loadingScreen.style.display = "none";
            });
    }

    function searchData() {
        let searchTerm = searchInput.value.toLowerCase().trim();
        if (!searchTerm) {
            outputContainer.innerHTML = "Please enter a search term.";
            return;
        }

        let results = window.data.filter(record =>
            Object.values(record).some(value =>
                value.toLowerCase().includes(searchTerm)
            )
        );

        if (results.length === 0) {
            outputContainer.innerHTML = "No results found.";
        } else {
            displayData(results);
        }
    }

    function displayData(data) {
        outputContainer.innerHTML = data.map(record => `
            <div class="result-box">
                <strong class="output-title">سۆرانی:</strong> ${record["سۆرانی"]} <br>
                <strong class="output-title">بادینی:</strong> ${record["بادینی"]} <br>
                <strong class="output-title">هەورامی:</strong> ${record["هەورامی"]}
            </div>
        `).join("");
    }

    searchButton.addEventListener("click", searchData);
    clearButton.addEventListener("click", () => {
        searchInput.value = "";
        outputContainer.innerHTML = "";
    });

    fetchData();

    // Install Button
    let installButton = document.getElementById("installButton");
    let deferredPrompt;

    window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        deferredPrompt = e;
        installButton.style.display = "block";
    });

    installButton.addEventListener("click", () => {
        if (deferredPrompt) {
            deferredPrompt.prompt();
            deferredPrompt.userChoice.then(choice => {
                if (choice.outcome === "accepted") {
                    installButton.style.display = "none";
                }
            });
        }
    });

    window.addEventListener("appinstalled", () => {
        installButton.style.display = "none";
    });
});
