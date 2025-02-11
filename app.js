const AIRTABLE_TOKEN = "${{ secrets.AIRTABLE_TOKEN }}";
const AIRTABLE_URL = "https://api.airtable.com/v0/appPMRn6taSjy5Cuw/database2";

let airtableData = [];

function fetchData() {
  document.getElementById("loadingScreen").style.display = "flex";

  fetch(AIRTABLE_URL, {
    method: "GET",
    headers: { Authorization: `Bearer ${AIRTABLE_TOKEN}` }
  })
    .then(response => response.json())
    .then(data => {
      airtableData = data.records || [];
      document.getElementById("output").innerHTML = airtableData.length
        ? ""
        : "No records found.";
    })
    .catch(error => {
      console.error("Error fetching data:", error);
      document.getElementById("output").innerHTML = `Error: ${error.message}`;
    })
    .finally(() => {
      document.getElementById("loadingScreen").style.display = "none";
    });
}

document.getElementById("searchButton").addEventListener("click", () => {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
  if (!searchTerm) return;

  const filteredData = airtableData.filter(record =>
    Object.values(record.fields).some(field => field.toLowerCase().includes(searchTerm))
  );

  document.getElementById("output").innerHTML = filteredData.length
    ? filteredData.map(record => `<p>${JSON.stringify(record.fields)}</p>`).join("")
    : "No results found.";
});

document.getElementById("clearButton").addEventListener("click", () => {
  document.getElementById("searchInput").value = "";
  document.getElementById("output").innerHTML = "";
});

fetchData();
