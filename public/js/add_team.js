// Get the objects we need to modify
let addTeamForm = document.getElementById('add-team-form-ajax');

// Modify the objects we need
addTeamForm.addEventListener("submit", function (e) {

    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTeamName = document.getElementById("input-teamName");
    let inputCity = document.getElementById("input-city");

    // Get the values from the form fields
    let teamNameValue = inputTeamName.value;
    let cityValue = inputCity.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        teamName: teamNameValue,
        city: cityValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-team-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            let response = JSON.parse(xhttp.responseText);
            let newTeam = response[0]; // Assume the server returns an array of one object

            // Dynamically add the new row to the table
            addRowToTable(newTeam);

            // Clear the form fields after submission
            document.getElementById("input-teamName").value = '';
            document.getElementById("input-city").value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Error adding team.");
        }
    };

    // Send the AJAX request
    xhttp.send(JSON.stringify(data));
});

// Function to dynamically add the new row to the table
function addRowToTable(newTeam) {
    let table = document.getElementById("team-table").getElementsByTagName('tbody')[0];

    // Create a new row
    let newRow = table.insertRow(table.rows.length);

    // Insert the cells for Team ID, Team Name, and City
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);

    // Set the text for each cell
    cell1.textContent = newTeam.teamID;
    cell2.textContent = newTeam.teamName;
    cell3.textContent = newTeam.city;
    
    // Optionally, add a delete button or other functionality
    let cell4 = newRow.insertCell(3);
    cell4.innerHTML = `<button onclick="deleteTeam(${newTeam.teamID})">Delete</button>`;
}