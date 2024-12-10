// Get the objects we need to modify
let updateTeamPlayerForm = document.getElementById('update-team-player-form-ajax');

// Modify the objects we need
updateTeamPlayerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTeamPlayerId = document.getElementById("input-update-team-player-ID");
    let inputTeam = document.getElementById("input-update-teamID-ajax");
    let inputPlayer = document.getElementById("input-update-playerID-ajax");
    let inputStartDate = document.getElementById("input-update-startDate");
    let inputEndDate = document.getElementById("input-update-endDate");

    // Get the values from the form fields
    let teamPlayerIdValue = inputTeamPlayerId.value;
    let teamValue = inputTeam.value;
    let playerValue = inputPlayer.value;
    let startDateValue = inputStartDate.value;
    let endDateValue = inputEndDate.value;

    // Put our data we want to send in a javascript object
    let data = {
        teamPlayerID: teamPlayerIdValue,
        teamID: teamValue,
        playerID: playerValue,
        startDate: startDateValue,
        endDate: endDateValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-team-player-ajax");  
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the updated data to the table
            updateTableRow(xhttp.response, teamPlayerIdValue);

            // Clear the input fields for another transaction
            inputTeamPlayerId.value = '';
            inputTeam.value = '';
            inputPlayer.value = '';
            inputStartDate.value = '';
            inputEndDate.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

function updateTableRow(updatedTeamPlayer, teamPlayerID) {
    let parsedData = JSON.parse(updatedTeamPlayer)[0];

    let table = document.getElementById("team-player-table");

    const rows = table.tBodies[0].rows;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // Check if the row's data-value attribute matches the target value
        if (row.dataset.value === teamPlayerID.toString()) {
            // Update the matching row
            const cells = row.cells;

            cells[1].textContent = parsedData.teamName;
            cells[2].textContent = parsedData.playerName;
            cells[3].textContent = parsedData.startDate;
            cells[4].textContent = parsedData.endDate;

            break; // Exit loop once row is updated
        }
    }
}
