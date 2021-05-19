/**
 * Othello game
 * Author(s): Chase Johnston and Christian Van Eerden
 */

class Othello {

	// Constructs and initializes the board of given size
	constructor(size, startPlayer, discColor) {
		// validate arguments
		if (size < 4 || size > 8 || size % 2 !== 0) {
			throw new Error("Invalid value for board size.");
		}
		if (startPlayer < 1 || startPlayer > 2) {
			throw new Error("Invalid value for player number.");
		}
		if (discColor !== Othello.WHITE && discColor !== Othello.BLACK) {
			throw new Error("Invalid value for disc.");
		}

		// set instance variables
		this.size = size;
		this.turn = startPlayer;
		this.disc = discColor;

		// set two more instance variables p1Disc and p2Disc
		if (this.turn === 1) {
			this.p1Disc = this.disc;
			this.p2Disc = this.disc === Othello.WHITE ? Othello.BLACK : Othello.WHITE;
		} else {
			this.p2Disc = this.disc;
			this.p1Disc = this.disc === Othello.WHITE ? Othello.BLACK : Othello.WHITE;
		}

		// create the grid (as array of arrays)
		this.board = new Array(this.size);
		for (let i = 0; i < this.board.length; i++) {
			this.board[i] = new Array(this.size);
			this.board[i].fill("-");
		}

		// initialize the grid
		this.initializeBoard();
	
	}

	// Getter for white disc
  	static get WHITE() {
    	return "W";
  	}

  	// Getter for black disc
  	static get BLACK() {
    	return "B";
  	}

  	// Getter for empty
  	static get EMPTY() {
    	return "-";
  	}

  	// Getter for tie
  	static get TIE() {
    	return "T";
  	}

  	// Initializes the board with start configuration of discs (as per project specs)
	initializeBoard() {

		var size = this.board.length;

		this.board[size / 2 - 1][size / 2 - 1] = Othello.BLACK;
		this.board[size / 2 - 1][size / 2] = Othello.WHITE;
		this.board[size / 2][size / 2 - 1] = Othello.WHITE;
		this.board[size / 2][size / 2] = Othello.BLACK;

  	}

	check_dir(row, col, disc, paramR, paramC) {
		var done = false;
		var r = row + paramR;
		var c = col + paramC;
		var size = this.board.length;

		while(!done) {
			if (paramR == 1) {
				if (r >= size) {
					break;
				}
			}

			if (paramR == -1) {
				if (r < 0) {
					break;
				}
			}

			if (paramC == 1) {
				if (c >= size) {
					break;
				}
			}

			if (paramC == -1) {
				if (c < 0) {
					break;
				}
			}

			if (this.board[r][c] == disc) {
				return true;
			}

			if (this.board[r][c] == Othello.EMPTY) {
				return false;
			}

			r += paramR;
			c += paramC;
			if (paramR >= size || paramC >= size) {
				done = true;
			}
		}

		return false;
	}

	// Returns true if placing the disc of current player at row,col is valid; else returns false
	isValidMove(row, col) {
		return this.isValidMoveForDisc(row, col, this.disc);
	}

