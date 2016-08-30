var gameBoard = ['vide', 'vide', 'vide', 'vide', 'croix', 'vide', 'vide', 'vide', 'vide'];
var moveNumber = 0;

//listener for player's click and action, popluates gameBoard var with move
$('.zone').on('click', function () {
    moveNumber++;
    if ($(this).hasClass('vide')){
        $(this).children().attr('src', 'img/rond.png');
        $(this).removeClass('vide').addClass('rond');
        gameBoard[$(this).attr('id').replace('z', '')] = 'rond';
        if (winLose() !== true) {
            skyNet();
        }
    }
});

function skyNet() {
    //winning conditions et winning relative positions base on index.
    var condition1 = [0, 1, 0, 3, 5, 4, 6, 7, 6, 0, 3, 0, 1, 4, 1, 2, 5, 2, 0, 4, 0, 2, 4, 2];
    var condition2 = [1, 2, 2, 4, 3, 5, 7, 8, 8, 3, 6, 6, 4, 7, 7, 5, 8, 8, 4, 8, 8, 4, 6, 6];
    var winningMove = [2, 0, 1, 5, 4, 3, 8, 6, 7, 6, 0, 3, 7, 1, 4, 8, 2, 5, 8, 0, 4, 6, 2, 4];
    var result = false;

    //changes class and img
    function makeMove(moveIndex) {
        $('#z' + moveIndex + '').removeClass('vide').addClass('croix').children().attr('src', 'img/croix.png');
    }

    //optimal first move
    if (result == false && gameBoard[4] == 'vide') {
        gameBoard[4] = 'croix';
        $('#z4').removeClass('vide').addClass('croix').children().attr('src', 'img/croix.png');
        result = true;
    }

    //optimal second move depending on player's move
    if (moveNumber == 1) {
        var secondMoveIf = [0, 2, 1, 5, 8, 6, 3, 7];
        var secondMoveThen = [8, 6, 6, 6, 0, 2, 2, 2];
        for ( var h = 0 ; h < 8 ; h++ ) {
            if (result == false && gameBoard[secondMoveIf[h]] == 'rond' && gameBoard[secondMoveThen[h]] == 'vide') {
                gameBoard[secondMoveThen[h]] = 'croix';
                makeMove(secondMoveThen[h]);
                return true;
            }
        }
    }

    // checks if a winning move is possible
    for (var j = 0 ; j < 24 ; j++) {
        if (result == false && gameBoard[condition1[j]] == gameBoard[condition2[j]] && gameBoard[condition1[j]] == 'croix') {
            if (gameBoard[winningMove[j]] == 'vide'){
                gameBoard[winningMove[j]] = 'croix';
                makeMove(winningMove[j]);
                result = true;
                break;
            }
        }
    }

    // checks if it's possible to block a winning move from opponent
    for (var i = 0 ; i < 24 ; i++) {

        if (result == false && gameBoard[condition1[i]] == gameBoard[condition2[i]] && gameBoard[condition1[i]] == 'rond') {
            if (gameBoard[winningMove[i]] == 'vide'){
                gameBoard[winningMove[i]] = 'croix';
                makeMove(winningMove[i]);
                result = true;
            }
        }
    }

    //optimal third move
    if (moveNumber == 2) {
        var thirdMoveIf = [8, 8, 6, 6, 0, 0, 2, 2];
        var thirdMoveThen = [2, 6, 0, 8, 2, 6, 0, 8];
        for ( var g = 0 ; g < 8 ; g++ ) {
            if (result == false && gameBoard[thirdMoveIf[g]] == 'rond' && gameBoard[thirdMoveThen[g]] == 'vide') {
                gameBoard[thirdMoveThen[g]] = 'croix';
                makeMove(thirdMoveThen[g]);
                return true;
            }
        }
    }


    // If no winning or optimal move is possible, will play on a random empty case
    if (result == false) {
        for (var k = 0 ; k < 9 ; k++ ) {
            randomNumber = Math.floor((Math.random() * 8) + 1);
            if (gameBoard[randomNumber] == 'vide') {
                gameBoard[randomNumber] = 'croix';
                makeMove(randomNumber);
                result = true;
                break;
            }
        }
    }
}

function winLose() {
    var position1 = [0, 3, 6, 0, 1, 2, 0, 2];
    var position2 = [1, 4, 7, 3, 4, 5, 4, 4];
    var position3 = [2, 5, 8, 6, 7, 8, 8, 6];
    for ( var num = 0 ; num < 8 ; num++ ) {

        if (gameBoard[position1[num]] == gameBoard[position2[num]] && gameBoard[position1[num]] == gameBoard[position3[num]]) {
            if (gameBoard[position1[num]] == 'rond') {
                $("#win").html('<h2>GAGNE!!</h2>')
                return true;
            }
            else if (gameBoard[position1[num]] == 'croix') {
                $("#win").html('<h2>PERDU!!</h2>');
                return true;
            }
        }
    }
}