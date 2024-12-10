// Get the form object
let addOrderForm = document.getElementById('add-order-form-ajax');

// Add an event listener to handle the form submission
addOrderForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting the usual way
    e.preventDefault();

    // Get the form fields and their values
    let inputOrderDate = document.getElementById("input-orderDate");
    let inputCustomerID = document.getElementById("input-customer");
    let inputTotalAmount = document.getElementById("input-totalAmount");

    let orderDateValue = inputOrderDate.value;
    let customerIDValue = inputCustomerID.value || null;
    let totalAmountValue = inputTotalAmount.value;

    // Create the data object we will send with the request
    let data = {
        orderDate: orderDateValue,
        customerID: customerIDValue,
        totalAmount: totalAmountValue
    };

    // Set up our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Define the callback function to handle the response
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Parse the response, assuming the server returns the new order
            let response = JSON.parse(xhttp.responseText);
            let newOrder = response[0];  // Assuming the response is an array with one object

            // Dynamically add the new order to the table
            addRowToTable(newOrder);

            // Clear the form fields after submission
            inputOrderDate.value = '';
            inputCustomerID.value = '';
            inputTotalAmount.value = '';
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("Error adding order.");
        }
    };

    // Send the AJAX request with the data
    xhttp.send(JSON.stringify(data));
});

// Function to dynamically add the new order to the table
function addRowToTable(newOrder) {
    let table = document.getElementById("order-table").getElementsByTagName('tbody')[0];

    // Create a new row
    let newRow = table.insertRow(table.rows.length);

    // Insert cells for each order attribute
    let cell1 = newRow.insertCell(0);
    let cell2 = newRow.insertCell(1);
    let cell3 = newRow.insertCell(2);
    let cell4 = newRow.insertCell(3);
    let cell5 = newRow.insertCell(4);
    let cell6 = newRow.insertCell(5);
    let cell7 = newRow.insertCell(6);

    // Set the text for each cell
    cell1.textContent = newOrder.orderID;
    cell2.textContent = newOrder.orderDate;
    cell3.textContent = newOrder.customerID;
    cell4.textContent = newOrder.totalAmount;
    cell5.textContent = newOrder.teamID;
    cell6.textContent = newOrder.playerID;

    // Add a delete button in the last cell
    cell7.innerHTML = `<button onclick="deleteOrder(${newOrder.orderID})">Delete</button>`;
}
