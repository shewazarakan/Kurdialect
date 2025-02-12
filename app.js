const SHEETDB_URL = "https://sheetdb.io/api/v1/cg3gwaj5yfawg"; // Your SheetDB API URL

let sheetData = [];

// Fetch data from Google Sheets via SheetDB
function fetchData() {
    document.getElementById('loadingScreen').style.display = 'flex'; // Show loading screen

    fetch(SHEETDB_URL)
        .then(response => response.json())
        .then(data => {
            if (Array.isArray(data) && data.length > 0) {
                sheetData = data;
                document.getElementById('output').innerHTML = ""; // Clear output initially
            } else {
                document.getElementById('output').innerHTML = "No records found.";
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('output').innerHTML = `Error fetching data: ${error.message}`;
        })
        .finally(() => {
            document.getElementById('loadingScreen').style.display = 'none'; // Hide loading screen
        });
}

// Display search results
function displayData(data, searchTerm) {
    let outputHTML = '';
    data.forEach(record => {
        let topColumn = '';
        let otherColumns = '';

        if (record["بادینی"] && record["بادینی"].toLowerCase().includes(searchTerm)) {
            topColumn = `<strong style="color: #012169;">بادینی:</strong> ${record["بادینی"]}<br>`;
            otherColumns = `<strong style="color: #f5c400;">سۆرانی:</strong> ${record["سۆرانی"]}<br>
                            <strong style="color: #f5c400;">هەورامی:</strong> ${record["هەورامی"]}<br>`;
        } else if (record["سۆرانی"] && record["سۆرانی"].toLowerCase().includes(searchTerm)) {
            topColumn = `<strong style="color: #012169;">سۆرانی:</strong> ${record["سۆرانی"]}<br>`;
            otherColumns = `<strong style="color: #f5c400;">بادینی:</strong> ${record["بادینی"]}<br>
                            <strong style="color: #f5c400;">هەورامی:</strong> ${record["هەورامی"]}<br>`;
        } else if (record["هەورامی"] && record["هەورامی"].toLowerCase().includes(searchTerm)) {
            topColumn = `<strong style="color: #012169;">هەورامی:</strong> ${record["هەورامی"]}<br>`;
            otherColumns = `<strong style="color: #f5c400;">سۆرانی:</strong> ${record["سۆرانی"]}<br>
                            <strong style="color: #f5c400;">بادینی:</strong> ${record["بادینی"]}<br>`;
        }

        outputHTML += `<div class="result-box">
                        ${topColumn}${otherColumns}
                       </div>`;
    });

    document.getElementById('output').innerHTML = outputHTML;
}

// Search function
function searchData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    if (!searchTerm) {
        document.getElementById('output').innerHTML = "Please enter a search term.";
        return;
    }

    const filteredData = sheetData.filter(record => 
        (record["بادینی"] && record["بادینی"].toLowerCase().includes(searchTerm)) ||
        (record["سۆرانی"] && record["سۆرانی"].toLowerCase().includes(searchTerm)) ||
        (record["هەورامی"] && record["هەورامی"].toLowerCase().includes(searchTerm))
    );

    if (filteredData.length === 0) {
        document.getElementById('output').innerHTML = "No results found.";
    } else {
        displayData(filteredData, searchTerm);
    }
}

// Event listeners
document.getElementById('searchButton').addEventListener('click', searchData);
document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('output').innerHTML = '';
});

// Fetch data on page load
fetchData();
