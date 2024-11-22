// Get the objects we need to modify
let updateTeamPlayerForm = document.getElementById('update-team-player-form-ajax');

// Modify the objects we need
updateTeamPlayerForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTeamPlayerID = document.getElementById("input-update-team-player-ID");
    let inputTeamID = document.getElementById("input-update-teamID-ajax");
    let inputPlayerID = document.getElementById("input-update-playerID-ajax");
    let inputStartDate = document.getElementById("input-update-startDate");
    let inputEndDate = document.getElementById("input-update-endDate");

    // Get the values from the form fields
    let teamPlayerIDValue = inputTeamPlayerID.value;
    let teamIDValue = inputTeamID.value;
    let playerIDValue = inputPlayerID.value;
    let startDateValue = inputStartDate.value;
    let endDateValue = inputEndDate.value;

    console.log(teamPlayerIDValue);
    console.log(teamIDValue);
    console.log(inputTeamID)
    console.log(playerIDValue);
    console.log(startDateValue);
    console.log(endDateValue);

    // Abort if required fields are empty
    if (!teamPlayerIDValue || !teamIDValue || !playerIDValue || !startDateValue) {
        console.log("Missing required fields.");
        return;
    }

    // Put our data we want to send in a JavaScript object
    let data = {
        teamPlayerID: teamPlayerIDValue,
        teamID: teamIDValue,
        playerID: playerIDValue,
        startDate: startDateValue,
        endDate: endDateValue,
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-team-player-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update the row in the table
            updateRow(xhttp.response, teamPlayerIDValue);
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

function updateRow(data, teamPlayerID) {
    let parsedData = JSON.parse(data);

    let table = document.getElementById("team-player-table");

    for (let i = 0, row; (row = table.rows[i]); i++) {
        // Iterate through rows
        if (table.rows[i].getAttribute("data-value") == teamPlayerID) {
            // Get the location of the row where we found the matching team player ID
            let updateRowIndex = table.getElementsByTagName("tr")[i];

            // Update table cells with the new data
            updateRowIndex.getElementsByTagName("td")[1].innerHTML = parsedData.teamName;
            updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData.playerName;
            updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData.startDate;
            updateRowIndex.getElementsByTagName("td")[4].innerHTML = parsedData.endDate;
        }
    }
}
