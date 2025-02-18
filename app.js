document.getElementById("searchButton").addEventListener("click", searchData);
document.getElementById("clearButton").addEventListener("click", clearSearch);

function searchData() {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    if (searchTerm) {
        fetch(`https://sheets.googleapis.com/v4/spreadsheets/1nE2ohOnINWPDd2u3_ajVBXaM8lR3gQqvUSe0pE9UJH4/values/database3?key=AIzaSyAf5iWmlgcpHOOib8wClGC5hH2DoX0g3OM`)
            .then(response => response.json())
            .then(data => {
                const rows = data.values;
                const results = rows.filter(row => 
                    row.some(cell => cell.toLowerCase().includes(searchTerm))
                );

                const outputContainer = document.getElementById("output");
                outputContainer.innerHTML = "";
                
                if (results.length > 0) {
                    results.forEach(row => {
                        const resultRow = document.createElement("div");
                        resultRow.style.marginBottom = "10px";

                        row.forEach((cell, index) => {
                            const cellElement = document.createElement("div");
                            cellElement.textContent = cell;
                            cellElement.style.color = "#000000"; // Making data black
                            if (index === 0) {
                                cellElement.style.backgroundColor = "#c05510"; // سۆرانی color
                            } else if (index === 1) {
                                cellElement.style.backgroundColor = "#f5c265"; // بادینی color
                            } else if (index === 2) {
                                cellElement.style.backgroundColor = "#2e6095"; // هەورامی color
                            }
                            resultRow.appendChild(cellElement);
                        });

                        outputContainer.appendChild(resultRow);
                    });
                } else {
                    outputContainer.innerHTML = "<p>No results found.</p>";
                }
            });
    }
}

function clearSearch() {
    document.getElementById("searchInput").value = "";
    document.getElementById("output").innerHTML = "";
}

// Handle Install Button Logic
let deferredPrompt;
const installButton = document.getElementById('installButton');
installButton.addEventListener('click', () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
        } else {
            console.log('User dismissed the A2HS prompt');
        }
        deferredPrompt = null;
    });
});

window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredPrompt = e;
    installButton.style.display = 'block'; // Show install button
});
