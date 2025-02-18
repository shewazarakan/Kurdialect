// Define the Google Sheets API URL
const sheetId = '1nE2ohOnINWPDd2u3_ajVBXaM8lR3gQqvUSe0pE9UJH4'; // Your Sheet ID
const apiKey = 'AIzaSyAf5iWmlgcpHOOib8wClGC5hH2DoX0g3OM'; // Your API Key
const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/database3!A1:Z1000?key=${apiKey}`;

// Install Button Logic
let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault(); // Prevent the default install prompt
  deferredPrompt = e;
  document.getElementById('installButton').style.display = 'block'; // Show install button
});

document.getElementById('installButton').addEventListener('click', () => {
  deferredPrompt.prompt(); // Show the install prompt when clicked
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the A2HS prompt');
    } else {
      console.log('User dismissed the A2HS prompt');
    }
    deferredPrompt = null;
  });
});

// Handle Search Button Click
document.getElementById('searchButton').addEventListener('click', async () => {
  const searchInput = document.getElementById('searchInput').value.trim();
  if (!searchInput) {
    alert('Please enter a search term!');
    return;
  }

  // Fetch data from Google Sheets
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const rows = data.values;
    const searchResults = [];

    // Loop through rows to find matches
    rows.forEach((row) => {
      if (row[0] && row[0].includes(searchInput)) {
        searchResults.push({ sorani: row[0], badini: row[1], hewarami: row[2] });
      } else if (row[1] && row[1].includes(searchInput)) {
        searchResults.push({ sorani: row[0], badini: row[1], hewarami: row[2] });
      } else if (row[2] && row[2].includes(searchInput)) {
        searchResults.push({ sorani: row[0], badini: row[1], hewarami: row[2] });
      }
    });

    displayResults(searchResults);

  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
  }
});

// Function to display search results
function displayResults(results) {
  const resultsContainer = document.getElementById('resultsContainer');
  resultsContainer.innerHTML = ''; // Clear previous results

  if (results.length === 0) {
    resultsContainer.innerHTML = 'No results found.';
    return;
  }

  results.forEach(result => {
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result');

    // Create the result display
    resultDiv.innerHTML = `
      <p><strong>سۆرانی:</strong> <span style="color: #c05510;">${result.sorani}</span></p>
      <p><strong>بادینی:</strong> <span style="color: #f5c265;">${result.badini}</span></p>
      <p><strong>هەورامی:</strong> <span style="color: #2e6095;">${result.hewarami}</span></p>
    `;
    
    // Append each result to the container
    resultsContainer.appendChild(resultDiv);
  });
}
