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
app.get('/', function(req, res)
{
    // Declare Query 1
    let query1;

    // If there is no query string, we just perform a basic SELECT
    if (req.query.lname === undefined)
    {
        query1 = "SELECT * FROM bsg_people;";
    }

    // If there is a query string, we assume this is a search, and return desired results
    else
    {
        query1 = `SELECT * FROM bsg_people WHERE lname LIKE "${req.query.lname}%"`
    }

    // Query 2 is the same in both cases
    let query2 = "SELECT * FROM bsg_planets;";

    // Run the 1st query
    db.pool.query(query1, function(error, rows, fields){
        
        // Save the people
        let people = rows;
        
        // Run the second query
        db.pool.query(query2, (error, rows, fields) => {
            
            // Save the planets
            let planets = rows;

            return res.render('index', {data: people, planets: planets});
        })
    })
});

    app.post('/add-person-form', function(req, res){
        // Capture the incoming data and parse it back to a JS object
        let data = req.body;
    
        // Capture NULL values
        let homeworld = parseInt(data['input-homeworld']);
        if (isNaN(homeworld))
        {
            homeworld = 'NULL'
        }
    
        let age = parseInt(data['input-age']);
        if (isNaN(age))
        {
            age = 'NULL'
        }
    
        // Create the query and run it on the database
        query1 = `INSERT INTO bsg_people (fname, lname, homeworld, age) VALUES ('${data['input-fname']}', '${data['input-lname']}', ${homeworld}, ${age})`;
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
                res.redirect('/');
            }
        })
    })
/*
    LISTENER
*/
app.listen(PORT, function(){            // This is the basic syntax for what is called the 'listener' which receives incoming requests on the specified PORT.
    console.log('Express started on http://localhost:' + PORT + '; press Ctrl-C to terminate.')
}); 

// app.js

// Database
var db = require('./database/db-connector') 


