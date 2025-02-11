document.addEventListener("DOMContentLoaded", () => {
  let airtableData = [];

  async function fetchData() {
    document.getElementById("loadingScreen").style.display = "flex";

    const response = await fetch("https://api.airtable.com/v0/appPMRn6taSjy5Cuw/database2", {
      headers: {
        Authorization: `Bearer ${import.meta.env.AIRTABLE_TOKEN}`,
      },
    });

    const data = await response.json();
    airtableData = data.records || [];
    document.getElementById("loadingScreen").style.display = "none";
  }

  function searchData() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase().trim();
    const output = document.getElementById("output");
    output.innerHTML = "";

    if (!searchTerm) {
      output.innerHTML = "Please enter a search term.";
      return;
    }

    const filteredData = airtableData.filter(record =>
      Object.values(record.fields).some(value => value.toLowerCase().includes(searchTerm))
    );

    output.innerHTML = filteredData.length
      ? filteredData.map(record => `
        <div class="result-box">
          <strong style="color: blue;">${record.fields["بادینی"] || ""}</strong><br>
          <strong style="color: lightblue;">${record.fields["سۆرانی"] || ""}</strong><br>
          <strong style="color: lightblue;">${record.fields["هەورامی"] || ""}</strong>
        </div>
      `).join("")
      : "No results found.";
  }

  document.getElementById("searchButton").addEventListener("click", searchData);
  document.getElementById("clearButton").addEventListener("click", () => {
    document.getElementById("searchInput").value = "";
    document.getElementById("output").innerHTML = "";
  });

  fetchData();
});
