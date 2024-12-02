function deleteTeamPlayer(teamPlayerID) {
    let link = '/delete-team-player-ajax/';
    let data = {
      id: teamPlayerID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(teamPlayerID);
      }
    });
  }
  
  function deleteRow(teamPlayerID){
      let table = document.getElementById("team-player-table");

      const rows = table.tBodies[0].rows;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // Check if the row's data-value attribute matches the target value
        if (row.dataset.value === teamPlayerID.toString()) {
            // Delete the matching row
            table.deleteRow(i+1);
            rowFound = true;
            break; // Exit loop once row is deleted
        }
    }
  }