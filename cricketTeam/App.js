const express = require("express"); // Importing the Express framework
const sqlite3 = require("sqlite3"); // Importing the SQLite library
const { open } = require("sqlite"); // Importing the open function from the SQLite library
const path = require("path"); // Importing the path module
const app = express(); // Creating an instance of the Express application
const dbPath = path.join(__dirname, "cricketTeam.db"); // Generating the path to the SQLite database file

app.use(express.json()); // Using the JSON parser middleware

let database = null; // Initializing a variable to store the database connection

const initializeDbAndServer = async () => {
  try {
    database = await open({ filename: dbPath, driver: sqlite3.Database }); // Opening the SQLite database connection
    app.listen(3000, () => {
      console.log("Server Is running on http://localhost:3000"); // Starting the server on port 3000
    });
  } catch (error) {
    console.log(`Data base Error is ${error}`); // Handling any errors that occur during database initialization
    process.exit(1);
  }
};
initializeDbAndServer();

// Helper function to convert database object to desired format
const convertDbObject = (objectItem) => {
  return {
    playerId: objectItem.player_id,
    playerName: objectItem.player_name,
    jerseyNumber: objectItem.jersey_number,
    role: objectItem.role,
  };
};

// API 1: Get all players from the team
app.get("/players/", async (request, response) => {
  const getPlayersQuery = `select * from cricket_team`; // SQL query to retrieve all players
  const getPlayersQueryResponse = await database.all(getPlayersQuery); // Executing the SQL query
  response.send(
    getPlayersQueryResponse.map((eachPlayer) => convertDbObject(eachPlayer)) // Sending the response with converted player objects
  );
});

// API 2: Add a player to the database
app.post("/players/", async (request, response) => {
  const { playerName, jerseyNumber, role } = request.body; // Extracting player details from the request body
  const createPlayerQuery = ` insert into cricket_team(player_name, jersey_number, role) values('${playerName}', ${jerseyNumber}, '${role}');`; // SQL query to insert a new player
  const createPlayerQueryResponse = await database.run(createPlayerQuery); // Executing the SQL query
  response.send(`Player Added to Team`); // Sending a response indicating successful player addition
});

// API 3: Get player details based on playerId
app.get("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params; // Extracting playerId from the request parameters
  const getPlayerDetailsQuery = `select * from cricket_team where player_id = ${playerId};`; // SQL query to retrieve player details
  const getPlayerDetailsQueryResponse = await database.get(getPlayerDetailsQuery); // Executing the SQL query
  response.send(convertDbObject(getPlayerDetailsQueryResponse)); // Sending the response with converted player object
});

// API 4: Update player details based on playerId
app.put("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params; // Extracting playerId from the request parameters
  const { playerName, jerseyNumber, role } = request.body; // Extracting updated player details from the request body
  const updatePlayerDetailsQuery = `update cricket_team set player_name = '${playerName}', jersey_number = ${jerseyNumber}, role = '${role}' where player_id = ${playerId};`; // SQL query to update player details
  await database.run(updatePlayerDetailsQuery); // Executing the SQL query
  response.send("Player Details Updated"); // Sending a response indicating successful player update
});

// API 5: Delete player details based on playerId
app.delete("/players/:playerId/", async (request, response) => {
  const { playerId } = request.params; // Extracting playerId from the request parameters
  const deletePlayerQuery = `DELETE FROM cricket_team WHERE player_id = ${playerId};`; // SQL query to delete a player
  await database.run(deletePlayerQuery); // Executing the SQL query
  response.send("Player Removed"); // Sending a response indicating successful player deletion
});

module.exports = app; // Exporting the Express application for external usage
