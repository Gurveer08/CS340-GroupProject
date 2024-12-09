function deleteOrderItem(orderItemID) {
    let link = '/delete-order-item-ajax/';
    let data = {
      id: orderItemID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(orderItemID);
      }
    });
  }
  
  //function deleteRow(jerseyID){
      //let table = document.getElementById("jersey-table");

     // for (let i = 0, row; row = table.rows[i]; i++) {
         //if (table.rows[i].getAttribute("data-value") == jerseyID) {
              //table.deleteRow(i);
             // break;
         //}
     // }
 // }

  function deleteRow(orderItemID){
    let table = document.getElementById("order-item-table");

    const rows = table.tBodies[0].rows;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      // Check if the row's data-value attribute matches the target value
      if (row.dataset.value === orderItemID.toString()) {
          // Delete the matching row
          table.deleteRow(i+1);
          break; // Exit loop once row is deleted
      }
  }
} 

