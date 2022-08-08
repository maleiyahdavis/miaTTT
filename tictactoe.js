//This gets the elements with the class name of cell and puts them into an array;
const cells = Array.from(document.getElementsByClassName("cell"));

//This will get the message written in the h2 header in HTML
const playingText = document.getElementById("playingText");

//This will get the newGame button written in HTML in order to apply new game functionality
const newGameButton = document.getElementById("newGame");

//This empty board is an array of nine nulls that will reset the box when the new game button is clicked
const emptyBoard = [null, null, null, null, null, null, null, null, null];

const XText = "X";
const OText = "O";
let currentPlayer = XText;

const winningCombo = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

//This function will tell if the cell has been clicked and from there will 
const cellClicked = (e) =>{
    console.log("box clicked");
    //The line below will target the event on it's specific id so you can tell if the box was clicked 
    const id = e.target.id;
    //If the cell on the empty board array is empty we will update the index of the emptyBoard at the cellsID to current player which is the the letter x
    if(!emptyBoard[id]){
        emptyBoard[id] = currentPlayer;
        //This will set the inner text of that cell to the current player which is the letter x 
        e.target.innerText = currentPlayer;
        //If the player wins we will update the playing text to a winning message 
        if(playerWins() !==false){
           return playingText.innerText = `${currentPlayer} wins!!!`;
        }
        //This line will update the current player variable: if the currentPlayer is equal to XText then turn it into the OText otherwise current player will be set to the XText 
        currentPlayer= currentPlayer === XText ? OText : XText;
    }
    
}
//This adds an event listener for each cell within cells array and calls the cellClicked function 
cells.forEach(cell => {
    cell.addEventListener("click", cellClicked);
});

//Pass in the winningCombo array in order to check for the winner
let playerWins = () =>{
    //This for of loop will iterate over the current array and check it against the winning combo array 
    for(const condition of winningCombo){
        //This lin will set the condition which is the array at it's current state and saves it into the a, b, c variables 
        let [a,b,c] = condition;
        //This if statement takes the emptyboard array at its current state and compares it to the other two positions within the array to check if they are equivalent
        //If they are equivalent then it will return that array 
        if(emptyBoard[a] && (emptyBoard[a] == emptyBoard[b] && emptyBoard[a] == emptyBoard[c])){
            return [a,b,c];
        }
    }
    //This will return false if there is not a winning combination within the array 
    return false;
}
//This function will make sure that all cells are set to null; that each cell is set to an empty string; that the text that shows underneath H1 header is set back to it's original text as well as current player being set back to it's orginal starting text 
const newGame = () =>{
    emptyBoard.forEach((emptyCell, index) => {
        emptyBoard[index] = null;
    });
    cells.forEach((cell) =>{
        cell.innerText = " ";
    });
    playingText.innerText = "Get 3 of Your Mark in a Row to Win!!!";
    currentPlayer= XText;
}
//This adds an event listener to the new game button and calls the newGame function on click
newGameButton.addEventListener("click", newGame);
newGame()
