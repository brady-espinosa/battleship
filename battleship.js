

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
var torpedoCount = 25
var torpedoUsed = 0
var hitCount= 0
var row
var col
var shipLocs = []


// an object to store our gameState and game board
var gameState = {
  SHIP: 1,
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

// loop to set the random locations of the ships and store the location as (col,row) within the array shipsLoc[]
// while loop used to make sure no ship location can be the same
createBoard()
function createBoard() {
  for (var i = 0; i<= 4; i++) {
    newShipLoc()
    while (fit()){
      newShipLoc()
      }
    gameState.board[row][col] = gameState.SHIP
    shipLocs.push([row,col])
  }
}








// Function shootTorpedo(e) targets the onclick event and creates variable aRow and aCol from the substring of the id of the cell clicked. has if statements to handle different conditions when the cell is clicked

function shootTorpedo(e){
  var aRow = e.target.id.substring(3,4)
  var aCol = e.target.id.substring(8,9)
  console.log(aRow)
  console.log(aCol)
  // protects user from using torpedo's on space that has already been torpedoed
  if (gameState.board[aRow][aCol] != "" && gameState.board[aRow][aCol] != "1") {
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
    document.getElementById('hitter').innerHTML = "Hit Count: " + hitCount
    checkWin()
  }
}


//List of functions..........................................



// function checkWin() alerts a win message when the hit counter reaches 5
function checkWin() {
  if (hitCount === 5) {
    alert("You Sunk All The Ships, Congrats!")

  }
}
// function checkLose() alerts a losing message when the user runs out of torpedoes(torpedoCount === 0)
function checkLose() {
  if (torpedoCount === 0) {
    alert("You Lose")
    showShips()
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


// fit()



function fit(length) {
  // row = Math.floor(Math.random()*10)
  // col = Math.floor(Math.random()*10)

  var negRow = row
  var negCol = col
  var posRow = row
  var posCol = col
  var regRow = row
  var regCol = col

  if (row - 1 === -1) {
    negRow = 0
    } else if (row + 1 === 10){
      posRow = 9
    } else if (col - 1 === -1){
      negCol = 0
    } else if (col + 1 === 10){
      posCol = 9
    }
    if (gameState.board[posRow][posCol] === length){
      return true
    }
    else return false
  }






  // if (gameState.board[row][col] === gameState.SHIP[0] || gameState.board[negRow][col] === gameState.SHIP[0] || gameState.board[posRow][col] === gameState.SHIP[0] ||  gameState.board[negRow][negCol] === gameState.SHIP[0] || gameState.board[posRow][posCol] === gameState.SHIP[0] || gameState.board[row][negCol] === gameState.SHIP[0] || gameState.board[row][posCol] === gameState.SHIP[0] || gameState.board[negRow][posCol] === gameState.SHIP[0] || gameState.board[posRow][negCol] === gameState.SHIP[0]){
  //   return true
  // }
  // else return false




  // backup code in case we break this shizzzz
