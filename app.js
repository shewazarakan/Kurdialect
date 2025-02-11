let airtableData = [];

function fetchData() {
  document.getElementById('loadingScreen').style.display = 'flex'; // Show loading screen
  
  fetch('https://api.airtable.com/v0/appPMRn6taSjy5Cuw/database2', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer your-api-key-here',
    },
  })
  .then(response => response.json())
  .then(data => {
    if (data.records && data.records.length > 0) {
      airtableData = data.records;
      document.getElementById('output').innerHTML = ""; // Clear output initially
    } else {
      document.getElementById('output').innerHTML = "No records found in Airtable.";
    }
  })
  .catch(error => {
    console.error('Error fetching data:', error);
    document.getElementById('output').innerHTML = `Error fetching data: ${error.message}`;
  })
  .finally(() => {
    document.getElementById('loadingScreen').style.display = 'none'; // Hide loading screen
  });
}

// Call fetchData when the page loads
fetchData();

function displayData(data, searchTerm) {
  let outputHTML = '';
  data.forEach(record => {
    let topColumn = '';
    let otherColumns = '';

    if (record.fields["بادینی"] && record.fields["بادینی"].toLowerCase().includes(searchTerm)) {
      topColumn = `<strong style="color: green;">بادینی:</strong> ${record.fields["بادینی"]}<br>`;
      otherColumns = `<strong style="color: orange;">سۆرانی:</strong> ${record.fields["سۆرانی"]}<br>
                      <strong style="color: orange;">هەورامی:</strong> ${record.fields["هەورامی"]}<br>`;
    } else if (record.fields["سۆرانی"] && record.fields["سۆرانی"].toLowerCase().includes(searchTerm)) {
      topColumn = `<strong style="color: green;">سۆرانی:</strong> ${record.fields["سۆرانی"]}<br>`;
      otherColumns = `<strong style="color: orange;">بادینی:</strong> ${record.fields["بادینی"]}<br>
                      <strong style="color: orange;">هەورامی:</strong> ${record.fields["هەورامی"]}<br>`;
    } else if (record.fields["هەورامی"] && record.fields["هەورامی"].toLowerCase().includes(searchTerm)) {
      topColumn = `<strong style="color: green;">هەورامی:</strong> ${record.fields["هەورامی"]}<br>`;
      otherColumns = `<strong style="color: orange;">سۆرانی:</strong> ${record.fields["سۆرانی"]}<br>
                      <strong style="color: orange;">بادینی:</strong> ${record.fields["بادینی"]}<br>`;
    }

    outputHTML += `<div style="padding: 15px; border: 1px solid #ccc; margin-bottom: 10px; background-color: #fff; border-radius: 8px;">
                    ${topColumn}${otherColumns}
                   </div>`;
  });

  document.getElementById('output').innerHTML = outputHTML;
}

// Search Data
function searchData() {
  const searchTerm = document.getElementById('searchInput').value.toLowerCase().trim();

  if (!searchTerm) {
    document.getElementById('output').innerHTML = "Please enter a search term.";
    return;
  }

  const filteredData = airtableData.filter(record => 
    (record.fields["بادینی"] && record.fields["بادینی"].toLowerCase().includes(searchTerm)) ||
    (record.fields["سۆرانی"] && record.fields["سۆرانی"].toLowerCase().includes(searchTerm)) ||
    (record.fields["هەورامی"] && record.fields["هەورامی"].toLowerCase().includes(searchTerm))
  );

  if (filteredData.length === 0) {
    document.getElementById('output').innerHTML = "No results found.";
  } else {
    displayData(filteredData, searchTerm);
  }
}

// Handle button actions
document.getElementById('searchButton').addEventListener('click', searchData);
document.getElementById('clearButton').addEventListener('click', () => {
  document.getElementById('searchInput').value = '';
  document.getElementById('output').innerHTML = '';
});
