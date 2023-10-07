// Các hàm di chuyển và tìm ô có thể đi cho quân cờ

function move(currentPiece,des) {
    let isPiece = des.classList.contains('Piece');
    if(validSquare.includes(des) || validSquare.includes(des.parentNode) ) {
        if(isPiece == true) {
            des.parentNode.append(currentPiece)
            des.remove();
        } else {
            des.append(currentPiece);
        }
        currentPiece.setAttribute('firstMove',false);
        setTimeout(alertEndGame, 0);
        changeTurn();
        if(currentPiece.id == 'Pawn'){
            promotion(currentPiece);
        }
    }
}

function canMove(currentPiece) {
    let desSquares = [];
    switch (currentPiece.id) {
        case 'Pawn' :
            pawnScan(desSquares,currentPiece);
            break;

        case 'Knight' :
            knightScan(desSquares,currentPiece);
            break;

        case 'Queen' :
            queenScan(desSquares,currentPiece);;
            break;

        case 'King' :
            kingScan(desSquares,currentPiece);
            break;

        case 'Bishop' :
            diagonScan(desSquares,currentPiece);
            break;

        case 'Castle' :
            straightScan(desSquares,currentPiece);
            break;
      
    }
    return desSquares;
}

function straightScan(squares,currentPiece) {
    let rowIndex = parseInt(currentPiece.parentNode.getAttribute('rowIndex'));
    let colIndex = parseInt(currentPiece.parentNode.getAttribute('colIndex'));
    let us = currentPiece.classList.contains('WhitePlayer') ? 'WhitePlayer': 'BlackPlayer';
    let enemy =  us == 'WhitePlayer' ? 'BlackPlayer' : 'WhitePlayer'
    for(i = colIndex -1; i >= 0 ;i--) {
        let squareAtI =  document.querySelector(`[rowIndex="${rowIndex}"][colIndex="${i}"]`);
        if( squareAtI?.firstChild?.classList.contains(enemy)) {
            squares.push(squareAtI);
            break;
        } else if(squareAtI?.firstChild?.classList.contains(us)) {
            break;
        }
        squares.push(squareAtI);
    }
    for(i = colIndex + 1;  i <= 7; i++) {
        let squareAtI =  document.querySelector(`[rowIndex="${rowIndex}"][colIndex="${i}"]`);
        if(squareAtI?.firstChild?.classList.contains(enemy)) {
            squares.push(squareAtI);
            break;
        } else if(squareAtI?.firstChild?.classList.contains(us)) {
            break;
        }
        squares.push(squareAtI);
    }

    for(i = colIndex + 1; i >= 0 ;i--) {
        let squareAtI =  document.querySelector(`[rowIndex="${rowIndex}"][colIndex="${i}"]`);
        if(squareAtI?.firstChild?.classList.contains(enemy)) {
            squares.push(squareAtI);
            break;
        } else if(squareAtI?.firstChild?.classList.contains(us))  {
            break;
        }
        squares.push(squareAtI);
    }

    for(i = rowIndex - 1;  i >= 0; i--) {
        let squareAtI =  document.querySelector(`[rowIndex="${i}"][colIndex="${colIndex}"]`);
        if(squareAtI?.firstChild?.classList.contains(enemy)) {
            squares.push(squareAtI);
            break;
        } else if(squareAtI?.firstChild?.classList.contains(us)) {
            break;
        }
        squares.push(squareAtI);
    }

    for(i = rowIndex + 1;  i <= 7; i++) {
        let squareAtI =  document.querySelector(`[rowIndex="${i}"][colIndex="${colIndex}"]`);
        if(squareAtI?.firstChild?.classList.contains(enemy)) {
            squares.push(squareAtI);
            break;
        }  else if(squareAtI?.firstChild?.classList.contains(us))  {
            break;
        }
        squares.push(squareAtI);
    }
}

