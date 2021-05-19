/**
 *  Units test for Othello game
 *  Author(s): Nandigam
 */

const Othello = require('./Othello');

test('Constructor Test 1', () => {
    let game = new Othello(4, 1, 'B');
    let expected = "1 2 3 4\n1 - - - -\n2 - B W -\n3 - W B -\n4 - - - -";
    expect(game.toString().trim()).toBe(expected);
});

test('Constructor Test 2', () => {
    let game = new Othello(6, 1, 'B');
    let expected = "1 2 3 4 5 6\n1 - - - - - -\n2 - - - - - -\n3 - - B W - -\n4 - - W B - -\n5 - - - - - -\n6 - - - - - -";
    expect(game.toString().trim()).toBe(expected);
});

test('Constructor Test 3', () => {
    let game = new Othello(8, 1, 'W');
    let expected = "1 2 3 4 5 6 7 8\n1 - - - - - - - -\n2 - - - - - - - -\n3 - - - - - - - -\n4 - - - B W - - -\n5 - - - W B - - -\n6 - - - - - - - -\n7 - - - - - - - -\n8 - - - - - - - -";
    expect(game.toString().trim()).toBe(expected);
});

test('isGameOver() Test', () => {
    let game = new Othello(4, 1, 'B');
    expect(game.isGameOver()).toBe(false);
});

test('isBoardFull() Test 1', () => {
    let game = new Othello(4, 1, 'B');
    expect(game.isBoardFull()).toBe(false);
});

test('isBoardFull() Test 2', () => {
    let game = new Othello(4, 1, 'B');
    game.placeDiscAt(1,3); //2, 4
    game.placeDiscAt(0,3); //1, 4
    game.placeDiscAt(0,2); //1, 3
    game.placeDiscAt(0,1); //1, 2
    game.placeDiscAt(3,0); //4, 1
    game.placeDiscAt(3,2); //4, 3
    game.placeDiscAt(1,0); //2, 1
    game.placeDiscAt(2,0); //3, 1
    game.placeDiscAt(3,1); //4, 2
    game.placeDiscAt(3,3); //4, 4
    game.prepareNextTurn();
    game.placeDiscAt(0,0);
    game.prepareNextTurn();
    game.placeDiscAt(2,3);
    expect(game.isBoardFull()).toBe(true);
});

test('isValidMove() Test 1', () => {
    let game = new Othello(4, 1, 'B');
    expect(game.isValidMove(0,0)).toBe(false);
    expect(game.isValidMove(0,3)).toBe(false);
    expect(game.isValidMove(3,0)).toBe(false);
    expect(game.isValidMove(3,3)).toBe(false);
    expect(game.isValidMove(0,1)).toBe(false);
    expect(game.isValidMove(1,0)).toBe(false);
    expect(game.isValidMove(2,3)).toBe(false);
    expect(game.isValidMove(3,2)).toBe(false);
});

test('isValidMove() Test 2', () => {
    let game = new Othello(4, 1, 'W');
    expect(game.isValidMove(0,0)).toBe(false);
    expect(game.isValidMove(0,2)).toBe(false);
    expect(game.isValidMove(0,3)).toBe(false);
    expect(game.isValidMove(1,3)).toBe(false);
    expect(game.isValidMove(2,0)).toBe(false);
    expect(game.isValidMove(3,0)).toBe(false);
    expect(game.isValidMove(3,1)).toBe(false);
    expect(game.isValidMove(3,3)).toBe(false);
});

test('isValidMove() Test 3', () => {
    let game = new Othello(4, 1, 'B');
    expect(game.isValidMove(0,2)).toBe(true);
    expect(game.isValidMove(1,3)).toBe(true);
    expect(game.isValidMove(2,0)).toBe(true);
    expect(game.isValidMove(3,1)).toBe(true);
});

test('isValidMove() Test 4', () => {
    let game = new Othello(4, 1, 'W');
    expect(game.isValidMove(0,1)).toBe(true);
    expect(game.isValidMove(1,0)).toBe(true);
    expect(game.isValidMove(2,3)).toBe(true);
    expect(game.isValidMove(3,2)).toBe(true);
});

test('isValidMoveAvailable() Test 1', () => {
    let game = new Othello(4, 1, 'W');
    expect(game.isValidMoveAvailable()).toBe(true);
});

test('isValidMoveAvailable() Test 2', () => {
    let game = new Othello(4, 1, 'B');
    expect(game.isValidMoveAvailable()).toBe(true);
});

test('isValidMoveAvailable() Test 3', () => {
    let game = new Othello(4, 1, 'B');
    game.placeDiscAt(1,3);
    game.placeDiscAt(0,3);
    game.placeDiscAt(0,2);
    game.placeDiscAt(0,1);
    game.placeDiscAt(3,0);
    game.placeDiscAt(3,2);
    game.placeDiscAt(1,0);
    game.placeDiscAt(2,0);
    game.placeDiscAt(3,1);
    game.placeDiscAt(3,3);
    game.prepareNextTurn();
    game.placeDiscAt(0,0);
    game.prepareNextTurn();
    game.placeDiscAt(2,3);
    expect(game.isValidMoveAvailable()).toBe(false);
});

