//Refrencing the CS340 repository https://github.com/osu-cs340-ecampus/nodejs-starter-app.git 


function deleteTeam(teamID) {
    let link = '/delete-team-ajax/';
    let data = {
      id: teamID
    };
  
    $.ajax({
      url: link,
      type: 'DELETE',
      data: JSON.stringify(data),
      contentType: "application/json; charset=utf-8",
      success: function(result) {
        deleteRow(teamID);
      }
    });
  }
  
  function deleteRow(teamID){
      let table = document.getElementById("team-table");

      const rows = table.tBodies[0].rows;

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i];
        // Check if the row's data-value attribute matches the target value
        if (row.dataset.value === teamID.toString()) {
            // Delete the matching row
            table.deleteRow(i+1);
            rowFound = true;
            break; // Exit loop once row is deleted
        }
    }
  }