

// For loop to add <tr>'s and <td>'s to our table element in our html, and assign an id to each cell row 0-9 and col 0-9


for (var row=0; row<=9; row++) {
  var table = document.getElementById("tableDiv")
  var newRow = table.insertRow(row)
  newRow.id = "row" + row
  for (var col=0; col<=9; col++) {
    var tr = document.getElementById(newRow.id)
    var newCol = tr.insertCell(col)
    newCol.id = "row" + row + " col"  + col
    newCol.setAttribute("onclick", "shootTorpedo(event)")

  }
}


// Our global variables
var torpedoCount = 50
var torpedoUsed = 0
var hitCount= 0
var row
var col
var shipLocs = []
var winner = false
var loser = false

// an object to store our gameState and game board
var gameState = {
  SHIP: [5,4,3,3,2],
  board: [
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", ""]
  ]
}
// initiallizing the game board
placeShips()

var orient = 0
function randOrient() {
  orient = Math.floor(Math.random()*2)
}

function placeShips() {
  randOrient()
  gameState.SHIP.forEach(function(length){
    do {
        newShipLoc()
    } while(shipHorBad(row,col,length) || shipVertBad(row,col,length))

// Based on the length of SHIP a loop is ran to update the gameState.board

    for (var j = 0; j<length; j++){

      if (orient === 1){
        gameState.board[row][col+j] = length
        shipLocs.push([row,col+j])
      if(j === length -1){
        orient = 0
      }
      }
      else{
        gameState.board[row+j][col] = length
        shipLocs.push([row+j,col])
        if(j === length -1){
        orient = 1
      }
    }
  }
})
}


// setting board contstraint, if col is > 9, col is off the board.

function shipHorBad(row,col,length){
  var badCoord = false
  if (col + length > 9){
    badCoord = true
  }
  // if the gameState.board equals any other than an empty "" the coordinates are true.

  else{

  for (var i = 0; i<length; i++){
    if (gameState.board[row][col+i] != ""){
      badCoord = true
    }
  }
  }
  return badCoord
}

// setting board contstraint, if row is > 9, col is off the board.

function shipVertBad(row,col,length){
  var badCoord = false
  if (row + length > 9){
    badCoord = true
  }

  //if the gameState.board equals any other than an empty "" the coordinates are true.

  else{
  for (var i = 0; i<length; i++){
    if (gameState.board[row+i][col] != ""){
      badCoord = true
    }
  }
  }
  return badCoord
}






// Function shootTorpedo(e) targets the onclick event and creates variable aRow and aCol from the substring of the id of the cell clicked. has if statements to handle different conditions when the cell is clicked

function shootTorpedo(e){
  var aRow = e.target.id.substring(3,4)
  var aCol = e.target.id.substring(8,9)
  console.log(aRow)
  console.log(aCol)
  // protects user from using torpedo's on space that has already been torpedoed
  if (loser === true || winner === true){
    alert("game over! play again")
  }
  else if (gameState.board[aRow][aCol] != "" && gameState.board[aRow][aCol] != 1 && gameState.board[aRow][aCol] != 2 && gameState.board[aRow][aCol] != 3 && gameState.board[aRow][aCol] != 4 && gameState.board[aRow][aCol] != 5) {
    alert("target has already been torpedo'd")
  }
  // changes the color of a space without a ship to purple and updates the gameState.board with a miss on that index, also updates torpedo counts for used and remaining and changes the innerHTML
  else if  (gameState.board[aRow][aCol] === "") {
    document.getElementById(e.target.id).className = "missed";
    gameState.board[aRow][aCol] = "miss"
    torpedoCount--
    torpedoUsed++
    document.getElementById("tries").innerHTML = " Torpedoes Left: " + torpedoCount
    document.getElementById("shot").innerHTML = " Torpedoes Used: " + torpedoUsed
    checkLose()
  }
  // assigns a string "hit" to the gameState.board array, if the cell clicked is one of the random coordinates generated and assigned ship. Also updates torpedo counts for used and remaining
  else {
    gameState.board[aRow][aCol] = "hit"
    document.getElementById(e.target.id).className = "hits";
    torpedoCount--
    torpedoUsed++
    document.getElementById("tries").innerHTML = " Torpedoes Left: " + torpedoCount
    document.getElementById("shot").innerHTML = " Torpedoes Used: " + torpedoUsed
    hitCount++
    document.getElementById("hitter").innerHTML = "Hit Count: " + hitCount
    checkWin()
  }
}


//List of functions..........................................



// function checkWin() alerts a win message when the hit counter reaches 5
function checkWin() {
  if (hitCount === 17) {
    document.getElementById("tries").innerHTML = "YOU WIN"
    winner = true
    document.getElementById("tries").className = "loser"
  }
}
// function checkLose() alerts a losing message when the user runs out of torpedoes(torpedoCount === 0)
function checkLose() {
  if (torpedoCount === 0) {
    document.getElementById("tries").innerHTML = "YOU LOSE"
    loser = true
    showShips()
    document.getElementById("tries").className = "loser"
  }
}
// function for creating a random row and column for a new ship location
function newShipLoc() {
  row = Math.floor(Math.random()*10)
  col = Math.floor(Math.random()*10)
}



// showShips() shows the location of every ship on the board by assigning the "loseShips" class
function showShips() {
  shipLocs.forEach(function(cord) {
    document.getElementById('row' + cord[0] +' col' + cord[1]).className= "loseShips"
  })
}
// used within our play again button to reset the game
function resetButton() {
  location.reload();
}




//