function diagonScan(squares,currentPiece){

    let rowIndex = parseInt(currentPiece.parentNode.getAttribute('rowIndex'));
    let colIndex = parseInt(currentPiece.parentNode.getAttribute('colIndex'));
    let us = currentPiece.classList.contains('WhitePlayer') ? 'WhitePlayer': 'BlackPlayer';
    let i = 1;
    let enemy =  us == 'WhitePlayer' ? 'BlackPlayer' : 'WhitePlayer'
    // -1 -1
    while(true) {
        let topLeft = document.querySelector(`[rowIndex="${rowIndex - i}"][colIndex="${colIndex - i}"]`);
        if(!topLeft || topLeft.firstChild?.classList.contains(us)) break;
        if(topLeft.firstChild?.classList.contains(enemy)) {
            squares.push(topLeft);
            break;
        }
        squares.push(topLeft);
        i++;
    }

    // +1 +1
    i = 1;
    while(true) {
        let topLeft = document.querySelector(`[rowIndex="${rowIndex + i}"][colIndex="${colIndex + i}"]`);
        if(!topLeft || topLeft.firstChild?.classList.contains(us)) break;
        if(topLeft.firstChild?.classList.contains(enemy)) {
            squares.push(topLeft);
            break;
        }
        squares.push(topLeft);
        i++;
    }

    // -1 +1
    i = 1;
    while(true) {
        let topLeft = document.querySelector(`[rowIndex="${rowIndex - i}"][colIndex="${colIndex + i}"]`);
        if(!topLeft || topLeft.firstChild?.classList.contains(us)) break;
        if(topLeft.firstChild?.classList.contains(enemy)) {
            squares.push(topLeft);
            break;
        }
        squares.push(topLeft);
        i++;
    }

    // +1 -1
    i = 1;
    while(true) {
        let topLeft = document.querySelector(`[rowIndex="${rowIndex + i}"][colIndex="${colIndex - i}"]`);
        if(!topLeft || topLeft.firstChild?.classList.contains(us)) break;
        if(topLeft.firstChild?.classList.contains(enemy)) {
            squares.push(topLeft);
            break;
        }
        squares.push(topLeft);
        i++;
    }
}

function queenScan(squares, currentPiece){
    straightScan(squares,currentPiece);
    diagonScan(squares,currentPiece);
}

function kingScan(squares, currentPiece) {

    let rowIndex = parseInt(currentPiece.parentNode.getAttribute('rowIndex'));
    let colIndex = parseInt(currentPiece.parentNode.getAttribute('colIndex'));
    let direction = currentPiece.classList.contains('WhitePlayer') ? -1: 1;
    let us = currentPiece.classList.contains('WhitePlayer') ? 'WhitePlayer': 'BlackPlayer';
    let enemy =  us == 'WhitePlayer' ? 'BlackPlayer' : 'WhitePlayer'

    let up = document.querySelector(`[rowIndex="${rowIndex + 1 * direction}"][colIndex="${colIndex}"]`);
    let down = document.querySelector(`[rowIndex="${rowIndex - 1  * direction}"][colIndex="${colIndex}"]`);
    let left = document.querySelector(`[rowIndex="${rowIndex }"][colIndex="${colIndex - 1}"]`);
    let right = document.querySelector(`[rowIndex="${rowIndex}"][colIndex="${colIndex + 1}"]`);
    let upLeft = document.querySelector(`[rowIndex="${rowIndex + 1 * direction}"][colIndex="${colIndex - 1}"]`);
    let upRight = document.querySelector(`[rowIndex="${rowIndex + 1 * direction}"][colIndex="${colIndex + 1}"]`);
    let downLeft = document.querySelector(`[rowIndex="${rowIndex - 1 * direction}"][colIndex="${colIndex - 1}"]`);
    let downRight = document.querySelector(`[rowIndex="${rowIndex - 1 * direction}"][colIndex="${colIndex + 1}"]`);

    if(up?.firstChild?.classList.contains(enemy) || !up?.firstChild) squares.push(up);
    if(down?.firstChild?.classList.contains(enemy) || !down?.firstChild) squares.push(down);

    if(left?.firstChild?.classList.contains(enemy) || !left?.firstChild) squares.push(left);
    if(right?.firstChild?.classList.contains(enemy) || !right?.firstChild) squares.push(right);

    if(upLeft?.firstChild?.classList.contains(enemy) || !upLeft?.firstChild) squares.push(upLeft);
    if(upRight?.firstChild?.classList.contains(enemy) || !upRight?.firstChild) squares.push(upRight);

    if(downLeft?.firstChild?.classList.contains(enemy) || !downLeft?.firstChild) squares.push(downLeft);
    if(downRight?.firstChild?.classList.contains(enemy) || !downRight?.firstChild) squares.push(downRight);    
}

