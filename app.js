/* Basic styles */
body {
    font-family: Arial, sans-serif;
    background-color: #ffffff;
    margin: 0;
    padding: 0;
}

#loadingScreen {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.8);
    display: none;
    justify-content: center;
    align-items: center;
}

h3 {
    text-align: center;
    margin: 20px 0;
}

button {
    font-size: 16px;
    padding: 12px 20px;
    cursor: pointer;
    border-radius: 5px;
    border: none;
}

#searchButton, #clearButton {
    background-color: #2e6095;
    color: #fff;
    margin-right: 10px;
    margin-top: 10px;
    border-radius: 8px;
    width: auto;
}

#clearButton {
    background-color: #f5c265;
}

button:hover {
    opacity: 0.9;
}

#installButton {
    position: fixed;
    bottom: 20px;
    right: 20px;
    background-color: #c05510;
    color: white;
    border-radius: 50%;
    padding: 15px;
    font-size: 20px;
    cursor: pointer;
    display: none;
}

#installButton:hover {
    background-color: #f5c265;
}

#output {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

#searchInput {
    width: 300px;
    padding: 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    margin-top: 10px;
    font-size: 16px;
}

.result-box {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    padding: 10px;
    background-color: #f9f9f9;
    border-radius: 5px;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
}

.result-box p {
    margin: 0;
    font-size: 18px;
    color: #000000;
    line-height: 1.5;
    margin-right: 10px; /* Add space between text and image */
}

.result-image {
    max-height: 100px; /* Ensure the image is not too large */
    object-fit: cover;
    width: auto;
    height: 100%; /* Keep the image aligned to the bottom */
    margin-left: 15px; /* Add space between the image and the data */
}
