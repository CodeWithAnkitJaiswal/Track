<?php

// Database connection parameters
$host = "localhost";
$user = "username";
$password = "password";
$database = "database_name";

// Get the marks data from the request body
$requestBody = file_get_contents("php://input");
$data = json_decode($requestBody, true);

// Create a new database connection
$mysqli = new mysqli($host, $user, $password, $database);

// Check for errors
if ($mysqli->connect_errno) {
  echo json_encode(array("success" => false, "message" => "Error connecting to database"));
  exit();
}

// Insert the marks data into the database
$insertStatement = $mysqli->prepare("INSERT INTO marks (marks) VALUES (?)");
$insertStatement->bind_param("i", $data["marks"]);
$insertStatement->execute();

// Check for errors
if ($mysqli->errno) {
  echo json_encode(array("success" => false, "message" => "Error inserting data into database"));
  exit();
}

// Select the marks data from the database
$selectStatement = $mysqli->prepare("SELECT * FROM marks");
$selectStatement->execute();
$result = $selectStatement->get_result();

// Create an array of marks and dates
$marksData = array();
while ($row = $result->fetch_assoc()) {
  $marksData[] = array("marks" => $row["marks"], "date" => $row["date"]);
}

// Return the marks data as JSON
echo json_encode($marksData);

// Close the database connection
$mysqli->close();

?>