function pawnScan(squares,currentPiece){

    let rowIndex = parseInt(currentPiece.parentNode.getAttribute('rowIndex'));
    let colIndex = parseInt(currentPiece.parentNode.getAttribute('colIndex'));
    let direction = currentPiece.classList.contains('WhitePlayer') ? -1: 1;
    let us = currentPiece.classList.contains('WhitePlayer') ? 'WhitePlayer': 'BlackPlayer';
    let enemy =  us == 'WhitePlayer' ? 'BlackPlayer' : 'WhitePlayer'

    let frontLeft = document.querySelector(`[rowIndex="${rowIndex + 1 * direction}"][colIndex="${colIndex - 1}"]`);
    let frontRight = document.querySelector(`[rowIndex="${rowIndex + 1 * direction}"][colIndex="${colIndex + 1}"]`);
    let front1Step = document.querySelector(`[rowIndex="${rowIndex + 1 * direction}"][colIndex="${colIndex}"]`);
    let front2Step = document.querySelector(`[rowIndex="${rowIndex + 2 * direction}"][colIndex="${colIndex}"]`);

    if(front1Step && !front1Step.firstChild?.classList.contains('Piece')) {
        squares.push(front1Step);
    }
    if(frontRight && frontRight.firstChild?.classList.contains(enemy)) {
        squares.push(frontRight);
    }
    if(frontLeft && frontLeft.firstChild?.classList.contains(enemy)) {
        squares.push(frontLeft);
    }
    if(currentPiece.getAttribute('firstMove') == 'true' && !front1Step.firstChild && !front2Step?.firstChild) {
        squares.push(front2Step);
    }
}

function knightScan(squares,currentPiece) {

    let rowIndex = parseInt(currentPiece.parentNode.getAttribute('rowIndex'));
    let colIndex = parseInt(currentPiece.parentNode.getAttribute('colIndex'));
    let direction = currentPiece.classList.contains('WhitePlayer') ? -1: 1;
    let us = currentPiece.classList.contains('WhitePlayer') ? 'WhitePlayer': 'BlackPlayer';
    let enemy =  us == 'WhitePlayer' ? 'BlackPlayer' : 'WhitePlayer'

    let move_up_2_left_1 = document.querySelector(`[rowIndex="${rowIndex + 2 * direction}"][colIndex="${colIndex - 1 }"]`);
    let move_up_2_right_1 = document.querySelector(`[rowIndex="${rowIndex + 2 * direction}"][colIndex="${colIndex + 1}"]`);
    let move_up_1_left_2 = document.querySelector(`[rowIndex="${rowIndex + 1 * direction}"][colIndex="${colIndex - 2}"]`);
    let move_up_1_right_2 = document.querySelector(`[rowIndex="${rowIndex + 1 * direction}"][colIndex="${colIndex + 2}"]`);
    let move_down_1_left_2 = document.querySelector(`[rowIndex="${rowIndex - 1 * direction}"][colIndex="${colIndex - 2}"]`);
    let move_down_1_right_2 = document.querySelector(`[rowIndex="${rowIndex - 1 * direction}"][colIndex="${colIndex + 2}"]`);
    let move_down_2_left_1 = document.querySelector(`[rowIndex="${rowIndex - 2 * direction}"][colIndex="${colIndex - 1}"]`);
    let move_down_2_right_1 = document.querySelector(`[rowIndex="${rowIndex - 2 * direction}"][colIndex="${colIndex + 1}"]`);


    if(move_up_2_left_1 && (!move_up_2_left_1.firstChild || move_up_2_left_1.firstChild.classList.contains(enemy) )) squares.push(move_up_2_left_1);
    if(move_up_2_right_1 && (!move_up_2_right_1.firstChild || move_up_2_right_1.firstChild.classList.contains(enemy) )) squares.push(move_up_2_right_1);

    if(move_up_1_left_2 && (!move_up_1_left_2.firstChild || move_up_1_left_2.firstChild.classList.contains(enemy) )) squares.push(move_up_1_left_2);
    if(move_up_1_right_2 && (!move_up_1_right_2.firstChild || move_up_1_right_2.firstChild.classList.contains(enemy) )) squares.push(move_up_1_right_2);

    if(move_down_1_left_2 && (!move_down_1_left_2.firstChild || move_down_1_left_2.firstChild.classList.contains(enemy) )) squares.push(move_down_1_left_2);
    if(move_down_1_right_2 && (!move_down_1_right_2.firstChild || move_down_1_right_2.firstChild.classList.contains(enemy) )) squares.push(move_down_1_right_2);

    if(move_down_2_left_1 && (!move_down_2_left_1.firstChild || move_down_2_left_1.firstChild.classList.contains(enemy) )) squares.push(move_down_2_left_1);
    if(move_down_2_right_1 && (!move_down_2_right_1.firstChild || move_down_2_right_1.firstChild.classList.contains(enemy) )) squares.push(move_down_2_right_1);
       
}
