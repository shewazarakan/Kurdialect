function searchData() {
    const searchTerm = document.getElementById('searchInput').value.trim();
    if (!searchTerm) return;

    // Simulated data retrieval
    const data = {
        sorani: 'دانا٢',
        badini: 'داتا٣',
        hawrami: 'داتا'
    };

    // Determine which column is the input column
    let inputColumn = '';
    for (const [key, value] of Object.entries(data)) {
        if (value === searchTerm) {
            inputColumn = key;
            break;
        }
    }

    // Update the results and apply styles
    ['sorani', 'badini', 'hawrami'].forEach(column => {
        const resultContainer = document.getElementById(`${column}ResultContainer`);
        const resultElement = document.getElementById(`${column}Result`);
        const labelElement = document.getElementById(`${column}Label`);
        resultElement.textContent = data[column] || 'No data';

        if (column === inputColumn) {
            labelElement.classList.add('input-column');
            labelElement.classList.remove('output-column');
        } else {
            labelElement.classList.add('output-column');
            labelElement.classList.remove('input-column');
        }
    });
}

function clearData() {
    document.getElementById('searchInput').value = '';
    ['sorani', 'badini', 'hawrami'].forEach(column => {
        const resultElement = document.getElementById(`${column}Result`);
        const labelElement = document.getElementById(`${column}Label`);
        resultElement.textContent = '';
        labelElement.classList.remove('input-column', 'output-column');
    });
}
