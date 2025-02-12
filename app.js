// Fetch data from Google Sheets via SheetDB API
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

// Display search results
function searchData() {
    const input = document.getElementById("searchInput").value.trim().toLowerCase();
    const resultsTable = document.getElementById("results");
    resultsTable.innerHTML = ""; // Clear previous results

    fetchData().then((data) => {
        const filteredData = data.filter(row =>
            row["سۆرانی"].toLowerCase().includes(input)
        );

        filteredData.forEach(row => {
            const tr = document.createElement("tr");
            tr.innerHTML = `<td>${row["سۆرانی"]}</td>
                            <td>${row["بادینی"]}</td>
                            <td>${row["هەورامی"]}</td>`;
            resultsTable.appendChild(tr);
        });
    });
}

// Clear input and results
function clearSearch() {
    document.getElementById("searchInput").value = "";
    document.getElementById("results").innerHTML = "";
}

// Install PWA
let deferredPrompt;
window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    document.getElementById("installButton").style.display = "block";
});

document.getElementById("installButton").addEventListener("click", () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(choiceResult => {
            if (choiceResult.outcome === "accepted") {
                console.log("User installed the app");
            }
            deferredPrompt = null;
        });
    }
});

// Event Listeners
document.getElementById("searchButton").addEventListener("click", searchData);
document.getElementById("clearButton").addEventListener("click", clearSearch);
