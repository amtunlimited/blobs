/*blobs.js: the frontend for the (relatively) simple game
  Written by: Aaron Tagliaboschi <aaron.tagliaboschi@gmail.com> and Phillip Peterson <phillipdpeterson@gmail.com>
 */

//This draws the board itself onto the canvas
drawBack = function(ctx,width,height) {
	ctx.strokeStyle = 'black';
	ctx.lineWidth = 6;
	ctx.lineCap = 'square';
	
	ctx.beginPath();
		//draw horizontal lines
		ctx.moveTo(4,4);
		ctx.lineTo(4,height-4);
		for(i = 1; i < 8; i++){
			ctx.moveTo(6,height/7*i);
			ctx.lineTo(width-5,height/7*i);
		}
		
		//draw vertical lines
		ctx.moveTo(4,4);
		ctx.lineTo(width-4,4);
		for(i = 0; i < 8; i++){
			ctx.moveTo(width/7*i,6);
			ctx.lineTo(width/7*i,height-5);
		}
	ctx.stroke();
};

//This draws an 'o' in a given position
var drawO = function(ctx,pos,width,height,color,move) {
	ctx.strokeStyle = color;
	ctx.lineWidth = 2;
	ctx.lineCap = 'round';
	ctx.fillStyle="black";
	
	x = pos%7;
	y = (pos-x)/7;
	ctx.beginPath();
		ctx.arc((width/(7*2))*(2*x+1), (height/(7*2))*(2*y+1), (width/(7*2)) - 5, 0, 7);
	ctx.stroke();
	
	//if the piece belongs to the computer, color it black
	if(move === 1){
		ctx.fill()
	}
	
	//If the piece has been selected, color it light grey
	if(pos === selected){
		ctx.fillStyle = "LightGrey";
		ctx.fill();
	}
};

//This combines all of the other 'draw's together and draws the pieces
//according to the 'board' array
var drawBoard = function(ctx,width,height,board) {
	var gray = "#CCCCCC";
	var black = "#000000";
	
	drawBack(ctx,width,height);
	
	//If any board space has a piece, draw that piece
	for (var i = 0; i < board.length; i++) {
		if(board[i] != 0){
			drawO(ctx,i,width,height,black,board[i]);
		}
	}
};

//This turns an array into a string for the http requests
var boardString = function(board) {
	var bString = "";
	for(var i=0; i<board.length; i++) {
		switch(board[i]) {
			case 1:
				bString+="x";
				break;
			case 0:
				bString+="b";
				break;
			case -1:
				bString+="o";
				break;
		}
	}
	
	return bString;
};

//this is the actual board on the page
var canvas = document.getElementById("board");
var ctx = canvas.getContext('2d');

//index of the selected piece
var selected = -1;

//global variables
var board = [];
for(index = 0; index < 49; index++){
	board[index] = 0;
}

//set initial board state
board[0] = 1;
board[6] = -1;
board[42] = -1;
board[48] = 1;

//done is set to ture when an end condition has been reached
var done = false;

//playermove is true when the player can move, false otherwise
var playermove = true;

//This event is triggered when the canvas is clicked (and )
canvas.addEventListener('click', function(event) { 
	//This is the math to get the position of the click
	var x = event.pageX - canvas.offsetLeft;
	var y = event.pageY - canvas.offsetTop;
	var pos = ((x- (x%70))/70) + ((y- (y%70))/70) * 7;
	var move = false;
	
	//if it is the players turn
	if(playermove){
		//if a piece has been selected
		if(selected != -1){
			//if the selected piece has been clicked on again, deselect it
			if(pos === selected){
				selected = -1;
			//if an empty spot on the board has been clicked, see if it is a valid move.
			}else if(board[pos] === 0){
				for(a = -2; a < 3; a++){
					if(selected%7 < 2){
						if((selected + ((7*a)-selected%7)) <= pos && pos <= (selected + ((7*a)+2))){
							move = true;
							break;
						}
					}else if(selected%7 > 2){
						if((selected + ((7*a)-2)) <= pos && pos <= (selected + ((7*a)+(6-selected%7)))){
							move = true;
							break;
						}
					}else{
						if((selected + ((7*a)-2)) <= pos && pos <= (selected + ((7*a)+2))){
							move = true;
							break;
						}
					}
				}
			}
			
			//if the click is a valid move, move the selected piece there
			if(move){
				board[selected] = 0;
				board[pos] = -1;
				selected = -1;
			}
		//if a piece has not been selected
		}else{
			//all of this stuff only happens if the area is blank and the game isn't finished
			if(board[pos] === 0) {
				//if we are in the top row
				if(pos-8 < 0){
					//only check squares that are not out of bounds
					for(a = 0; a <= pos - 6; a++){
						if(board[a] === -1){
							move = true;
						}
					}
					
					//check all squares to the right and direcly below
					if(board[pos+1] === -1 || board[pos+7] === -1 || board[pos+8] === -1){
						move = true;
					//if necessary, check the squares to the left
					}else if(pos != 7){
						if(board[pos-1] === -1 || board[pos+6] === -1){
							move = true;
						}
					}
				//if we are in the bottom row
				}else if(pos+8 > 48){
					//only check squares that are not out of bounds
					for(a = 48; a >= pos+6; a--){
						if(board[a] === -1){
							move = true;
						}
					}
					
					//check all squares to the left and direcly above
					if(board[pos-1] === -1 || board[pos-7] === -1 || board[pos-8] === -1){
						move = true;
					//if necessary, check the squares to the right
					}else if(pos != 41){
						if(board[pos+1] === -1 || board[pos-6] === -1){
							move = true;
						}
					}
				//otherwise, check the squares immediately above and below ours
				}else if(board[pos-7] === -1 || board[pos+7] ===-1){
					move = true;
				//if the move is still not valid
				}else{
					//check the left side for all squares not on the left side of the board
					if(pos%7 > 0){
						for(a = 0; a < 3; a++){
							if(board[pos-8+(a*7)] === -1){
								move = true;
							}
						}
					}
					//check the right side for all squares not on the right side of the board
					if(pos%7 < 6){
						for(a = 0; a < 3; a++){
							if(board[pos-6+(a*7)] === -1){
								move = true;
							}
						}
					}
				}
				
				//If the click is a valid move, insert a new piece
				if(move){
					board[pos] = -1;
				}
			//if the click is on a player piece, select it
			}else if(board[pos] === -1){
				selected = pos;
			}
		}
	}
	if(move){
		playerturn = false;
		
		while(!playerturn){
			compTurn();
			pass();
			
			if(!playerturn){
				alert("You have no available moves. The computer will play now.");
			}
		}
	}
}, false);

