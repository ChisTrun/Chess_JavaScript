
// chuyển lượt chơi
function changeTurn(){
    let changePieces;
    if(turn == 'BlackPlayer') {
        changePieces = document.querySelectorAll('.WhitePlayer');
        turn = 'WhitePlayer'
    } else if(turn = 'WhitePlayer') {
        changePieces = document.querySelectorAll('.BlackPlayer'); 
        turn = 'BlackPlayer'
    }
    
    let allPieces = document.querySelectorAll('.Piece');
    for (const piece of allPieces) {
        piece?.setAttribute('draggable',false);
    }
    for (const piece of changePieces) {
        piece?.setAttribute('draggable',true);
    }
    let text = document.querySelector('#Turn');
    text.innerHTML = `${turn} turn`;
}

// Điều kiện kết thúc ván chơi
function checkKing() {
    let kings = document.querySelectorAll('#King');
    if(kings.length == 1) return true;
    return false;
}

function resetGame() {
    while(gameBoard.firstChild) {
        gameBoard.removeChild(gameBoard.firstChild);
    }
    document.querySelector('#Turn').innerHTML = `WhitePlayer turn`;
    currentPiece = null;
    validSquare = null;
    hasClicked = false;
    turn = 'WhitePlayer';
    gameInit();
}

function alertEndGame() {
    if(checkKing()) {
        alert(`${currentPiece.classList.contains('WhitePlayer') ? 'WhitePlayer': 'BlackPlayer'} win!!!!`);
        resetGame();
    }
}

// Phong hậu
function promotion(currentPawn) {
    let us = currentPawn.classList.contains('WhitePlayer') ? 'WhitePlayer': 'BlackPlayer';
    let parentNode = currentPawn.parentNode;
    let rowIndex = parseInt(parentNode.getAttribute('rowIndex'));
    let triggerRow = us == 'WhitePlayer'? 0 : 7;

    if(rowIndex == triggerRow) {
        parentNode.removeChild(currentPawn);
        parentNode.innerHTML = Queen;
        parentNode.firstChild.classList.add(us);
        parentNode.firstChild.setAttribute('draggable',false);  
        endDrag();
             
    } 
}