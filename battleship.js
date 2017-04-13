

// For loop to write a table in our html, and assign an id to each cell 1-100


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
// an object to store our gameState and game board




var gameState = {
  SHIP: "ship",
  // BIG_SHIP: 5
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
  // render: function(){
  //   this.board.forEach(function(element, i){
  //
  //   })
  // }
}

// Our global variables
var torpedoCount = 25
var torpedoUsed = 0
var hitCount= 0
var row
var col
var shipLocs = []
// loop to set the random locations of the ships and store the location as (col,row) within the array shipsLoc[]
// while loop used to make sure no ship location can be the same
createBoard()
function createBoard() {
  for (var ran = 0; ran<= 4; ran++) {
    newShipLoc()
    while (fit() === true){
      newShipLoc()
      }
    gameState.board[row][col] = gameState.SHIP
    shipLocs.push([row,col])

  }
}


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

// function placement() {
//   gameState.board.forEach(function(ships){
//     if
//   })
// }
// Function to change color of a cell that has been clicked on
//to traverse through a 2d array, we use [][] next to each other, not nested
function shootTorpedo(e){
  var aRow = e.target.id.substring(3,4)
  var aCol = e.target.id.substring(8,9)
  console.log(aRow)
  console.log(aCol)
  // protects user from using torpedo's on space that has already been torpedoed
  if (gameState.board[aRow][aCol] != "" && gameState.board[aRow][aCol] != "ship") {
    alert("target has already been torpedo'd")
  }
  // changes the color of a space without a ship to purple and updates the gameState.board with a miss on that index, also updates torpedo count and changes the innerHTML
  else if  (gameState.board[aRow][aCol] === "") {
    document.getElementById(e.target.id).className = "missed";
    gameState.board[aRow][aCol] = "miss"
    torpedoCount--
    torpedoUsed++
    document.getElementById("tries").innerHTML = " Torpedoes Left: " + torpedoCount
    document.getElementById("shot").innerHTML = " Torpedoes Used: " + torpedoUsed
    checkLose()
  }
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
// function for creating a random row and column for a new ship location
function newShipLoc() {
  row = Math.floor(Math.random()*10)
  col = Math.floor(Math.random()*10)
}




function showShips() {
  shipLocs.forEach(function(cord) {
    document.getElementById('row' + cord[0] +' col' + cord[1]).className= "loseShips"
  })
}

function resetButton() {
  location.reload();
}







//
// function renderBoard(state){
// var renderedHTML =


// Hint: document.getElementById("myDiv").className = "hit" to set the class of an element called "myDiv"



function fit() {
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
      posrow = 9
    } else if (col - 1 === -1){
      negCol = 0
    } else if (col + 1 === 10){
      posCol = 9
    }
    if (gameState.board[row][col] === gameState.SHIP || gameState.board[negRow][col] === gameState.SHIP || gameState.board[posRow][col] === gameState.SHIP ||  gameState.board[negRow][negCol] === gameState.SHIP || gameState.board[posRow][posCol] === gameState.SHIP || gameState.board[row][negCol] === gameState.SHIP || gameState.board[row][posCol] === gameState.SHIP || gameState.board[negRow][posCol] === gameState.SHIP || gameState.board[posRow][negCol] === gameState.SHIP){
      return true
    }
    else return false
  }
