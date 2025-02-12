let sheetData = [];

function fetchData() {
    document.getElementById('loadingScreen').style.display = 'flex';

    fetch('https://opensheet.elk.sh/YOUR_GOOGLE_SHEET_ID/database2')
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
            topColumn = `<strong class="top-text">بادینی:</strong> ${record["بادینی"]}<br>`;
            otherColumns = `<strong class="other-text">سۆرانی:</strong> ${record["سۆرانی"]}<br>
                            <strong class="other-text">هەورامی:</strong> ${record["هەورامی"]}<br>`;
        } else if (record["سۆرانی"] && record["سۆرانی"].toLowerCase().includes(searchTerm)) {
            topColumn = `<strong class="top-text">سۆرانی:</strong> ${record["سۆرانی"]}<br>`;
            otherColumns = `<strong class="other-text">بادینی:</strong> ${record["بادینی"]}<br>
                            <strong class="other-text">هەورامی:</strong> ${record["هەورامی"]}<br>`;
        } else if (record["هەورامی"] && record["هەورامی"].toLowerCase().includes(searchTerm)) {
            topColumn = `<strong class="top-text">هەورامی:</strong> ${record["هەورامی"]}<br>`;
            otherColumns = `<strong class="other-text">سۆرانی:</strong> ${record["سۆرانی"]}<br>
                            <strong class="other-text">بادینی:</strong> ${record["بادینی"]}<br>`;
        }

        outputHTML += `<div class="result">${topColumn}${otherColumns}</div>`;
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
