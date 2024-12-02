function deleteCustomer(customerID) {
    let link = '/delete-customer-ajax/';
    let data = {
      id: customerID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(customerID);
      }
    });
  }
  
  function deleteRow(customerID){
      let table = document.getElementById("customer-table");

      const rows = table.tBodies[0].rows;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // Check if the row's data-value attribute matches the target value
        if (row.dataset.value === customerID.toString()) {
            // Delete the matching row
            table.deleteRow(i+1);
            rowFound = true;
            break; // Exit loop once row is deleted
        }
    }
  }