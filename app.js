// App.js

/*
    SETUP
*/
var express = require('express');   // We are using the express library for the web server 
var app     = express();            // We need to instantiate an express object to interact with the server in our code
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

PORT        = 15224;                 // Set a port number at the top so it's easy to change in the future

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
    let query2 = "SELECT customerID FROM Customers;"
    // let query2 = "SELECT * FROM Players;";
    // let query3 = "SELECT * FROM Teams;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let orders = rows;

        db.pool.query(query2, function(error, rows, fields){

            let customers = rows;
            return res.render('orders', {data: orders, customers: customers});

        })
        
        // db.pool.query(query2, function(error, rows, fields){

        //     let players = rows;

        //     db.pool.query(query3, function(error, rows, fields) {

        //         let teams = rows;

        //         return res.render('jerseys', {data: jerseys, players: players, teams: teams});
        //     });
        // });        
        // return res.render('orders', {data: orders});

    });
});

// Delete Route for Orders
app.delete('/delete-order-ajax/', function(req,res,next){
    let data = req.body;
    let orderID = parseInt(data.id);

    let deleteOrders = `DELETE FROM Orders WHERE orderID = ?`;
  
        // Run query
        db.pool.query(deleteOrders, [orderID], function(error, rows, fields) {
            if (error) {
                // If error occurs send Error 400 response
                console.log(error);
                res.status(400).send({ message: "Error deleting order." });
            } else {
                // Send a 204 response if delete successful
                res.sendStatus(204);
            }
        });
    });


app.post('/add-order-form-ajax', function (req, res) {
    // Save incoming data
    let data = req.body;

    // Define query to insert new data
    let query = `INSERT INTO Orders (orderID, orderDate, customerID, totalAmount) VALUES (?, ?, ?, ?)`;

    // Insert new data
    db.pool.query(query, [data.orderID, data.orderDate, data.customerID, data.totalAmount], function (error, results, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }

        // Query to retrieve new row for AJAX response
        let query2 = `SELECT * FROM Orders WHERE orderID = ?`;

        db.pool.query(query2, [results.insertId], function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }

            // Send new row data as response
            res.send(rows);
        });
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
    let query1 = "SELECT orderItemID, OrderItems.jerseyID, OrderItems.orderID, Teams.teamName, Players.playerName, quantity, priceEach FROM OrderItems INNER JOIN Jerseys ON OrderItems.jerseyID = Jerseys.jerseyID INNER JOIN Teams ON Teams.teamID = Jerseys.teamID INNER JOIN Players ON Players.playerID = Jerseys.playerID;"
    let query2 = "SELECT orderID FROM Orders;"
    let query3 = "SELECT jerseyID FROM Jerseys;"


    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
  
        let customers = rows;

        db.pool.query(query2, function(error, rows, fields){
            let orders = rows;

            db.pool.query(query3, function(error, rows, fields){
                let jerseys = rows;

                return res.render('orderItems', {data: customers, orders:orders, jerseys:jerseys});
            })
        })
    });
});
app.get('/teams', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT * FROM Teams;"


    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
  
        let teams = rows;
       
        return res.render('teams', {data: teams});

    });
});

// Delete Route for Teams
app.delete('/delete-team-ajax/', function(req,res,next){
    let data = req.body;
    let teamID = parseInt(data.id);

    let deleteTeams = `DELETE FROM Teams WHERE teamID = ?`;
  
        // Run query
        db.pool.query(deleteTeams, [teamID], function(error, rows, fields) {
            if (error) {
                // If error occurs send Error 400 response
                console.log(error);
                res.status(400).send({ message: "Error deleting team." });
            } else {
                // Send a 204 response if delete successful
                res.sendStatus(204);
            }
        });
    });

app.get('/players', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT * FROM Players;"


    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
  
        let players = rows;
       
        return res.render('players', {data:  players});

    });
});

// Delete Route for Players
app.delete('/delete-player-ajax/', function(req,res,next){
    let data = req.body;
    let playerID = parseInt(data.id);

    let deletePlayers = `DELETE FROM Players WHERE playerID = ?`;
  
        // Run query
        db.pool.query(deletePlayers, [playerID], function(error, rows, fields) {
            if (error) {
                // If error occurs send Error 400 response
                console.log(error);
                res.status(400).send({ message: "Error deleting player." });
            } else {
                // Send a 204 response if delete successful
                res.sendStatus(204);
            }
        });
    });

