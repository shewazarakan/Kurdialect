let sheetURL = "https://sheetdb.io/api/v1/cg3gwaj5yfawg";

async function fetchData() {
  document.getElementById('output').innerHTML = "<p>Loading...</p>";
  try {
    let response = await fetch(sheetURL);
    let data = await response.json();
    window.sheetData = data;
  } catch (error) {
    document.getElementById('output').innerHTML = "<p>Error loading data.</p>";
  }
}

function searchData() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
  if (!searchTerm) {
    document.getElementById('output').innerHTML = "<p>Please enter a search term.</p>";
    return;
  }

  const filteredData = window.sheetData.filter(record =>
    record["بادینی"].toLowerCase().includes(searchTerm) ||
    record["سۆرانی"].toLowerCase().includes(searchTerm) ||
    record["هەورامی"].toLowerCase().includes(searchTerm)
  );

  let outputHTML = filteredData.length ? "" : "<p>No results found.</p>";
  filteredData.forEach(record => {
    let inputColumn = "";
    let outputColumns = "";

    if (record["بادینی"].toLowerCase().includes(searchTerm)) {
      inputColumn = `<p class="input-column">بادینی: ${record["بادینی"]}</p>`;
      outputColumns = `<p class="output-column">سۆرانی: ${record["سۆرانی"]}</p>
                      <p class="output-column">هەورامی: ${record["هەورامی"]}</p>`;
    } else if (record["سۆرانی"].toLowerCase().includes(searchTerm)) {
      inputColumn = `<p class="input-column">سۆرانی: ${record["سۆرانی"]}</p>`;
      outputColumns = `<p class="output-column">بادینی: ${record["بادینی"]}</p>
                      <p class="output-column">هەورامی: ${record["هەورامی"]}</p>`;
    } else if (record["هەورامی"].toLowerCase().includes(searchTerm)) {
      inputColumn = `<p class="input-column">هەورامی: ${record["هەورامی"]}</p>`;
      outputColumns = `<p class="output-column">سۆرانی: ${record["سۆرانی"]}</p>
                      <p class="output-column">بادینی: ${record["بادینی"]}</p>`;
    }

    outputHTML += `<div class="result-item">${inputColumn}${outputColumns}</div>`;
  });

  document.getElementById('output').innerHTML = outputHTML;
}

document.getElementById('searchButton').addEventListener('click', searchData);
document.getElementById('clearButton').addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  document.getElementById('output').innerHTML = '';
});

document.getElementById('installButton').addEventListener('click', () => {
  if (window.deferredPrompt) {
    window.deferredPrompt.prompt();
    window.deferredPrompt.userChoice.then(choice => {
      if (choice.outcome === 'accepted') {
        window.deferredPrompt = null;
      }
    });
  }
});

window.addEventListener('beforeinstallprompt', event => {
  event.preventDefault();
  window.deferredPrompt = event;
});

fetchData();
