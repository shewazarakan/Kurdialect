// Fetch data from SheetDB
async function fetchData() {
    const loadingScreen = document.getElementById("loading-screen");
    loadingScreen.style.display = "block"; // Show loading screen

    try {
        const response = await fetch('https://sheetdb.io/api/v1/cg3gwaj5yfawg');
        if (!response.ok) {
            throw new Error("Network response was not ok.");
        }
        const data = await response.json();

        // Hide loading screen and return data once fetched
        loadingScreen.style.display = "none";
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        loadingScreen.style.display = "none"; // Hide loading screen
        alert("Failed to load data");
    }
}

// Search and display results
async function searchData() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const resultsContainer = document.getElementById("search-results");

    if (!searchInput) {
        resultsContainer.innerHTML = "";
        return;
    }

    const data = await fetchData();
    const filteredResults = data.filter(item => 
        item["سۆرانی"].toLowerCase().includes(searchInput) ||
        item["بادینی"].toLowerCase().includes(searchInput) ||
        item["هەورامی"].toLowerCase().includes(searchInput)
    );

    displayResults(filteredResults);
}

// Display the filtered results
function displayResults(results) {
    const resultsContainer = document.getElementById("search-results");
    resultsContainer.innerHTML = ""; // Clear any previous results

    if (results.length === 0) {
        resultsContainer.innerHTML = "<div>No results found</div>";
        return;
    }

    results.forEach(result => {
        const resultElement = document.createElement("div");
        resultElement.classList.add("search-result-item");

        // Display input and output columns
        resultElement.innerHTML = `
            <div><span class="column-header">سۆرانی:</span> ${result["سۆرانی"]}</div>
            <div><span class="output-column">بادینی:</span> ${result["بادینی"]}</div>
            <div><span class="output-column">هەورامی:</span> ${result["هەورامی"]}</div>
        `;

        resultsContainer.appendChild(resultElement);
    });
}

// Clear search input and results
function clearData() {
    document.getElementById("search-input").value = "";
    document.getElementById("search-results").innerHTML = "";
}

// Handle Install Button functionality
let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    deferredPrompt = event;

    const installButton = document.getElementById('install-button');
    installButton.style.display = 'block';

    installButton.addEventListener('click', () => {
        deferredPrompt.prompt();

        deferredPrompt.userChoice
            .then((choiceResult) => {
                console.log(choiceResult.outcome);
                if (choiceResult.outcome === 'accepted') {
                    console.log('User accepted the A2HS prompt');
                } else {
                    console.log('User dismissed the A2HS prompt');
                }
                deferredPrompt = null;
            });
    });
});

// Event listeners for buttons
document.getElementById("search-button").addEventListener("click", searchData);
document.getElementById("clear-button").addEventListener("click", clearData);

// Responsive fixes for mobile view
window.addEventListener("resize", () => {
    if (window.innerWidth <= 768) {
        const inputContainer = document.querySelector(".input-container");
        inputContainer.style.flexDirection = "column";
    }
});
