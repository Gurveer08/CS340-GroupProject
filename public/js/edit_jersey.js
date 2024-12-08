// Get the objects we need to modify
let updateJerseyForm = document.getElementById('update-jersey-form-ajax');

// Modify the objects we need
updateJerseyForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputJerseyId = document.getElementById("update-input-jerseyID-ajax");
    let inputTeam = document.getElementById("update-input-teamID-ajax");
    let inputPlayer = document.getElementById("update-input-playerID-ajax");
    let inputSize = document.getElementById("update-input-size-ajax");
    let inputInventoryCount = document.getElementById("update-input-inventoryCount-ajax");
    let inputPrice = document.getElementById("update-input-price-ajax");


    // Get the values from the form fields
    let jerseyIdValue = inputJerseyId.value;
    let teamValue = inputTeam.value;
    let playerValue = inputPlayer.value;
    let sizeValue = inputSize.value;
    let inventoryCountValue = inputInventoryCount.value;
    let priceValue = inputPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        jerseyID: jerseyIdValue,
        teamID: teamValue,
        playerID: playerValue,
        size: sizeValue,
        inventoryCount: inventoryCountValue,
        price: priceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/edit-jersey-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateTableRow(xhttp.response, jerseyIdValue);

            // Clear the input fields for another transaction
            inputJerseyId.value = '';
            inputTeam.value = '';
            inputPlayer.value = '';
            inputSize.value = '';
            inputPrice.value = '';
            inputInventoryCount.value = '';
            inputPrice.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

function updateTableRow(updatedJersey, jerseyID) {
    let parsedData = JSON.parse(updatedJersey)[0];

    let table = document.getElementById("jersey-table");

    const rows = table.tBodies[0].rows;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // Check if the row's data-value attribute matches the target value
        if (row.dataset.value === jerseyID.toString()) {
            // Update the matching row
            const cells = row.cells;

            cells[1].textContent = parsedData.teamName;
            cells[2].textContent = parsedData.playerName;
            cells[3].textContent = parsedData.size;
            cells[4].textContent = parsedData.price;
            cells[5].textContent = parsedData.inventoryCount;

            break; // Exit loop once row is deleted
        }
    }
}