const displayPlayer = document.querySelector('.displayPlayer');
const sectors = Array.from(document.querySelectorAll('.sector'));
const winner = document.querySelector('.winner');
const winPlayer = document.querySelector('.winPlayer');
const resetBtn = document.querySelector('.resetBtn');
const gameTable = document.querySelector('.gameTable');
const playSelect = document.querySelector('#playSelect');
const nextPlay = document.querySelector('.nextPlayBtn');
let finalScore = document.querySelector('.finalScore');
var noOfPlays = '';
let trs = '';
let tds = '';
var play = 1;
var p1Score = 0;
var p2Score = 0;
let currentPlayer = 'X';
displayPlayer.innerText = currentPlayer;
displayPlayer.style.color = 'green';
let activeGame = false;
nextPlay.disabled = true;
let stateOfGame = ['', '', '', '', '', '', '', '', ''];
const winingCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];
function Score() {
    if (play === noOfPlays.length) {

        if (p1Score > p2Score) {

            finalScore.innerHTML = `Player <span class = "p1Color">X</span> won with ${p1Score} : ${p2Score}`;

        } else if (p1Score < p2Score) {

            finalScore.innerHTML = `Player <span class = "p2Color">O</span> won with ${p2Score} : ${p1Score}`;

        } else if (p1Score === p2Score) {

            finalScore.innerHTML = `It's a draw! ${p2Score} : ${p1Score}`;

        };
        finalScore.classList.remove('hide');
    };

    console.log(finalScore.innerHTML);
};
playSelect.addEventListener('change', function () {
    this.disabled = true;
    activeGame = true;
    let playTo = this.value;
    let tr1 = document.createElement('tr');
    let th1 = document.createElement('th');
    let th2 = document.createElement('th');
    th1.innerHTML = 'Player <span class="p1Color">X</span >';
    th2.innerHTML = 'Player <span class="p2Color">O</span >';
    gameTable.appendChild(tr1);
    tr1.appendChild(th1);
    tr1.appendChild(th2);
    for (let i = 0; i < playTo; i++) {
        let tr = document.createElement('tr');
        let td1 = document.createElement('td');
        let td2 = document.createElement('td');
        tr.classList.add('playNo');
        td1.classList.add('tableData');
        td2.classList.add('tableData');
        gameTable.appendChild(tr);
        tr.appendChild(td1);
        tr.appendChild(td2);
    };

    noOfPlays = Array.from(document.querySelectorAll('.playNo'));
    for (let i = 0; i < sectors.length; i++) {

        function Game(evt) {

            if (activeGame && this.innerText === '') {

                if (currentPlayer === 'X') {
                    displayPlayer.style.color = 'blue';
                    this.innerText = currentPlayer;
                    this.classList.add('p1Color');
                    stateOfGame[i] = currentPlayer;
                    currentPlayer = 'O';
                    displayPlayer.innerText = currentPlayer;

                } else {
                    displayPlayer.style.color = 'green';
                    this.innerText = currentPlayer;
                    this.classList.add('p2Color');
                    stateOfGame[i] = currentPlayer;
                    currentPlayer = 'X';
                    displayPlayer.innerText = currentPlayer;

                };
                console.log(`vrednost na play po klikanje ${play}`);
                for (let winingCombination of winingCombinations) {
                    let a = stateOfGame[winingCombination[0]];
                    let b = stateOfGame[winingCombination[1]];
                    let c = stateOfGame[winingCombination[2]];

                    if (a === b && b === c) {
                        if (play === noOfPlays.length) {
                            nextPlay.innerText = 'Show Result';
                        }
                        if (a === 'X') {
                            winner.innerHTML = 'The winner is player <span class="p1Color">X</span>';
                            winner.classList.remove('hide');
                            p1Score++;
                            noOfPlays[play - 1].children[0].innerText = 'W';
                            noOfPlays[play - 1].children[0].style.color = 'green';
                            noOfPlays[play - 1].children[1].innerText = 'L';
                            noOfPlays[play - 1].children[1].style.color = 'red';
                            activeGame = false;
                            nextPlay.disabled = false;



                        } else if (a === 'O') {
                            winner.innerHTML = 'The winner is player <span class="p2Color">O</span>';
                            winner.classList.remove('hide');
                            p2Score++;
                            noOfPlays[play - 1].children[0].innerText = 'L';
                            noOfPlays[play - 1].children[0].style.color = 'red';
                            noOfPlays[play - 1].children[1].innerText = 'W';
                            noOfPlays[play - 1].children[1].style.color = 'green';
                            activeGame = false;
                            nextPlay.disabled = false;

                        };

                    };


                };
                if (!stateOfGame.includes('')) {
                    winner.innerHTML = "IT IS A TIE!";
                    noOfPlays[play - 1].children[0].innerText = '/';
                    noOfPlays[play - 1].children[1].innerText = '/';
                    winner.classList.remove('hide');
                    activeGame = false;
                    nextPlay.disabled = false;

                };

            };

        };
        sectors[i].addEventListener('click', Game);








    };



});


nextPlay.addEventListener('click', function () {

    if (play < noOfPlays.length) {
        this.disabled = true;
        stateOfGame = ['', '', '', '', '', '', '', '', ''];
        for (sector of sectors) {
            sector.innerText = '';
            sector.classList.remove('p1Color', 'p2Color');
        };
        winner.classList.add('hide');
        currentPlayer = 'X';
        displayPlayer.innerText = currentPlayer;
        play++;
        activeGame = true;

    } else {
        this.disabled = true;
        activeGame = false;
        this.innerText = 'Game Over';
        Score();
    }




});
resetBtn.addEventListener('click', () => {
    stateOfGame = ['', '', '', '', '', '', '', '', ''];
    for (sector of sectors) {
        sector.innerText = '';
        sector.classList.remove('p1Color', 'p2Color');
    };
    winner.classList.add('hide');

    currentPlayer = 'X';
    displayPlayer.innerText = currentPlayer;
    // noOfPlays[play - 1].children[0].innerText = '';
    // noOfPlays[play - 1].children[1].innerText = '';
    trs = document.querySelectorAll('tr');
    tds = document.querySelectorAll('tds');
    document.querySelector("select").value = '';
    for (let tr of trs) {
        tr.remove();
    };
    for (let td of tds) {
        td.remove();
    };
    playSelect.disabled = false;
    nextPlay.innerText = 'New Game';
    finalScore.classList.add('hide');
    noOfPlays = [];
    play = 1;
    p1Score = 0;
    p2Score = 0;
    activeGame = false;
});