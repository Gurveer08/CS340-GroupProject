// Get the objects we need to modify
let addOrderItemsForm = document.getElementById('add-order-item-form-ajax');

// Modify the objects we need
addOrderItemsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    // let inputCustomer = document.getElementById("input-customerID-ajax");
    let inputOrder = document.getElementById("input-orderID-ajax");
    let inputJersey = document.getElementById("input-jerseyID-ajax");
    let inputQuantity = document.getElementById("input-quantity-ajax");
    let inputPriceEach = document.getElementById("input-priceEach-ajax");


    // Get the values from the form fields
    // let inputCustomer = inputcustomerID.value;
    let orderValue = inputOrder.value;
    let jerseyValue = inputJersey.value;
    let quantityValue = inputQuantity.value;
    let priceEachValue = inputPriceEach.value;

    // Put our data we want to send in a javascript object
    let data = {
        order: orderValue,
        jersey: jerseyValue,
        quantity: quantityValue,
        priceEach: priceEachValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-orderItem-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrder.value = '';
            inputJersey.value = '';
            inputQuantity.value = '';
            inputPriceEach.value = '';
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
    let currentTable = document.getElementById("order-item-table");

    // Get the location where we should insert the new row (end of table)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    console.log(newRow);

    // Create a row and 5 cells
    let row = document.createElement("TR");
    row.setAttribute('data-value', newRow.orderItemID);
    let idCell = document.createElement("TD");
    let orderCell = document.createElement("TD");
    let jerseyCell = document.createElement("TD");
    let teamCell = document.createElement("TD");
    let playerCell = document.createElement("TD");
    let quantityCell = document.createElement("TD");
    let priceEachCell = document.createElement("TD");

    let deleteButton = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.orderItemID;
    orderCell.innerText = newRow.orderID;
    jerseyCell.innerText = newRow.jerseyID;
    teamCell.innerText = newRow.teamName;
    playerCell.innerText = newRow.playerName;
    quantityCell.innerText = newRow.quantity;
    priceEachCell.innerText = newRow.priceEach
    deleteButton.innerHTML = `<button onclick="deleteOrderItem(` + newRow.orderItemID + `)">Delete</button>`;

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(orderCell);
    row.appendChild(jerseyCell);
    row.appendChild(teamCell);
    row.appendChild(playerCell);
    row.appendChild(quantityCell);
    row.appendChild(priceEachCell);
    row.appendChild(deleteButton);

    // Add the row to the table
    currentTable.tBodies[0].appendChild(row);
}