// Service Worker Registration
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(reg => console.log('Service Worker Registered', reg))
    .catch(err => console.log('Service Worker Registration Failed', err));
}

// Install Button
let installPrompt;
const installBtn = document.getElementById('installButton');

window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  installPrompt = e;
  installBtn.style.display = 'block';
});

installBtn.addEventListener('click', () => {
  if (installPrompt) {
    installPrompt.prompt();
    installPrompt.userChoice.then(choiceResult => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User installed the app');
      }
      installPrompt = null;
    });
  }
});

// Loading Screen
function showLoading() {
  document.getElementById('loadingScreen').style.display = 'flex';
}
function hideLoading() {
  document.getElementById('loadingScreen').style.display = 'none';
}

// Fetch Data
let sheetURL = "https://sheetdb.io/api/v1/cg3gwaj5yfawg";
let dataStore = [];

function fetchData() {
  showLoading();
  fetch(sheetURL)
    .then(response => response.json())
    .then(data => {
      dataStore = data;
      hideLoading();
    })
    .catch(error => {
      console.error('Error fetching data:', error);
      hideLoading();
    });
}

// Search Function
function searchData() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();
  const outputDiv = document.getElementById('output');

  if (!searchTerm) {
    outputDiv.innerHTML = "Please enter a search term.";
    return;
  }

  const results = dataStore.filter(entry => 
    entry["سۆرانی"]?.toLowerCase().includes(searchTerm) ||
    entry["بادینی"]?.toLowerCase().includes(searchTerm) ||
    entry["هەورامی"]?.toLowerCase().includes(searchTerm)
  );

  if (results.length === 0) {
    outputDiv.innerHTML = "No results found.";
  } else {
    outputDiv.innerHTML = results.map(entry =>
      `<div style="padding: 10px; border: 1px solid #ccc; margin-bottom: 5px;">
        <strong>سۆرانی:</strong> ${entry["سۆرانی"] || 'N/A'}<br>
        <strong>بادینی:</strong> ${entry["بادینی"] || 'N/A'}<br>
        <strong>هەورامی:</strong> ${entry["هەورامی"] || 'N/A'}
      </div>`).join('');
  }
}

// Event Listeners
document.getElementById('searchButton').addEventListener('click', searchData);
document.getElementById('clearButton').addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  document.getElementById('output').innerHTML = '';
});

// Load Data on Start
fetchData();
