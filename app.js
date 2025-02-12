const googleSheetsURL = "https://docs.google.com/spreadsheets/d/1nE2ohOnINWPDd2u3_ajVBXaM8lR3gQqvUSe0pE9UJH4/gviz/tq?tqx=out:json";

let sheetData = [];

// Fetch data from Google Sheets
async function fetchData() {
    document.getElementById('loadingScreen').style.display = 'flex';

    try {
        const response = await fetch(googleSheetsURL);
        let text = await response.text();
        text = text.substring(47, text.length - 2);
        const json = JSON.parse(text);

        sheetData = json.table.rows.map(row => ({
            بادینی: row.c[0]?.v || "",
            سۆرانی: row.c[1]?.v || "",
            هەورامی: row.c[2]?.v || ""
        }));

        document.getElementById('loadingScreen').style.display = 'none';
    } catch (error) {
        console.error('Error fetching data:', error);
        document.getElementById('output').innerText = `Error: ${error.message}`;
        document.getElementById('loadingScreen').style.display = 'none';
    }
}

// Search function
function searchData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!searchTerm) {
        document.getElementById('output').innerText = "Please enter a search term.";
        return;
    }

    const results = sheetData.filter(entry =>
        entry["بادینی"].toLowerCase().includes(searchTerm) ||
        entry["سۆرانی"].toLowerCase().includes(searchTerm) ||
        entry["هەورامی"].toLowerCase().includes(searchTerm)
    );

    if (results.length === 0) {
        document.getElementById('output').innerText = "No results found.";
    } else {
        document.getElementById('output').innerHTML = results.map(entry => `
            <div class="result">
                <strong>بادینی:</strong> ${entry["بادینی"]}<br>
                <strong>سۆرانی:</strong> ${entry["سۆرانی"]}<br>
                <strong>هەورامی:</strong> ${entry["هەورامی"]}
            </div>
        `).join("");
    }
}

// Event Listeners
document.getElementById('searchButton').addEventListener('click', searchData);
document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('output').innerHTML = '';
});

// Fetch data on page load
fetchData();
