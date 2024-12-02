// Get the objects we need to modify
let addcustomerForm = document.getElementById('add-customer-form-ajax');

// Modify the objects we need
addcustomerForm.addEventListener("submit", function (e) {
    
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    // let inputCustomer = document.getElementById("input-customerID-ajax");
    let inputFirstName = document.getElementById("input-firstName-ajax");
    let inputLastName = document.getElementById("input-lastName-ajax");
    let inputEmail = document.getElementById("input-email-ajax");
    let inputAddress = document.getElementById("input-address-ajax");
    let inputPhone = document.getElementById("input-phone-ajax");


    // Get the values from the form fields
    // let inputCustomer = inputcustomerID.value;
    let firstNameValue = inputFirstName.value;
    let lastNameValue = inputLastName.value;
    let addressValue = inputAddress.value;
    let phoneValue = inputPhone.value;
    let emailValue = inputEmail.value;

    // Put our data we want to send in a javascript object
    let data = {
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        address: addressValue,
        phone: phoneValue
    }
    
    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "/add-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {

            // Add the new data to the table
            addRowToTable(xhttp.response);

            // Clear the input fields for another transaction
            inputFirstName.value = '';
            inputLastName.value = '';
            inputEmail.value = '';
            inputAddress.value = '';
            inputPhone.value = '';
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
    let currentTable = document.getElementById("customer-table");

    // Get the location where we should insert the new row (end of table)
    let parsedData = JSON.parse(data);
    let newRow = parsedData[parsedData.length - 1];

    console.log(newRow);

    // Create a row and 5 cells
    let row = document.createElement("TR");
    row.setAttribute('data-value', newRow.customerID);
    let idCell = document.createElement("TD");
    let firstNameCell = document.createElement("TD");
    let lastNameCell = document.createElement("TD");
    let emailCell = document.createElement("TD");
    let addressCell = document.createElement("TD");
    let phoneCell = document.createElement("TD");


    let deleteButton = document.createElement("TD");

    // Fill the cells with correct data
    idCell.innerText = newRow.customerID;   
    firstNameCell.innerText = newRow.firstName;
    lastNameCell.innerText = newRow.lastName;
    emailCell.innerText = newRow.email;
    addressCell.innerText = newRow.address;
    phoneCell.innerText = newRow.phone
    deleteButton.innerHTML = `<button onclick="deleteCustomer(` + newRow.customerID + `)">Delete</button>`;

    // Add the cells to the row
    row.appendChild(idCell);
    row.appendChild(firstNameCell);
    row.appendChild(lastNameCell);
    row.appendChild(emailCell);
    row.appendChild(addressCell);
    row.appendChild(phoneCell);
    row.appendChild(deleteButton);

    // Add the row to the table
    currentTable.tBodies[0].appendChild(row);
}