test('4x4 Board Play Test', () => {
    let game = new Othello(4, 1, 'B');
    game.placeDiscAt(1,3); //2 4
    game.placeDiscAt(0,3); //1 4
    game.placeDiscAt(0,2); //1 3
    game.placeDiscAt(0,1); //1 2
    game.placeDiscAt(3,0); //4 1
    game.placeDiscAt(3,2); //4 3
    game.placeDiscAt(1,0); //2 1
    game.placeDiscAt(2,0); //3 1
    game.placeDiscAt(3,1); //4 2
    game.placeDiscAt(3,3); //4 4
    game.prepareNextTurn();
    game.placeDiscAt(0,0); //1 1
    game.prepareNextTurn();
    game.placeDiscAt(2,3); //3 4
    expect(game.isGameOver()).toBe(true);
    expect(game.checkWinner()).toBe(Othello.WHITE);
});

test('6x6 Board Play Test', () => {
    let game = new Othello(6, 2, 'W');
    game.placeDiscAt(2,1);
    game.placeDiscAt(1,3);
    game.placeDiscAt(2,4);
    game.placeDiscAt(3,5);
    game.placeDiscAt(4,4);
    game.placeDiscAt(2,0);
    game.placeDiscAt(1,1);
    game.placeDiscAt(0,1);
    game.placeDiscAt(0,0);
    game.placeDiscAt(4,1);
    game.placeDiscAt(2,5);
    game.placeDiscAt(4,3);
    game.placeDiscAt(4,2);
    game.placeDiscAt(4,5);
    game.placeDiscAt(5,5);
    game.placeDiscAt(1,2);
    game.placeDiscAt(4,0);
    game.placeDiscAt(5,3);
    game.placeDiscAt(1,4);
    game.placeDiscAt(0,3);
    game.placeDiscAt(0,2);
    game.placeDiscAt(5,0);
    game.placeDiscAt(3,1);
    game.placeDiscAt(0,5);
    game.placeDiscAt(3,4);
    game.placeDiscAt(5,4);
    game.placeDiscAt(5,1);
    game.placeDiscAt(1,0);
    game.placeDiscAt(0,4);
    game.placeDiscAt(5,2);
    game.placeDiscAt(3,0);
    game.prepareNextTurn();
    game.placeDiscAt(1,5);
    expect(game.isGameOver()).toBe(true);
    expect(game.checkWinner()).toBe(Othello.WHITE);
});

test('8x8 Board Play Test', () => {
    let game = new Othello(8, 1, 'B');
    game.placeDiscAt(5,3);
    game.placeDiscAt(5,2);
    game.placeDiscAt(3,5);
    game.placeDiscAt(2,5);
    game.placeDiscAt(4,2);
    game.placeDiscAt(3,6);
    game.placeDiscAt(3,7);
    game.placeDiscAt(3,2);
    game.placeDiscAt(1,6);
    game.placeDiscAt(0,7);
    game.placeDiscAt(4,1);
    game.placeDiscAt(5,4);
    game.placeDiscAt(6,3);
    game.placeDiscAt(6,2);
    game.placeDiscAt(6,1);
    game.placeDiscAt(7,2);
    game.placeDiscAt(7,1);
    game.placeDiscAt(2,3);
    game.placeDiscAt(3,1);
    game.placeDiscAt(2,4);
    game.placeDiscAt(6,5);
    game.placeDiscAt(6,0);
    game.placeDiscAt(1,4);
    game.placeDiscAt(2,6);
    game.placeDiscAt(7,3);
    game.placeDiscAt(5,5);
    game.placeDiscAt(4,5);
    game.placeDiscAt(4,6);
    game.placeDiscAt(4,7);
    game.placeDiscAt(2,0);
    game.placeDiscAt(5,1);
    game.placeDiscAt(6,4);
    game.placeDiscAt(3,0);
    game.placeDiscAt(2,2);
    game.placeDiscAt(1,2);
    game.placeDiscAt(5,6);
    game.placeDiscAt(5,7);
    game.placeDiscAt(0,2);
    game.placeDiscAt(2,7);
    game.placeDiscAt(6,6);
    game.placeDiscAt(7,4);
    game.placeDiscAt(7,5);
    game.placeDiscAt(6,7);
    game.placeDiscAt(7,0);
    game.placeDiscAt(0,6);
    game.placeDiscAt(5,0);
    game.placeDiscAt(4,0);
    game.placeDiscAt(7,6);
    game.placeDiscAt(2,1);
    game.placeDiscAt(1,5);
    game.placeDiscAt(1,3);
    game.placeDiscAt(7,7);
    game.placeDiscAt(0,5);
    game.placeDiscAt(1,7);
    game.placeDiscAt(0,3);
    game.placeDiscAt(0,4);
    game.placeDiscAt(1,0);
    game.placeDiscAt(0,1);
    game.placeDiscAt(1,1);
    game.placeDiscAt(0,0);
    expect(game.isGameOver()).toBe(true);
    expect(game.checkWinner()).toBe(Othello.WHITE);
});
