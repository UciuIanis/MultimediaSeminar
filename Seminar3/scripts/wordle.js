window.onload = function () {
    let board = document.getElementById('board');
    let button = document.getElementById('submit');
    let input = document.getElementById('guess');
    let tries = 0;

    let finalWord = 'media';

    for (let i = 0; i < 6; i++) {
        let row = document.createElement('div');
        row.classList = 'boardRow';
        for (let j = 0; j < 5; j++) {
            let cell = document.createElement('div');
            cell.classList = 'cell';
            cell.setAttribute('data-row', i);
            cell.setAttribute('data-column', j);
            row.append(cell);
        }
        board.append(row);
    }

    button.addEventListener('click', function () {
        let guessWord = input.value;

        if(tries>5){
            alert("You already lost!");
        }

        if (guessWord.length == 5) {
            for (let i = 0; i < 5; i++) {
                let cell = document.querySelector(`[data-row="${tries}"][data-column="${i}"]`);
                cell.innerHTML = guessWord[i];
                if (guessWord[i] == finalWord[i]) {
                    //green
                    cell.style.backgroundColor='green';
                } else {
                    if (finalWord.indexOf(guessWord[i]) < 0) {
                        //red
                        cell.style.backgroundColor='red';
                    } else {
                        //yellow
                        cell.style.backgroundColor='yellow';
                    }
                }
            }
        }

        if(guessWord==finalWord){
            alert("You won!");
        }else{
            if(tries==5){
                alert("You lost!");
            }
        }
        
        input.value='';
        tries++;
    })
}

