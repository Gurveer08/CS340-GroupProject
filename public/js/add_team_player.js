//Refrencing the CS340 repository https://github.com/osu-cs340-ecampus/nodejs-starter-app.git 


// Get the objects we need to modify
let addTeamPlayerForm = document.getElementById('add-team-player-form-ajax');

// Modify the objects we need
addTeamPlayerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTeam = document.getElementById("input-teamID-ajax");
    let inputPlayer = document.getElementById("input-playerID-ajax");
    let inputStartDate = document.getElementById("input-startDate");
    let inputEndDate = document.getElementById("input-endDate");

    // Get the values from the form fields
    let teamValue = inputTeam.value;
    let playerValue = inputPlayer.value;
    let startDateValue = inputStartDate.value;
    let endDateValue = inputEndDate.value;

    // Put our data we want to send in a javascript object
    let data = {
        teamID: teamValue,
        playerID: playerValue,
        startDate: startDateValue,
        endDate: endDateValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-team-player-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
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

// Creates a single row from an Object representing a single record from Team players
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("team-player-table");

    // Get the location where we should insert the new row (end of table)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    console.log(newRow);

    // Create a row and 5 cells
    let row = document.createElement("TR");
    row.setAttribute('data-value', newRow.teamPlayerID);
    let idCell = document.createElement("TD");
    let teamCell = document.createElement("TD");
    let playerCell = document.createElement("TD");
    let startDateCell = document.createElement("TD");
    let endDateCell = document.createElement("TD");
    let deleteButton = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.teamPlayerID;   
    teamCell.innerText = newRow.teamName;
    playerCell.innerText = newRow.playerName;
    startDateCell.innerText = newRow.startDate;
    endDateCell.innerText = newRow.endDate;
    deleteButton.innerHTML = `<button onclick="deleteTeamPlayer(` + newRow.teamPlayerID + `)">Delete</button>`;

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(teamCell);
    row.appendChild(playerCell);
    row.appendChild(startDateCell);
    row.appendChild(endDateCell);
    row.appendChild(deleteButton);

    // Add the row to the table
    currentTable.tBodies[0].appendChild(row);
}
