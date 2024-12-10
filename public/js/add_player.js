// Get the form element we need to modify
let addPlayerForm = document.getElementById('add-player-form-ajax');

// Modify the form submission behavior
addPlayerForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting the traditional way
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPlayerName = document.getElementById("input-playerName");

    // Get the value from the input field
    let playerNameValue = inputPlayerName.value;

    // Put the data we want to send in a JavaScript object
    let data = {
        playerName: playerNameValue
    };

    // Setup the AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-player-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell AJAX request how to handle the response
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Parse the response
            let response = JSON.parse(xhttp.responseText);
            let newPlayer = response[0]; 
            // Add the new row to the players table
            addRowToTable(newPlayer);

            // Clear the input field after submission
            document.getElementById("input-playerName").value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Error adding player.");
        }
    };

    // Send the AJAX request with the player data
    xhttp.send(JSON.stringify(data));
});

// Function to dynamically add the new player row to the table
function addRowToTable(newPlayer) {
    let table = document.getElementById("player-table").getElementsByTagName('tbody')[0];

    // Create a new row for the player
    let newRow = table.insertRow(table.rows.length);

    // Insert the cells for Player ID, Player Name, and Action (Delete button)
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);

    // Set the text for each cell
    cell1.textContent = newPlayer.playerID;
    cell2.textContent = newPlayer.playerName;

    // Add the Delete button with the appropriate function call
    cell3.innerHTML = `<button onclick="deletePlayer(${newPlayer.playerID})">Delete</button>`;
}
