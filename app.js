// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server 
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

PORT        = 9124;                 // Set a port number at the top so it's easy to change in the future

const { engine } = require('express-handlebars');
var exphbs = require('express-handlebars');     // Import express-handlebars
app.engine('.hbs', engine({extname: ".hbs"}));  // Create an instance of the handlebars engine to process templates
app.set('view engine', '.hbs');                 // Tell express to use the handlebars engine whenever it encounters a *.hbs file.
/*
    ROUTES
*/
app.get('/', function(req, res){

    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/orders', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT * FROM Orders;"
    // let query2 = "SELECT * FROM Players;";
    // let query3 = "SELECT * FROM Teams;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let orders = rows;
        
        // db.pool.query(query2, function(error, rows, fields){

        //     let players = rows;

        //     db.pool.query(query3, function(error, rows, fields) {

        //         let teams = rows;

        //         return res.render('jerseys', {data: jerseys, players: players, teams: teams});
        //     });
        // });        
        return res.render('orders', {data: orders});

    });
});

app.get('/customers', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT * FROM Customers;"
    // let query2 = "SELECT * FROM Players;";
    // let query3 = "SELECT * FROM Teams;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let customers = rows;
        
        // db.pool.query(query2, function(error, rows, fields){

        //     let players = rows;

        //     db.pool.query(query3, function(error, rows, fields) {

        //         let teams = rows;

        //         return res.render('jerseys', {data: jerseys, players: players, teams: teams});
        //     });
        // });        
        return res.render('customers', {data: customers});

    });
});


app.get('/jerseys', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT  Jerseys.jerseyID, Teams.teamName, Players.playerName, Jerseys.size, Jerseys.price, Jerseys.inventoryCount FROM Jerseys INNER JOIN Teams ON Jerseys.teamID = Teams.teamID INNER JOIN Players ON Jerseys.playerID = Players.playerID;";
    let query2 = "SELECT * FROM Players;";
    let query3 = "SELECT * FROM Teams;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let jerseys = rows;
        
        db.pool.query(query2, function(error, rows, fields){

            let players = rows;

            db.pool.query(query3, function(error, rows, fields) {

                let teams = rows;

                return res.render('jerseys', {data: jerseys, players: players, teams: teams});
            });
        });        
    });
});
app.get('/orderItems', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT * FROM orderItems;"


    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
  
        let customers = rows;
       
        return res.render('orderItems', {data: customers});

    });
});
app.get('/teams', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT * FROM teams;"


    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
  
        let customers = rows;
       
        return res.render('teams', {data: customers});

    });
});
app.get('/players', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT * FROM players;"


    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
  
        let customers = rows;
       
        return res.render('players', {data: customers});

    });
});

    app.post('/add-jersey-ajax', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Capture NULL values
        // let team = parseInt(data['input-teamID']);
        // if (isNaN(team))
        // {
        //     team = 'NULL'
        // }

        let team = parseInt(data.teamID);
        if (isNaN(team))
        {
            team = 'NULL'
        }

        // let player = parseInt(data['input-playerID']);
        // if (isNaN(player))
        // {
        //     player = 'NULL'
        // }

        let player = parseInt(data.playerID);
        if (isNaN(player))
        {
            player = 'NULL'
        }

        // let price = parseFloat(data['input-price']);
        // if (isNaN(price))
        // {
        //     price = 'NULL'
        // }

        let price = parseFloat(data.price);
        if (isNaN(price))
        {
            price = 'NULL'
        }

        // let inventoryCount = parseInt(data['input-inventoryCount']);
        // if (isNaN(inventoryCount))
        // {
        //     inventoryCount = 'NULL'
        // }

        let inventoryCount = parseFloat(data.inventoryCount);
        if (isNaN(inventoryCount))
        {
            inventoryCount = 'NULL'
        }

        // let size = data['input-size'];
    
        // Create the query and run it on the database
        let query1 = `INSERT INTO Jerseys (teamID, playerID, size, price, inventoryCount) VALUES (${team}, ${player}, '${data.size}', ${price}, ${inventoryCount});`;
        db.pool.query(query1, function(error, rows, fields){
    
            // Check to see if there was an error
            if (error) {
    
                // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                console.log(error)
                res.sendStatus(400);
            }
    
            // If there was no error, we redirect back to our root route, which automatically runs the SELECT * FROM bsg_people and
            // presents it on the screen
            else
            {

                let query2 = "SELECT Jerseys.jerseyID, Teams.teamName, Players.playerName, Jerseys.size, Jerseys.price, Jerseys.inventoryCount FROM Jerseys INNER JOIN Teams ON Jerseys.teamID = Teams.teamID INNER JOIN Players ON Jerseys.playerID = Players.playerID;";
                db.pool.query(query2, function(error, rows, fields){

                    // If there was an error on the second query, send a 400
                    if (error) {
                        
                        // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
                        console.log(error);
                        res.sendStatus(400);
                    }
                    // If all went well, send the results of the query back.
                    else
                    {
                        res.send(rows);
                    }
                })
            }
        });
    });
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
}); 

// app.js

// Database
var db = require('./database/db-connector')  


app.delete('/delete-jersey-ajax/', function(req,res,next){
    let data = req.body;
    let jerseyID = parseInt(data.id);
    // let deleteBsg_Cert_People = `DELETE FROM bsg_cert_people WHERE pid = ?`;
    // let deleteBsg_People= `DELETE FROM bsg_people WHERE id = ?`;
    let deleteJerseys = `DELETE FROM Jerseys WHERE jerseyID = ?`;
    let deleteOrderItems = `DELETE FROM OrderItems WHERE jerseyID = ?`
  
        // Run the 1st query
        db.pool.query(deleteOrderItems, [jerseyID], function(error, rows, fields){
            if (error) {

            // Log the error to the terminal so we know what went wrong, and send the visitor an HTTP response 400 indicating it was a bad request.
            console.log(error);
            res.sendStatus(400);
            }

          else
          {
              // Run the second query
              db.pool.query(deleteJerseys, [jerseyID], function(error, rows, fields) {

                  if (error) {
                      console.log(error);
                      res.sendStatus(400);
                  } else {
                      res.sendStatus(204);
                    //   res.redirect('/jerseys');
                  }
              })
          }
    })
});
  


