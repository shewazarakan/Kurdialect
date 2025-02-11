const AIRTABLE_API_KEY = "pattdszpPNjdfwO2r.44b8a2e4dcb3f0bf95b2f80fda2a42734ba1ef4ac5d43172d8bdcd3e94016395";
const BASE_ID = "appPMRn6taSjy5Cuw";
const TABLE_NAME = "database2";
let airtableData = [];

function fetchData() {
    document.getElementById('loadingScreen').style.display = 'flex';

    fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLE_NAME}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${AIRTABLE_API_KEY}`
        }
    })
    .then(response => response.json())
    .then(data => {
        airtableData = data.records || [];
        document.getElementById('output').innerHTML = airtableData.length ? "" : "No records found.";
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('output').innerHTML = `Error: ${error.message}`;
    })
    .finally(() => {
        document.getElementById('loadingScreen').style.display = 'none';
    });
}

function searchData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    if (!searchTerm) {
        document.getElementById('output').innerHTML = "Please enter a search term.";
        return;
    }

    const results = airtableData.filter(record =>
        Object.values(record.fields).some(value => value.toLowerCase().includes(searchTerm))
    );

    document.getElementById('output').innerHTML = results.length
        ? results.map(record => formatResult(record.fields)).join("")
        : "No results found.";
}

function formatResult(fields) {
    return `
        <div class="result-box">
            <strong class="sorani">سۆرانی:</strong> ${fields["سۆرانی"] || "N/A"}<br>
            <strong class="badini">بادینی:</strong> ${fields["بادینی"] || "N/A"}<br>
            <strong class="hawrami">هەورامی:</strong> ${fields["هەورامی"] || "N/A"}<br>
        </div>
    `;
}

document.getElementById('searchButton').addEventListener('click', searchData);
document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('output').innerHTML = '';
});

fetchData();
