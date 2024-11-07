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
  
  function deleteRow(jerseyID){
      let table = document.getElementById("jersey-table");
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == jerseyID) {
              table.deleteRow(i);
              break;
         }
      }
  }