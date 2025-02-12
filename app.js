let deferredPrompt;

// Show install button when available
window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    document.getElementById("installButton").style.display = "block";
});

document.getElementById("installButton").addEventListener("click", () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                console.log("User accepted the install prompt");
            } else {
                console.log("User dismissed the install prompt");
            }
            deferredPrompt = null;
            document.getElementById("installButton").style.display = "none";
        });
    }
});

// Show loading screen while fetching data
function fetchData() {
    document.getElementById("loadingScreen").style.display = "flex";

    fetch("https://sheetdb.io/api/v1/cg3gwaj5yfawg")
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                displayData(data);
            } else {
                document.getElementById("output").innerHTML = "No records found.";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById("output").innerHTML = "Error fetching data.";
        })
        .finally(() => {
            document.getElementById("loadingScreen").style.display = "none";
        });
}

// Search Functionality
function searchData() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();

    if (!searchTerm) {
        document.getElementById("output").innerHTML = "Please enter a search term.";
        return;
    }

    fetch("https://sheetdb.io/api/v1/cg3gwaj5yfawg")
        .then(response => response.json())
        .then(data => {
            const filteredData = data.filter(record =>
                record["بادینی"]?.toLowerCase().includes(searchTerm) ||
                record["سۆرانی"]?.toLowerCase().includes(searchTerm) ||
                record["هەورامی"]?.toLowerCase().includes(searchTerm)
            );

            if (filteredData.length === 0) {
                document.getElementById("output").innerHTML = "No results found.";
            } else {
                displayData(filteredData);
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

// Display Data
function displayData(data) {
    let outputHTML = "";
    data.forEach(record => {
        outputHTML += `
        <div class="result-item">
            <strong>بادینی:</strong> ${record["بادینی"] || "N/A"}<br>
            <strong>سۆرانی:</strong> ${record["سۆرانی"] || "N/A"}<br>
            <strong>هەورامی:</strong> ${record["هەورامی"] || "N/A"}<br>
        </div>`;
    });
    document.getElementById("output").innerHTML = outputHTML;
}

// Button Listeners
document.getElementById("searchButton").addEventListener("click", searchData);
document.getElementById("clearButton").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    document.getElementById("output").innerHTML = "";
});

// Fetch data on load
fetchData();