//determines whether the player has a move available
var pass = function(){
	var x, y, a, start, end;
	var move = false;
	
	if(!done){
		for(x = 0; x < 49; x++){
			if(board[x] === -1){
				for(a = -2; a < 3; a++){
					if(x%7 < 2){
						start = x + ((7*a)-x%7);
						end = x + ((7*a)+2);
					}else if(x%7 > 4){
						start = x + ((7*a)-2);
						end = x + ((7*a)+(6-x%7))
					}else{
						start = x + ((7*a)-2);
						end = x + ((7*a)+2)
					}
					
					if(start >= 0 && end < 49){
						for(y = start; y <= end; y++){
							if(board[y] === 0){
								move = true;
								break;
							}
						}
					}
					
					if(move){
						break;
					}
				}
				
				if(move){
					break;
				}
			}
		}
		
		playerturn = move;
	}else{
		playerturn = true;
	}
}

var compTurn = function(){
	//The part of the http request that is reused.
	var ttt = "http://aarontag.com/blobs/api.py/";
	
	//All of this stuff is just boilerplate to make an http request from js
	//This one if to check the win state
	var xmlWin = new XMLHttpRequest();
	xmlWin.onreadystatechange = function() { 
		if (xmlWin.readyState == 4 && xmlWin.status == 200) {
			//If the returned text is not a number
			if(isNaN(Number(xmlWin.responseText))) {
				if(xmlWin.responseText === "t") {
					alert("It was a tie!");
				} else {
					alert(xmlWin.responseText + " won!");
				}
				done = true;
			}
		}
	};
	
	//This one if for moving
	var xmlMove = new XMLHttpRequest();
	xmlMove.onreadystatechange = function() { 
		if (xmlMove.readyState == 4 && xmlMove.status == 200 && !done) {
			if(Number(xmlMove.responseText) == -1){
				alert("The computer has no available moves. Make your next move.");
			}else if(xmlMove.responseText > 48){
				board[(int)(xmlMove.responseText/49)-1] = 0;
				board[(xmlMove.responseText % 49) - 1] = 1;
			}else{
				board[Number(xmlMove.responseText)] = 1;
			}
			//Only check after the move is made, because concurrency
			xmlWin.open("GET", ttt + "win/" + boardString(board), true);
			xmlWin.send(null);
		}
	};					
	
	//Check if someone won, then ask the computer for a move.
	xmlWin.open("GET", ttt + "win/" + boardString(board), true);
	xmlWin.send(null);
	xmlMove.open("GET", ttt + "move/" + boardString(board), true);
	xmlMove.send(null);
	
	playermove = true;
}

//This resets the game if the "Computer Start" button is clicked.
//Note, given a blank board, the ai will always choose the first space, so no
//request is needed.
document.getElementById("xstart").addEventListener('click', function(event) {
	for(index = 0; index < 49; index++){
		board[index] = 0;
	}
	
	board[0] = 1;
	board[1] = 1;
	board[6] = -1;
	board[42] = -1;
	board[48] = 1;
	
	done = false;
	playermove = true;
}, false);

//reset the game if the "Player Start" button is clicked. 
document.getElementById("ostart").addEventListener('click', function(event) {
	for(index = 0; index < 49; index++){
		board[index] = 0;
	}
	
	board[0] = 1;
	board[6] = -1;
	board[42] = -1;
	board[48] = 1;
	
	done = false;
	playermove = true;
}, false);

//This function is run every 25ms to keep the board updated.
var update = function() {
	//Make a white square to blank out the canvas.
	ctx.fillStyle="white";
    ctx.beginPath();
    ctx.rect(0, 0, 488, 488);
    ctx.closePath();
    ctx.fill();
    
    //Draw the board
	drawBoard(ctx,488,488,board);
};

//Finally, make the 'update' function run every 25ms
setInterval(update, 25);
