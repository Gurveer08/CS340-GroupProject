function deleteJersey(jerseyID) {
    let link = '/delete-jersey-ajax/';
    let data = {
      id: jerseyID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(jerseyID);
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

  function deleteRow(jerseyID){
    let table = document.getElementById("jersey-table");

    const rows = table.tBodies[0].rows;

    for (let i = 0; i < rows.length; i++) {
      const row = rows[i];
      // Check if the row's data-value attribute matches the target value
      if (row.dataset.value === jerseyID.toString()) {
          // Delete the matching row
          table.deleteRow(i+1);
          rowFound = true;
          break; // Exit loop once row is deleted
      }
  }
}


