document.addEventListener('DOMContentLoaded', () => {
  const searchButton = document.getElementById('searchButton');
  const clearButton = document.getElementById('clearButton');
  const searchInput = document.getElementById('searchInput');
  const resultsBox = document.getElementById('resultsBox');
  const resultsTableBody = document.getElementById('resultsTableBody');
  const installBtn = document.getElementById('installBtn');
  const loadingScreen = document.getElementById('loadingScreen');

  const apiUrl = 'https://sheetdb.io/api/v1/cg3gwaj5yfawg'; // Your SheetDB API URL

  searchButton.addEventListener('click', searchData);
  clearButton.addEventListener('click', clearData);
  installBtn.addEventListener('click', installApp);

  function searchData() {
    const searchTerm = searchInput.value.trim();
    if (!searchTerm) {
      alert('Please enter a word to search!');
      return;
    }

    showLoadingScreen(true);

    fetch(`${apiUrl}?search=${searchTerm}`)
      .then(response => response.json())
      .then(data => {
        showLoadingScreen(false);
        displayResults(data);
      })
      .catch(error => {
        showLoadingScreen(false);
        console.error('Error fetching data:', error);
      });
  }

  function displayResults(data) {
    resultsBox.style.display = data.length ? 'block' : 'none';
    resultsTableBody.innerHTML = '';

    if (data.length) {
      data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>${item.soranî}</td>
          <td>${item.badinî}</td>
          <td>${item.hewramî}</td>
        `;
        resultsTableBody.appendChild(row);
      });
    } else {
      resultsTableBody.innerHTML = '<tr><td colspan="3">No results found</td></tr>';
    }
  }

  function clearData() {
    searchInput.value = '';
    resultsBox.style.display = 'none';
  }

  function installApp() {
    // Add your logic here to trigger PWA installation
    alert('Install button clicked');
  }

  function showLoadingScreen(isLoading) {
    loadingScreen.style.display = isLoading ? 'flex' : 'none';
  }

  // Handling the beforeinstallprompt event for PWA
  let deferredPrompt;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installBtn.style.display = 'block';
  });

  installBtn.addEventListener('click', () => {
    if (deferredPrompt) {
      deferredPrompt.prompt();
      deferredPrompt.userChoice.then((choiceResult) => {
        if (choiceResult.outcome === 'accepted') {
          console.log('User accepted the A2HS prompt');
        } else {
          console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
      });
    }
  });
});
