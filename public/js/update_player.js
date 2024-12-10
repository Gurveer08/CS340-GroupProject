// Get the objects we need to modify
let updatePlayerForm = document.getElementById('update-player-form-ajax');

// Modify the objects we need
updatePlayerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputPlayerID = document.getElementById("input-playerID");
    let inputPlayerName = document.getElementById("input-update-playerName");

    // Get the values from the form fields
    let playerIDValue = inputPlayerID.value;
    let playerNameValue = inputPlayerName.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        playerID: playerIDValue,
        playerName: playerNameValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-player-ajax");  // Make sure the endpoint matches your backend route
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the updated data to the table
            updatePlayerTableRow(xhttp.response, playerIDValue);

            // Clear the input fields for another transaction
            inputPlayerID.value = '';
            inputPlayerName.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// Function to update the player row in the table
function updatePlayerTableRow(updatedPlayer, playerID) {
    let parsedData = JSON.parse(updatedPlayer)[0];  // Assuming the response contains the updated player data

    let table = document.getElementById("player-table");

    const rows = table.tBodies[0].rows;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // Check if the row's data-value attribute matches the target value
        if (row.dataset.value === playerID.toString()) {
            // Update the matching row
            const cells = row.cells;

            cells[1].textContent = parsedData.playerName;  // Update player name

            break; // Exit loop once row is updated
        }
    }
}