	// Returns true if placing the specified disc at row,col is valid; else returns false
	isValidMoveForDisc(row, col, disc) {

		var maincheck = false;
		var size = this.board.length;

		if(row - 1 > 0 && this.board[row - 1][col] != Othello.EMPTY && this.board[row - 1][col] != disc) {
			var check = this.check_dir(row, col, disc, -1, 0);
			if (check) {
				maincheck = true;
			}
		}

		if(row - 1 > 0 && col + 1 < size && this.board[row - 1][col + 1] != Othello.EMPTY && this.board[row - 1][col + 1] != disc) {
			var check = this.check_dir(row, col, disc, -1, 1);
			if (check) {
				maincheck = true;
			}
		}

		if (row - 1 > 0 && col - 1 > 0 && this.board[row - 1][col - 1] != Othello.EMPTY && this.board[row - 1][col - 1] != disc) {
			var check = this.check_dir(row, col, disc, -1, -1);
			if (check) {
				maincheck = true;
			}
		}

		if (row + 1 < size && this.board[row + 1][col] != Othello.EMPTY && this.board[row + 1][col] != disc) {
			var check = this.check_dir(row, col, disc, 1, 0);
			if (check) {
				maincheck = true;
			}
		}

		if (row + 1 < size && col - 1 > 0 && this.board[row + 1][col - 1] != Othello.EMPTY && this.board[row + 1][col - 1] != disc) {
			var check = this.check_dir(row, col, disc, 1, -1);
			if (check) {
				maincheck = true;
			}
		}

		if (row + 1 < size && col + 1 < size && this.board[row + 1][col + 1] != Othello.EMPTY && this.board[row + 1][col + 1] != disc) {
			var check = this.check_dir(row, col, disc, 1, 1); 
			if (check) {
				maincheck = true;
			}
		}

		if (col - 1 > 0 && this.board[row][col - 1] != Othello.EMPTY && this.board[row][col - 1] != disc) {
			var check = this.check_dir(row, col, disc, 0, -1);
			if (check) {
				maincheck = true;
			}
		}

		if (col + 1 < size && this.board[row][col + 1] != Othello.EMPTY && this.board[row][col + 1] != disc) {
			var check = this.check_dir(row, col, disc, 0, 1);
			if (check) {
				maincheck = true;
			}
		}

		if(maincheck) {
			return true;
		}


		// DO NOT DELETE - if control reaches this statement, then it is not a valid move
		return false;	// not a valid move
	}

	// Places the disc of current player at row,col and flips the opponent discs as needed
	placeDiscAt(row, col) {
		if (!this.isValidMove(row, col)) {
			return;
		}
		var size = this.board.length;
		var disc = this.disc;
		
		var upCheck = this.check_dir(row, col, disc, -1, 0);
		if (upCheck) {
			for (var i = row - 1; i > 0; i--) {
				if(this.board[i][col] == disc) {
					break;
				}
				if(this.board[i][col] != disc && this.board[i][col] != Othello.EMPTY) {
					this.board[i][col] = disc;
				}
			}
		}

		var downCheck = this.check_dir(row, col, disc, 1, 0);
		if(downCheck) {
			for (var i = row + 1; i < size; i++) {
				if (this.board[i][col] == disc) {
					break;
				}
				if (this.board[i][col] != disc && this.board[i][col] != Othello.EMPTY) {
					this.board[i][col] = disc;
				}
			}
		}
		
		var leftCheck = this.check_dir(row, col, disc, 0, -1);
		if (leftCheck) {
			for (var i = col - 1; i > 0; i--) {
				if(this.board[row][i] == disc) {
					break;
				}
				if (this.board[row][i] != disc && this.board[row][i] != Othello.EMPTY) {
					this.board[row][i] = disc;
				}
			}
		}
		var rightCheck = this.check_dir(row, col, disc, 0, 1);
		if (rightCheck) {
			for (var i = col + 1; i < size; i++) {
				if(this.board[row][i] == disc) {
					break;
				}
				if(this.board[row][i] != disc && this.board[row][i] != Othello.EMPTY) {
					this.board[row][i] = disc;
				}
			}
		}

		var upLeft = this.check_dir(row, col, disc, -1, -1);
		if (upLeft) {
			var i = row - 1;
			var j = col - 1;
			var done = false;
			while (!done) {
				if(i < 0 || j < 0) {
					done = true;
					break;
				}
				if(this.board[i][j] == disc) {
					break;
				}
				if(this.board[i][j] != disc && this.board[i][j] != Othello.EMPTY) {
					this.board[i][j] = disc;
				}
				i--;
				j--;
			}
		}

		var upRight = this.check_dir(row, col, disc, -1, 1);
		if (upRight) {
			var i = row - 1;
			var j = col + 1;
			var done = false;
			while(!done) {
				if(i < 0 || j >= size) {
					done = true;
					break;
				}
				if(this.board[i][j] == disc) {
					break;
				}
				if(this.board[i][j] != disc && this.board[i][j] != Othello.EMPTY) {
					this.board[i][j] = disc;
				}
				i--;
				j++;
			}
		}

		var downLeft = this.check_dir(row, col, disc, 1, -1);
		if (downLeft) {
			var i = row + 1;
			var j = col - 1;
			var done = false;
			while (!done) {
				if(i >= size || j < 0) {
					done = true;
					break;
				}
				if (this.board[i][j] == disc) {
					break;
				}
				if (this.board[i][j] != disc && this.board[i][j] != Othello.EMPTY) {
					this.board[i][j] = disc;
				}
				i++;
				j--;
			}
		}

		var downRight = this.check_dir(row, col, disc, 1, 1); 
		if (downRight) {
			var i = row + 1;
			var j = col + 1;
			var done = false;
			while(!done) {
				if (i >= size || j >= size) {
					done = true;
					break;
				}
				if (this.board[i][j] == disc) {
					break;
				}
				if (this.board[i][j] != disc && this.board[i][j] != Othello.EMPTY) {
					this.board[i][j] = disc;
				}
				i++;
				j++;
			}
		}

		this.board[row][col] = disc;


		// DO NOT DELETE - prepares for next turn if game is not over
		if (!this.isGameOver()) {
			this.prepareNextTurn();
		}
	}

