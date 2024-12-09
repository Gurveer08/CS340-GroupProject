//Refrencing the CS340 repository https://github.com/osu-cs340-ecampus/nodejs-starter-app.git 


function deleteOrder(orderID) {
    let link = '/delete-order-ajax/';
    let data = {
      id: orderID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(orderID);
      }
    });
  }
  
  function deleteRow(orderID){
      let table = document.getElementById("order-table");

      const rows = table.tBodies[0].rows;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // Check if the row's data-value attribute matches the target value
        if (row.dataset.value === orderID.toString()) {
            // Delete the matching row
            table.deleteRow(i+1);
            rowFound = true;
            break; // Exit loop once row is deleted
        }
    }
  }