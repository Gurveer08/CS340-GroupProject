// Get the objects we need to modify
let addJerseyForm = document.getElementById('add-jersey-form-ajax');

// Modify the objects we need
addJerseyForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputTeam = document.getElementById("input-teamID-ajax");
    let inputPlayer = document.getElementById("input-playerID-ajax");
    let inputSize = document.getElementById("input-size");
    let inputInventoryCount = document.getElementById("input-inventoryCount");
    let inputPrice = document.getElementById("input-price");


    // Get the values from the form fields
    let teamValue = inputTeam.value;
    let playerValue = inputPlayer.value;
    let sizeValue = inputSize.value;
    let inventoryCountValue = inputInventoryCount.value;
    let priceValue = inputPrice.value;

    // Put our data we want to send in a javascript object
    let data = {
        teamID: teamValue,
        playerID: playerValue,
        size: sizeValue,
        inventoryCount: inventoryCountValue,
        price: priceValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-jersey-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputTeam.value = '';
            inputPlayer.value = '';
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


// Creates a single row from an Object representing a single record from 
// Jerseys
addRowToTable = (data) => {

    // Get a reference to the current table on the page and clear it out.
    let currentTable = document.getElementById("jersey-table");

    // Get the location where we should insert the new row (end of table)
    // let newRowIndex = currentTable.rows.length;

    // Get a reference to the new row from the database query (last object)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1]

    console.log(newRow);

    // Create a row and 4 cells
    let row = document.createElement("TR");
    let idCell = document.createElement("TD");
    let playerCell = document.createElement("TD");
    let teamCell = document.createElement("TD");
    let sizeCell = document.createElement("TD");
    let priceCell = document.createElement("TD");
    let inventoryCountCell = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.jerseyID;
    playerCell.innerText = newRow.player;
    teamCell.innerText = newRow.team;
    sizeCell.innerText = newRow.size;
    priceCell.innerText = newRow.price;
    inventoryCountCell.innerText = newRow.inventoryCount;

    // Add the cells to the row 
    row.appendChild(idCell);
    row.appendChild(playerCell);
    row.appendChild(teamCell);
    row.appendChild(sizeCell);
    row.appendChild(priceCell);
    row.appendChild(inventoryCountCell);
    
    // Add the row to the table
    currentTable.appendChild(row);
}