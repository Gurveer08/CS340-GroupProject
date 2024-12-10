// Get the objects we need to modify
let updateTeamForm = document.getElementById('update-team-form-ajax');

// Modify the objects we need
updateTeamForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTeamID = document.getElementById("input-update-teamID");
    let inputTeamName = document.getElementById("input-update-teamName");
    let inputCity = document.getElementById("input-update-city");

    // Get the values from the form fields
    let teamIDValue = inputTeamID.value;
    let teamNameValue = inputTeamName.value;
    let cityValue = inputCity.value;

    // Put our data we want to send in a javascript object
    let data = {
        teamID: teamIDValue,
        teamName: teamNameValue,
        city: cityValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-team-ajax");  
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the updated data to the table
            updateTeamRow(xhttp.response, teamIDValue);

            // Clear the input fields for another transaction
            inputTeamID.value = '';
            inputTeamName.value = '';
            inputCity.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// Function to update the team row in the table
function updateTeamRow(updatedTeam, teamID) {
    let parsedData = JSON.parse(updatedTeam)[0];

    let table = document.getElementById("team-table");

    const rows = table.tBodies[0].rows;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // Check if the row's data-value attribute matches the target value
        if (row.dataset.value === teamID.toString()) {
            // Update the matching row
            const cells = row.cells;

            cells[1].textContent = parsedData.teamName;
            cells[2].textContent = parsedData.city;

            break; // Exit loop once row is updated
        }
    }
}
