// Get the objects we need to modify
let addOrderForm = document.getElementById('add-order-form-ajax');

// Modify the objects we need
addOrderForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderDate = document.getElementById("input-orderDate");
    let inputCustomerID = document.getElementById("input-customerID");
    let inputTotalAmount = document.getElementById("input-totalAmount");

    // Get the values from the form fields
    let orderDateValue = inputOrderDate.value;
    let customerIDValue = inputCustomerID.value;
    let totalAmountValue = inputTotalAmount.value;

    // Put our data we want to send in a JavaScript object
    let data = {
        orderDate: orderDateValue,
        customerID: customerIDValue,
        totalAmount: totalAmountValue
    };
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-order-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputOrderDate.value = '';
            inputCustomerID.value = '';
            inputTotalAmount.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));

});


// Creates a single row from an Object representing a single record from 
// Orders
addRowToTable = (data) => {

    // Get a reference to the current table on the page
    let currentTable = document.getElementById("order-table");

    // Get the last object from the database query response
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    console.log(newRow);

    // Create a row and cells for each property of the order
    let row = document.createElement("TR");
    row.setAttribute('data-value', newRow.orderID);
    let orderIDCell = document.createElement("TD");
    let orderDateCell = document.createElement("TD");
    let customerIDCell = document.createElement("TD");
    let totalAmountCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let deleteButton = document.createElement("TD");

    // Fill the cells with correct data
    orderIDCell.innerText = newRow.orderID;
    orderDateCell.innerText = newRow.orderDate;
    customerIDCell.innerText = newRow.customerID;
    firstNameCell.innerText = newRow.firstName;
    lastNameCell.innerText = newRow.lastName;
    totalAmountCell.innerText = newRow.totalAmount;
    deleteButton.innerHTML = `<button onclick="deleteOrder(${newRow.orderID})">Delete</button>`;

    // Add the cells to the row
    row.appendChild(orderIDCell);
    row.appendChild(orderDateCell);
    row.appendChild(customerIDCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(totalAmountCell);
    row.appendChild(deleteButton);

    // Add the row to the table
    currentTable.tBodies[0].appendChild(row);
}
