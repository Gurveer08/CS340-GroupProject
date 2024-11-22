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
      for (let i = 0, row; row = table.rows[i]; i++) {
         if (table.rows[i].getAttribute("data-value") == teamPlayerID) {
              table.deleteRow(i);
              break;
         }
      }
  }