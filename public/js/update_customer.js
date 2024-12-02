// Get the objects we need to modify
let updateCustomerForm = document.getElementById('update-customer-form-ajax');

// Modify the objects we need
updateCustomerForm.addEventListener("submit", function (e) {
    // Prevent the form from submitting
    e.preventDefault();

    // Get form fields we need to get data from
    let inputcustomerID = document.getElementById("input-update-customer-ID");
    let inputfirstName = document.getElementById("input-update-firstName-ajax");
    let inputlastName = document.getElementById("input-update-lastName-ajax");
    let inputemail = document.getElementById("input-update-email");
    let inputaddress = document.getElementById("input-update-address");
    let inputphone = document.getElementById("input-update-phone")

    // Get the values from the form fields
    let customerIDValue = inputcustomerID.value;
    let firstNameValue = inputfirstName.value;
    let lastNameValue = inputlastName.value;
    let emailValue = inputemail.value;
    let addressValue = inputaddress.value;
    let phoneValue = inputphone.value;


    console.log(customerIDValue);
    console.log(firstNameValue);
    console.log(lastNameValue)
    console.log(emailValue);
    console.log(addressValue);
    console.log(phoneValue);

    // Abort if required fields are empty
    if (!customerIDValue || !firstNameValue || !lastNameValue || !emailValue) {
        console.log("Missing required fields.");
        return;
    }

    // Put our data we want to send in a JavaScript object
    let data = {
        customerID: customerIDValue,
        firstName: firstNameValue,
        lastName: lastNameValue,
        email: emailValue,
        address: addressValue,
        phone: phoneValue
    };

    // Setup our AJAX request
    var xhttp = new XMLHttpRequest();
    xhttp.open("PUT", "/put-customer-ajax", true);
    xhttp.setRequestHeader("Content-type", "application/json");

    // Tell our AJAX request how to resolve
    xhttp.onreadystatechange = () => {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            // Update the row in the table
            updateRow(xhttp.response, customerIDValue);
        } else if (xhttp.readyState == 4 && xhttp.status != 200) {
            console.log("There was an error with the input.");
        }
    };

    // Send the request and wait for the response
    xhttp.send(JSON.stringify(data));
});

function updateRow(data, customerID) {
    let parsedData = JSON.parse(data)[0];

    // let table = document.getElementById("customers-table");

    // for (let i = 0, row; (row = table.rows[i]); i++) {
    //     // Iterate through rows
    //     if (table.rows[i].getAttribute("data-value") == customerID) {
    //         // Get the location of the row where we found the matching team player ID
    //         let updateRowIndex = table.getElementsByTagName("tr")[i];

    //         // Update table cells with the new data
    //         updateRowIndex.getElementsByTagName("td")[1].innerHTML = parsedData.customerID;
    //         updateRowIndex.getElementsByTagName("td")[2].innerHTML = parsedData.firstName;
    //         updateRowIndex.getElementsByTagName("td")[3].innerHTML = parsedData.lastName;
    //         updateRowIndex.getElementsByTagName("td")[4].innerHTML = parsedData.email;
    //         updateRowIndex.getElementsByTagName("td")[5].innerHTML = parsedData.address;
    //         updateRowIndex.getElementsByTagName("td")[6].innerHTML = parsedData.phone;


    //     }
    // }

    let table = document.getElementById("customer-table");

      const rows = table.tBodies[0].rows;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // Check if the row's data-value attribute matches the target value
        if (row.dataset.value === customerID.toString()) {
            // Update the matching row
            row.getElementsByTagName("td")[1].innerHTML = parsedData.firstName;
            row.getElementsByTagName("td")[2].innerHTML = parsedData.lastName;
            row.getElementsByTagName("td")[3].innerHTML = parsedData.email;
            row.getElementsByTagName("td")[4].innerHTML = parsedData.address;
            row.getElementsByTagName("td")[5].innerHTML = parsedData.phone;

            break; // Exit loop once row is updated
        }
    }
}