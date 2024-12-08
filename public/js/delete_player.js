function deletePlayer(playerID) {
    let link = '/delete-player-ajax/';
    let data = {
      id: playerID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(playerID);
      }
    });
  }
  
  function deleteRow(playerID){
      let table = document.getElementById("player-table");

      const rows = table.tBodies[0].rows;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // Check if the row's data-value attribute matches the target value
        if (row.dataset.value === playerID.toString()) {
            // Delete the matching row
            table.deleteRow(i+1);
            rowFound = true;
            break; // Exit loop once row is deleted
        }
    }
  }