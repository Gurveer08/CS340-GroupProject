//Refrencing the CS340 repository https://github.com/osu-cs340-ecampus/nodejs-starter-app.git 


// Get the objects we need to modify
let updateOrderItemsForm = document.getElementById('update-order-item-form-ajax');

// Modify the objects we need
updateOrderItemsForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderItemID = document.getElementById("update-input-orderItemID-ajax");
    let inputOrder = document.getElementById("update-input-order-ajax");
    let inputJersey = document.getElementById("update-input-jersey-ajax");
    let inputQuantity = document.getElementById("update-input-quantity-ajax");
    let inputPriceEach = document.getElementById("update-input-priceEach-ajax");


    // Get the values from the form fields
    let OrderItemIDValue = inputOrderItemID.value;
    let OrderValue = inputOrder.value;
    let JerseyValue = inputJersey.value;
    let QuantityValue = inputQuantity.value;
    let PriceEachValue = inputPriceEach.value;

    // Put our data we want to send in a javascript object
    let data = {
        orderItemID: OrderItemIDValue,
        orderID: OrderValue,
        jerseyID: JerseyValue,
        quantity: QuantityValue,
        priceEach: PriceEachValue,
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/edit-order-items-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            updateTableRow(xhttp.response, OrderItemIDValue);

            // Clear the input fields for another transaction
            inputOrderItemID.value = '';
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

function updateTableRow(updatedOrderItem, orderItemID) {
    let parsedData = JSON.parse(updatedOrderItem)[0];
    let table = document.getElementById("order-item-table");

    const rows = table.tBodies[0].rows;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];

        // Check if the row's data-value attribute matches the target value
        if (row.dataset.value === orderItemID.toString()) {
            // Update the matching row
            const cells = row.cells;

            cells[1].textContent = parsedData.jerseyID;
            cells[2].textContent = parsedData.orderID;
            cells[3].textContent = parsedData.teamName;
            cells[4].textContent = parsedData.playerName;
            cells[5].textContent = parsedData.quantity;
            cells[6].textContent = parsedData.priceEach;


            break; // Exit loop once row is deleted
        }
    }
}