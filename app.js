const apiUrl = 'https://sheets.googleapis.com/v4/spreadsheets/1nE2ohOnINWPDd2u3_ajVBXaM8lR3gQqvUSe0pE9UJH4/values/Sheet1?key=AIzaSyAf5iWmlgcpHOOib8wClGC5hH2DoX0g3OM';
const searchButton = document.getElementById('searchButton');
const clearButton = document.getElementById('clearButton');
const searchBox = document.getElementById('searchBox');
const searchResults = document.getElementById('searchResults');
const searchResultsContainer = document.getElementById('searchResultsContainer');

searchButton.addEventListener('click', search);
clearButton.addEventListener('click', clearSearch);

function search() {
  const query = searchBox.value.trim().toLowerCase();
  if (query === "") {
    displayError("Please enter a search term.");
    return;
  }

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const rows = data.values;
      const filteredResults = rows.filter(row => row.some(cell => cell.toLowerCase().includes(query)));

      if (filteredResults.length > 0) {
        displaySearchResults(filteredResults);
      } else {
        displayError("No results found.");
      }
    })
    .catch(error => {
      displayError("An error occurred while fetching data.");
      console.error(error);
    });
}

function displaySearchResults(results) {
  searchResultsContainer.style.display = 'block';
  searchResults.innerHTML = '';

  results.forEach(row => {
    const resultDiv = document.createElement('div');
    resultDiv.classList.add('result-row');

    row.forEach((cell, index) => {
      const columnDiv = document.createElement('div');
      columnDiv.classList.add('result-column');
      columnDiv.style.color = getColumnColor(index);
      columnDiv.textContent = cell;
      resultDiv.appendChild(columnDiv);
    });

    searchResults.appendChild(resultDiv);
  });
}

function displayError(message) {
  searchResultsContainer.style.display = 'block';
  searchResults.innerHTML = `<p style="color: red;">${message}</p>`;
}

function clearSearch() {
  searchBox.value = '';
  searchResults.innerHTML = '';
  searchResultsContainer.style.display = 'none';
}

function getColumnColor(index) {
  // Customize your column colors here
  const columnColors = ['#c05510', '#f5c265', '#2e6095']; // Add or modify as needed
  return columnColors[index % columnColors.length];
}
