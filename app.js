let airtableData = [];

function fetchData() {
    document.getElementById('loadingScreen').style.display = 'flex';

    fetch("https://api.airtable.com/v0/appPMRn6taSjy5Cuw/database2", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${API_KEY}`
        }
    })
    .then(response => response.json())
    .then(data => {
        airtableData = data.records;
        document.getElementById('output').innerHTML = "";
    })
    .catch(error => {
        console.error("Error fetching data:", error);
        document.getElementById('output').innerHTML = `Error: ${error.message}`;
    })
    .finally(() => {
        document.getElementById('loadingScreen').style.display = 'none';
    });
}

fetchData();

function searchData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

    if (!searchTerm) {
        document.getElementById('output').innerHTML = "Please enter a search term.";
        return;
    }

    const filteredData = airtableData.filter(record =>
        (record.fields["بادینی"] && record.fields["بادینی"].toLowerCase().includes(searchTerm)) ||
        (record.fields["سۆرانی"] && record.fields["سۆرانی"].toLowerCase().includes(searchTerm)) ||
        (record.fields["هەورامی"] && record.fields["هەورامی"].toLowerCase().includes(searchTerm))
    );

    if (filteredData.length === 0) {
        document.getElementById('output').innerHTML = "No results found.";
    } else {
        displayData(filteredData);
    }
}

function displayData(data) {
    let outputHTML = '';
    data.forEach(record => {
        outputHTML += `<div class="result">
            <strong style="color: #007BFF;">بادینی:</strong> ${record.fields["بادینی"] || "-"}<br>
            <strong style="color: #5bc0de;">سۆرانی:</strong> ${record.fields["سۆرانی"] || "-"}<br>
            <strong style="color: #5bc0de;">هەورامی:</strong> ${record.fields["هەورامی"] || "-"}<br>
        </div>`;
    });

    document.getElementById('output').innerHTML = outputHTML;
}

document.getElementById('searchButton').addEventListener('click', searchData);
document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('output').innerHTML = '';
});
