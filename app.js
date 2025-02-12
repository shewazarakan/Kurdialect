let sheetURL = "https://sheetdb.io/api/v1/cg3gwaj5yfawg";

let deferredPrompt; // For install event
const installButton = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installButton.style.display = 'flex';
});

installButton.addEventListener('click', () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then(() => {
            deferredPrompt = null;
            installButton.style.display = 'none';
        });
    }
});

function fetchData() {
    document.getElementById('loadingScreen').style.display = 'flex';

    fetch(sheetURL)
        .then(response => response.json())
        .then(data => {
            if (data.length > 0) {
                window.sheetData = data;
            } else {
                document.getElementById('output').innerHTML = "No records found.";
            }
        })
        .catch(error => {
            console.error("Error fetching data:", error);
            document.getElementById('output').innerHTML = `Error fetching data: ${error.message}`;
        })
        .finally(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        });
}

fetchData();

function searchData() {
    const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();
    if (!searchTerm) {
        document.getElementById('output').innerHTML = "Please enter a search term.";
        return;
    }

    const filteredData = window.sheetData.filter(record =>
        record["بادینی"]?.toLowerCase().includes(searchTerm) ||
        record["سۆرانی"]?.toLowerCase().includes(searchTerm) ||
        record["هەورامی"]?.toLowerCase().includes(searchTerm)
    );

    if (filteredData.length === 0) {
        document.getElementById('output').innerHTML = "No results found.";
    } else {
        displayData(filteredData, searchTerm);
    }
}

function displayData(data, searchTerm) {
    let outputHTML = '';

    data.forEach(record => {
        let inputColumn = '';
        let outputColumns = '';

        if (record["بادینی"]?.toLowerCase().includes(searchTerm)) {
            inputColumn = `<strong class="input-column">بادینی:</strong> ${record["بادینی"]}`;
            outputColumns = `<strong class="output-column">سۆرانی:</strong> ${record["سۆرانی"]}<br>
                             <strong class="output-column">هەورامی:</strong> ${record["هەورامی"]}`;
        } else if (record["سۆرانی"]?.toLowerCase().includes(searchTerm)) {
            inputColumn = `<strong class="input-column">سۆرانی:</strong> ${record["سۆرانی"]}`;
            outputColumns = `<strong class="output-column">بادینی:</strong> ${record["بادینی"]}<br>
                             <strong class="output-column">هەورامی:</strong> ${record["هەورامی"]}`;
        } else if (record["هەورامی"]?.toLowerCase().includes(searchTerm)) {
            inputColumn = `<strong class="input-column">هەورامی:</strong> ${record["هەورامی"]}`;
            outputColumns = `<strong class="output-column">سۆرانی:</strong> ${record["سۆرانی"]}<br>
                             <strong class="output-column">بادینی:</strong> ${record["بادینی"]}`;
        }

        outputHTML += `<div class="result-box">${inputColumn}<br>${outputColumns}</div>`;
    });

    document.getElementById('output').innerHTML = outputHTML;
}

document.getElementById('searchButton').addEventListener('click', searchData);
document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('output').innerHTML = '';
});