	// Sets turn and disc information for next player
	prepareNextTurn() {
		if (this.turn === 1) {
			this.turn = 2;
		} else {
			this.turn = 1;
		}
		if (this.disc === Othello.WHITE) {
			this.disc = Othello.BLACK;
		} else {
			this.disc = Othello.WHITE;
		}
		if (this.disc === Othello.WHITE && !this.isValidMoveAvailableForDisc(this.disc)) {
			this.disc = Othello.BLACK;
		}
		if (this.disc === Othello.BLACK && !this.isValidMoveAvailableForDisc(this.disc)) {
			this.disc = Othello.WHITE;
		}
	}

	// Returns true if a valid move for current player is available; else returns false
	isValidMoveAvailable() {
		return this.isValidMoveAvailableForDisc(this.disc);
	}

	// Returns true if a valid move for the specified disc is available; else returns false
	isValidMoveAvailableForDisc(disc) {

		var validMove = false;
		var size = this.board.length;

		for (var i = 0; i < size; i++) {
			for (var j = 0; j < size; j++) {
				if (this.board[i][j] == Othello.EMPTY) {
					if(this.isValidMove(i, j)) {
						validMove = true;
					}
				}
			}
		}

		if (validMove) {
			return true;
		}
		// DO NOT DELETE - if control reaches this statement, then a valid move is not available
		return false;	// not a valid move
	}

	// Returns true if the board is fully occupied with discs; else returns false
	isBoardFull() {

		for (var i = 0; i < this.board.length; i++) {
			for (var j = 0; j < this.board.length; j++) {
				if(this.board[i][j] == Othello.EMPTY) {
					return false;
				}
			}
		}

		return true;
	}

	// Returns true if either the board is full or a valid move is not available for either disc
	isGameOver() {
		if(this.isBoardFull()) {
			return true;
		}
		if((!this.isValidMoveAvailableForDisc(Othello.WHITE) && !this.isValidMoveAvailableForDisc(Othello.BLACK))) {
			return true;
		}
		return false;
	}

	// If there is a winner, it returns Othello.WHITE or Othello.BLACK.
	// In case of a tie, it returns Othello.TIE
	checkWinner() {

		var whitetotal = 0;
		var blacktotal = 0;

		for (var i = 0; i < this.board.length; i++) {
			for (var j = 0; j < this.board.length; j++) {
				if(this.board[i][j] == Othello.BLACK) {
					blacktotal++;
				}
				
				if (this.board[i][j] == Othello.WHITE) {
					whitetotal++;
				}
			}
		}

		if (whitetotal < blacktotal) {
			return Othello.BLACK;
		}

		else if (blacktotal < whitetotal) {
			return Othello.WHITE;
		}

		else {
			return Othello.TIE;
		}
		
	}

	// Returns a string representation of the board (for display purposes)
	toString() {
		let str = '\n ';
		for (let i = 0; i < this.size; i++) {
			str += ' ' + (i+1)
		}
		str += "\n";
		for (let i = 0; i < this.size; i++) {
			str += i+1 + ' ';
			str += this.board[i].join(' ') + "\n";
		}
		return str;
	}
}

module.exports = Othello;