app.get('/teamplayers', function(req, res)
{
    // Declare Query 1
    let query1 = "SELECT TeamPlayers.teamPlayerID, Teams.teamName, Players.playerName, TeamPlayers.startDate, TeamPlayers.endDate FROM TeamPlayers INNER JOIN Teams ON TeamPlayers.teamID = Teams.teamID INNER JOIN Players ON TeamPlayers.playerID = Players.playerID;"
    let query2 = "SELECT * FROM Players;";
    let query3 = "SELECT * FROM Teams;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the data
        let teamplayers = rows;
        
        db.pool.query(query2, function(error, rows, fields){

            let players = rows;

            db.pool.query(query3, function(error, rows, fields) {

                let teams = rows;

                return res.render('teamplayers', {data: teamplayers, players: players, teams: teams});
            });
        });        
    });
});

// POST route for adding new TeamPlayer
app.post('/add-team-player-ajax', function (req, res) {
    // Save incoming data
    let data = req.body;

    // Define query to insert new data
    let query = `INSERT INTO TeamPlayers (teamID, playerID, startDate, endDate) VALUES (?, ?, ?, ?)`;

    // Insert new data
    db.pool.query(query, [data.teamID, data.playerID, data.startDate, data.endDate], function (error, results, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }

        // Query to retrieve new row for AJAX response
        let query2 = `SELECT TeamPlayers.teamPlayerID, Teams.teamName, Players.playerName, TeamPlayers.startDate, TeamPlayers.endDate 
                      FROM TeamPlayers 
                      INNER JOIN Teams ON TeamPlayers.teamID = Teams.teamID 
                      INNER JOIN Players ON TeamPlayers.playerID = Players.playerID 
                      WHERE TeamPlayers.teamPlayerID = ?`;

        db.pool.query(query2, [results.insertId], function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }

            // Send new row data as response
            res.send(rows);
        });
    });
});

// Delete Route for Team Player
app.delete('/delete-team-player-ajax/', function(req,res,next){
    let data = req.body;
    let teamPlayerID = parseInt(data.id);

    let deleteTeamPlayers = `DELETE FROM TeamPlayers WHERE teamPlayerID = ?`;
  
        // Run query
        db.pool.query(deleteTeamPlayers, [teamPlayerID], function(error, rows, fields) {
            if (error) {
                // If error occurs send Error 400 response
                console.log(error);
                res.status(400).send({ message: "Error deleting team player." });
            } else {
                // Send a 204 response if delete successful
                res.sendStatus(204);
            }
        });
    }); 

