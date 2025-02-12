let sheetData = [];

function fetchData() {
    document.getElementById('loadingScreen').style.display = 'flex';

    fetch('https://sheetdb.io/api/v1/cg3gwaj5yfawg')
    .then(response => response.json())
    .then(data => {
        sheetData = data;
        document.getElementById('output').innerHTML = "";
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('output').innerHTML = `Error fetching data: ${error.message}`;
    })
    .finally(() => {
        document.getElementById('loadingScreen').style.display = 'none';
    });
}

fetchData();

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

        outputHTML += `<div style="padding: 15px; border: 1px solid #ccc; margin-bottom: 10px; background-color: #fff; border-radius: 8px;">
                        ${topColumn}${otherColumns}
                       </div>`;
    });

    document.getElementById('output').innerHTML = outputHTML;
}

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

document.getElementById('searchButton').addEventListener('click', searchData);
document.getElementById('clearButton').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    document.getElementById('output').innerHTML = '';
});

// Add to Home Screen (PWA)
let deferredPrompt;
const installButton = document.getElementById("installButton");

window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installButton.style.display = "block";
});

installButton.addEventListener("click", () => {
    if (deferredPrompt) {
        deferredPrompt.prompt();
        deferredPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === "accepted") {
                installButton.style.display = "none";
            }
            deferredPrompt = null;
        });
    }
});
