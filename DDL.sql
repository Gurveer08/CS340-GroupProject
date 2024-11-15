-- Group 39 Gurveer Singh, Theodore Nguyen

-- Disable foreign key checks
SET FOREIGN_KEY_CHECKS = 0;
SET AUTOCOMMIT = 0;

-- Drop tables if they exist
DROP TABLE IF EXISTS OrderItems;
DROP TABLE IF EXISTS Orders;
DROP TABLE IF EXISTS Customers;
DROP TABLE IF EXISTS Jerseys;
DROP TABLE IF EXISTS TeamPlayers;
DROP TABLE IF EXISTS Players;
DROP TABLE IF EXISTS Teams;

-- Create Teams table
CREATE TABLE Teams (
    teamID INT NOT NULL AUTO_INCREMENT,
    teamName VARCHAR(50) NOT NULL,
    city VARCHAR(50) NOT NULL,
    PRIMARY KEY (teamID)
);

-- Create Players table
CREATE TABLE Players (
    playerID INT NOT NULL AUTO_INCREMENT,
    playerName VARCHAR(50) NOT NULL,
    PRIMARY KEY (playerID)
);

-- Create TeamPlayers table
CREATE TABLE TeamPlayers (
    teamPlayerID INT NOT NULL AUTO_INCREMENT,
    teamID INT NOT NULL,
    playerID INT NOT NULL,
    startDate DATE NOT NULL,
    endDate DATE NULL,
    PRIMARY KEY (teamPlayerID),
    FOREIGN KEY (teamID) REFERENCES Teams(teamID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (playerID) REFERENCES Players(playerID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create Jerseys table
CREATE TABLE Jerseys (
    jerseyID INT NOT NULL AUTO_INCREMENT,
    playerID INT NOT NULL,
    size VARCHAR(10) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    inventoryCount INT NOT NULL,
    PRIMARY KEY (jerseyID),
    FOREIGN KEY (playerID) REFERENCES Players(playerID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create Customers table
CREATE TABLE Customers (
    customerID INT NOT NULL AUTO_INCREMENT,
    firstName VARCHAR(50) NOT NULL,
    lastName VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    address VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NULL,
    PRIMARY KEY (customerID)
);

-- Create Orders table
CREATE TABLE Orders (
    orderID INT NOT NULL AUTO_INCREMENT,
    orderDate DATETIME NOT NULL,
    customerID INT NOT NULL,
    totalAmount DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (orderID),
    FOREIGN KEY (customerID) REFERENCES Customers(customerID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create OrderItems table
CREATE TABLE OrderItems (
    orderItemID INT NOT NULL AUTO_INCREMENT,
    orderID INT NOT NULL,
    jerseyID INT NOT NULL,
    quantity INT NOT NULL,
    priceEach DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (orderItemID),
    FOREIGN KEY (orderID) REFERENCES Orders(orderID) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (jerseyID) REFERENCES Jerseys(jerseyID) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Insert data into Teams table
INSERT INTO Teams (teamID, teamName, city) VALUES
(1, 'Dodgers', 'Los Angeles'),
(2, 'Yankees', 'New York'),
(3, 'Angels', 'Los Angeles');

-- Insert data into Players table
INSERT INTO Players (playerID, playerName) VALUES
(1, 'Shohei Ohtani'),
(2, 'Aaron Judge'),
(3, 'Mike Trout');

-- Insert data into TeamPlayers table
INSERT INTO TeamPlayers (teamPlayerID, teamID, playerID, startDate, endDate) VALUES
(1, 1, 1, '2024-03-20', NULL),
(2, 2, 2, '2016-08-13', NULL),
(3, 3, 3, '2011-07-08', NULL);

-- Insert data into Jerseys table
INSERT INTO Jerseys (jerseyID, playerID, size, price, inventoryCount) VALUES
(1, 1, 'S', 60, 10),
(2, 2, 'M', 70, 8),
(3, 3, 'L', 80, 5);

-- Insert data into Customers table
INSERT INTO Customers (customerID, firstName, lastName, email, address, phone) VALUES
(1, 'John', 'Smith', 'js@email.com', '3354 Lakewood Drive', '3829356723'),
(2, 'Jane', 'Doe', 'jd@email.com', '216 Sixth Street', '2160942024'), 
(3, 'James', 'Brown', 'jb@email.com','121 Arnold Way', '4133523466');

-- Insert data into Orders table
INSERT INTO Orders (orderID, orderDate, customerID, totalAmount) VALUES
(1, '2024-10-04', 1, 60),
(2, '2024-10-11', 2, 70),
(3, '2024-10-23', 3, 160);

-- Insert data into OrderItems table
INSERT INTO OrderItems (orderItemID, orderId, jerseyID, quantity, priceEach) VALUES
(1, 1, 1, 1, 60),
(2, 2, 2, 1, 70),
(3, 3, 3, 2, 80);

-- Enable foreign key checks
SET FOREIGN_KEY_CHECKS = 1;
COMMIT;