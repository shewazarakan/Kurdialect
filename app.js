let databaseURL = "https://sheetdb.io/api/v1/cg3gwaj5yfawg";
let sheetData = [];

function fetchData() {
    document.getElementById('loadingScreen').style.display = 'flex';

    fetch(databaseURL)
        .then(response => response.json())
        .then(data => {
            sheetData = data;
            document.getElementById('loadingScreen').style.display = 'none';
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            document.getElementById('loadingScreen').style.display = 'none';
        });
}

fetchData();

function searchData() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
    const output = document.getElementById('output');

    if (!searchTerm) {
        output.innerHTML = "Please enter a search term.";
        return;
    }

    let results = sheetData.filter(row =>
        row["سۆرانی"]?.toLowerCase().includes(searchTerm) ||
        row["بادینی"]?.toLowerCase().includes(searchTerm) ||
        row["هەورامی"]?.toLowerCase().includes(searchTerm)
    );

    if (results.length === 0) {
        output.innerHTML = "No results found.";
    } else {
        output.innerHTML = results.map(row => `
            <div>
                <strong>سۆرانی:</strong> ${row["سۆرانی"] || ''} <br>
                <strong>بادینی:</strong> ${row["بادینی"] || ''} <br>
                <strong>هەورامی:</strong> ${row["هەورامی"] || ''}
            </div>
        `).join("<hr>");
    }
}

document.getElementById('searchButton').addEventListener('click', searchData);
document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('output').innerHTML = '';
});

// Add to Home Screen
let installPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    installPrompt = e;
    document.getElementById('installButton').style.display = 'block';
});

document.getElementById('installButton').addEventListener('click', () => {
    if (installPrompt) {
        installPrompt.prompt();
    }
});
