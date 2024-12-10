// Get the objects we need to modify
let updateOrderForm = document.getElementById('update-order-form-ajax');

// Modify the objects we need
updateOrderForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputOrderID = document.getElementById("input-update-orderID");
    let inputOrderDate = document.getElementById("input-update-orderDate");
    let inputCustomerID = document.getElementById("input-update-customerID");
    let inputTotalAmount = document.getElementById("input-update-totalAmount");

    // Get the values from the form fields
    let orderIDValue = inputOrderID.value;
    let orderDateValue = inputOrderDate.value;
    let customerIDValue = inputCustomerID.value || null;
    let totalAmountValue = inputTotalAmount.value;

    // Put our data we want to send in a javascript object
    let data = {
        orderID: orderIDValue,
        orderDate: orderDateValue,
        customerID: customerIDValue,
        totalAmount: totalAmountValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-order-ajax");  
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the updated data to the table
            updateTableRow(xhttp.response, orderIDValue);

            // Clear the input fields for another transaction
            inputOrderID.value = '';
            inputOrderDate.value = '';
            inputCustomerID.value = '';
            inputTotalAmount.value = '';
        }
        else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.")
        }
    }

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
})

// Function to update the order row in the table
function updateTableRow(updatedOrder, orderID) {
    let parsedData = JSON.parse(updatedOrder)[0];

    let table = document.getElementById("order-table");

    const rows = table.tBodies[0].rows;

    for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // Check if the row's data-value attribute matches the target value
        if (row.dataset.value === orderID.toString()) {
            // Update the matching row
            const cells = row.cells;

            cells[1].textContent = parsedData.orderDate;
            cells[2].textContent = parsedData.customerID;
            cells[3].textContent = parsedData.totalAmount;


            break; // Exit loop once row is updated
        }
    }
}