// PUT Route for updating TeamPlayer
app.put('/put-team-player-ajax', function (req, res) {
    // Capture the incoming data
    let data = req.body;

    // Define query to update data
    let query = `UPDATE TeamPlayers 
                 SET teamID = ?, playerID = ?, startDate = ?, endDate = ? 
                 WHERE teamPlayerID = ?`;

    // Execute query to update data
    db.pool.query(query, [data.teamID, data.playerID, data.startDate, data.endDate, data.teamPlayerID], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }

        // Query to retrieve updated row for AJAX response
        let query2 = `SELECT TeamPlayers.teamPlayerID, Teams.teamName, Players.playerName, TeamPlayers.startDate, TeamPlayers.endDate 
                      FROM TeamPlayers 
                      INNER JOIN Teams ON TeamPlayers.teamID = Teams.teamID 
                      INNER JOIN Players ON TeamPlayers.playerID = Players.playerID 
                      WHERE TeamPlayers.teamPlayerID = ?`;

        db.pool.query(query2, [data.teamPlayerID], function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }

            // Send updated row data as response
            res.send(rows);
        });
    });
});
// POST route for adding new Customer
app.post('/add-customer-ajax', function (req, res) {
    // Save incoming data
    let data = req.body;

    // Define query to insert new data
    let query = `INSERT INTO Customers (firstName, lastName, email, address, phone) VALUES (?, ?, ?, ?, ?)`;

    // Insert new data
    db.pool.query(query, [data.firstName, data.lastName, data.email, data.address, data.phone], function (error, results, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        
        // Query to retrieve new row for AJAX response
        let query2 = `SELECT * FROM Customers WHERE customerID = ?`;

        db.pool.query(query2, [results.insertId], function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }

            // Send new row data as response
            res.send(rows);
        });
    });
});
// PUT Route for updating customer
app.put('/put-customer-ajax', function (req, res) {
    // Capture the incoming data
    let data = req.body;

    // Define query to update data
    let query = `UPDATE Customers 
                 SET firstName = ?, lastName = ?, email = ?, address = ?, phone = ?
                 WHERE customerID = ?`;

    // Execute query to update data
    db.pool.query(query, [data.firstName, data.lastName, data.email, data.address, data.phone, data.customerID], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }

        // Query to retrieve new row for AJAX response
        let query2 = `SELECT * FROM Customers WHERE customerID = ?`;

        db.pool.query(query2, [data.customerID], function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }

            // Send new row data as response
            res.send(rows);
        });
    });
});
app.delete('/delete-customer-ajax/', function(req,res,next){
    let data = req.body;
    let customerID = parseInt(data.id);

    let deleteCustomer1 = `DELETE FROM Orders WHERE customerID = ?`;
    let deleteCustomer2 = `DELETE FROM Customers WHERE customerID = ?`;
  
    // Run query
    db.pool.query(deleteCustomer1, [customerID], function(error, rows, fields) {
        if (error) {
            // If error occurs send Error 400 response
            console.log(error);
            res.status(400).send({ message: "Error deleting order." });
            return;
        }
        
        db.pool.query(deleteCustomer2, [customerID], function(error, rows, fields) {

            if (error) {
                // If error occurs send Error 400 response
                console.log(error);
                res.status(400).send({ message: "Error deleting order." });
            }
            else{
                // Send a 204 response if delete successful
                res.sendStatus(204);
            }
        });
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

app.post('/edit-jersey-ajax', function(req, res) {

    let query1 = `UPDATE Jerseys SET teamID = ?, playerID = ?, size = ?, price = ?, inventoryCount = ? WHERE jerseyID = ?;`;

    let data = req.body;

    let jerseyID = parseInt(data.jerseyID);
    let playerID = parseInt(data.playerID);
    let teamID = parseInt(data.teamID);
    let inventoryCount = parseInt(data.inventoryCount);
    let price = parseFloat(data.price);
    let size = data.size;

    db.pool.query(query1, [teamID, playerID, size, price, inventoryCount, jerseyID], function(error, results, fields) {

        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }

        let query2 = "SELECT  Jerseys.jerseyID, Teams.teamName, Players.playerName, Jerseys.size, Jerseys.price, Jerseys.inventoryCount FROM Jerseys INNER JOIN Teams ON Jerseys.teamID = Teams.teamID INNER JOIN Players ON Jerseys.playerID = Players.playerID WHERE Jerseys.jerseyID = ?;";

        // Run the 1st query
        db.pool.query(query2, [jerseyID], function(error, rows, fields){

            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }

            res.send(rows);      
        });
    });
});

// POST route for adding new Order Item
app.post('/add-orderItem-ajax', function (req, res) {
    // Save incoming data
    let data = req.body;

    // Define query to insert new data
    let query1 = `INSERT INTO OrderItems (orderID, jerseyID, quantity, priceEach) VALUES (?, ?, ?, ?)`;

    // let quantity = parseInt(data.quantity);
    // let priceEach = parseFloat(data.priceEach);
    let jersey = parseInt(data.jersey);
    let order = parseInt(data.order);

    // Insert new data
    db.pool.query(query1, [order, jersey, data.quantity, data.priceEach], function (error, results, fields) {
        if (error) {
            console.log(error);
            res.sendStatus(500);
            return;
        }
        
        // Query to retrieve new row for AJAX response
        let query2 = "SELECT orderItemID, OrderItems.jerseyID, OrderItems.orderID, Teams.teamName, Players.playerName, quantity, priceEach FROM OrderItems INNER JOIN Jerseys ON OrderItems.jerseyID = Jerseys.jerseyID INNER JOIN Teams ON Teams.teamID = Jerseys.teamID INNER JOIN Players ON Players.playerID = Jerseys.playerID WHERE orderItemID = ?;"
        // let query3 = "SELECT orderID FROM Orders WHERE orderItemsID = ?;"
        // let query4 = "SELECT jerseyID FROM Jerseys WHERE orderItemsID = ?;"

        db.pool.query(query2, [results.insertId], function (error, rows, fields) {
            if (error) {
                console.log(error);
                res.sendStatus(500);
                return;
            }

            // db.pool.query(query3, [results.insertId], function(error, rows, fields) {
            //     console.log("query3");
            //     if (error) {
            //         console.log(error);
            //         res.sendStatus(500);
            //         return;
            //     }

            //     let orderID = rows.orderID;

            //     db.pool(query4, [results.insertId], function(error, rows, fields) {
            //         console.log("query4");
            //         if (error) {
            //             console.log(error);
            //             res.sendStatus(500);
            //             return;
            //         }
                    
            //         let jerseyID = rows.jerseyID;

            //         let extended = {...rows, ...jerseyID, ...orderID};

            //         // Send new row data as response
            //         res.send(extended);
            //     })
            // })

            res.send(rows);
        });
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
  


