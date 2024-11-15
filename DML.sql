-- Gurveer Singh, Theodore Nguyen 
-- CS 340 
-- SQL Queries 

-- Jersey Table : 

SELECT Jerseys.jerseyID, Teams.teamName, Players.playerName, Jerseys.size, Jerseys.price, Jerseys.inventoryCount FROM Jerseys 
INNER JOIN TeamPlayers ON Jerseys.playerID = TeamPlayers.playerID
INNER JOIN Teams ON TeamPlayers.teamID = Teams.teamID
INNER JOIN Players ON Jerseys.playerID = Players.playerID;

DELETE FROM Jerseys WHERE jerseyID = [:jerseyId]; 

INSERT INTO Jerseys (playerID, size, price, inventoryCount) 
VALUES ([:playerId], [:size], [:price], [:inventoryCount]);

UPDATE Jerseys 
SET playerID = [:playerId], size = [:size],  price = [:price], inventoryCount = [:inventoryCount] 
WHERE jerseyID = [:jerseyId];


-- Orders Table:

SELECT * FROM Orders;

DELETE FROM Orders 
WHERE orderID = [:orderId];

INSERT INTO Orders (orderDate, customerID, totalAmount) 
VALUES ([:orderDate], [:customerId], [:totalAmount]);

UPDATE Orders
SET orderDate = [:orderDate], customerID = [:customerId], totalAmount = [:totalAmount]
WHERE orderID = [:orderId];

-- Customers Table:

SELECT * FROM Customers;

DELETE FROM Customers 
WHERE customerID = [:customerId];

INSERT INTO Customers (firstName, lastName, email, address, phone) 
VALUES ([:fName], [:lName], [:email], [:address], [:phoneNumber]);

UPDATE Customers
SET firstName = [:fName], lastName = [:lName], email = [:email], phone = [:phoneNumber]
WHERE customerID = [:customerID];

-- OrderItems Table:
SELECT 
    OrderItems.orderItemID,
    OrderItems.orderID,
    OrderItems.jerseyID,
    Teams.teamName,
    Players.playerName,
    OrderItems.quantity,
    OrderItems.priceEach
    
FROM 
    OrderItems
JOIN 
    Jerseys ON OrderItems.jerseyID = Jerseys.jerseyID
JOIN 
    Players ON Jerseys.playerID = Players.playerID
JOIN 
    TeamPlayers ON Players.playerID = TeamPlayers.playerID
JOIN 
    Teams ON TeamPlayers.teamID = Teams.teamID;


DELETE FROM OrderItems
WHERE orderItemID = [:orderItemID];

INSERT INTO OrderItems (orderID, jerseyID, quantity, priceEach) VALUES ([:orderID], [:jerseyID], [:quantity], [:priceEach]);

UPDATE OrderItems SET orderID = [:orderID], jerseyID = [:jerseyID], quantity = [:quantity], priceEach = [:priceEach] WHERE orderItemID = [:orderItemID];

-- Teams Table:
SELECT * FROM Teams

DELETE FROM Teams
WHERE teamID = [:teamID];

INSERT INTO Teams (teamName) VALUES ([:teamName]);

UPDATE Teams
SET teamName = [:teamName]
WHERE teamID = [:teamID];




-- Players Table:
SELECT * FROM Players

DELETE FROM Players
WHERE playerID = [:playerID];

INSERT INTO Players (playerName) VALUES ([:playerName]);

UPDATE Players
SET playerName = [:playerName]
WHERE playerID = [:playerID];
