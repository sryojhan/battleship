
let size = null;

const board = document.querySelector('.self');
const enemy = document.querySelector('.enemy');


const CreateBoardBackground = function (parent, size, clickCallback) {


    const sqrSize = size * size;

    for (let i = 0; i < sqrSize; i++) {

        const elem = document.createElement('div');
        elem.classList.add('cell');

        parent.append(elem);

        elem.addEventListener('click', () => {

            if (elem.classList.contains('water') || elem.classList.contains('hit') || elem.classList.contains('reveal')) return;

            const result = clickCallback(i);

            switch (result) {

                case 0:
                    {
                        elem.classList.add('water');
                        break;
                    }

                case 1:
                    {
                        elem.classList.add('hit');
                        break;
                    }

                case -1:
                    {
                        break;
                    }
            }

        });
    }

    parent.style.gridTemplateColumns = `repeat(${size}, 1fr)`
    parent.style.gridTemplateRows = `repeat(${size}, 1fr)`
}


const InitialiseBoards = function (boardSize, selfSelection, boardSelection) {

    size = boardSize;
    CreateBoardBackground(board, size, selfSelection);
    CreateBoardBackground(enemy, size, boardSelection);
}

const HighlightPlayerShips = function (isPlayer, ships) {

    console.log(ships);

    const parent = isPlayer ? board : enemy;

    const revealElements = parent.querySelectorAll('.reveal');

    revealElements.forEach(element => {

        element.classList.remove('reveal');
    });


    for (const ship of ships) {

        const increment = ship.isHorizontal ? [1, 0] : [0, 1];

        for (let i = 0; i < ship.length; i++) {


            const position = [ship.position[0] + increment[0] * i, ship.position[1] + increment[1] * i];

            const idx = position[1] * size + position[0];

            parent.children[idx].classList.add('reveal');
        }
    }

}



const InitialiseButtons = function (RandomiseBoard, GetAllShips, BeginGame) {

    const randomize = document.querySelector('#random');
    const play = document.querySelector('#play');


    randomize.addEventListener('click', () => {

        RandomiseBoard();
        HighlightPlayerShips(true, GetAllShips());
    });


    play.addEventListener('click', () => {

        BeginGame();

        randomize.remove();
        play.remove();
    });
}


const HumanWin = function () {

    alert("Human win");
}

const ComputerWin = function () {

    alert("Computer win");
}

const BeginComputerTurn = function () {

    enemy.classList.add('dark');
    board.classList.remove('dark');
}

let isComputerWaiting = false;
let isComputerTurnOver = false;
let computerMovesQueue = [];


const BeginHumanTurn = function () {


    if (isComputerWaiting) {

        isComputerTurnOver = true;
        return;
    }

    console.log("hola");


    isComputerTurnOver = false;

    enemy.classList.remove('dark');
    board.classList.add('dark');
}

const VisualizeComputerSelection = function (idx, result) {

    computerMovesQueue.push({ idx, result });
    ProcessQueueSelection();
}



const ProcessQueueSelection = async function () {

    if (isComputerWaiting) return;

    console.log("waiting");
    isComputerWaiting = true;

    const { idx, result } = computerMovesQueue.shift();
    const elem = board.children[idx];


    const sleep = 500 + Math.random() * 1500;
    await new Promise(resolve => setTimeout(resolve, sleep));


    switch (result) {

        case 0:
            {
                elem.classList.add('water');
                break;
            }

        case 1:
            {
                elem.classList.add('hit');
                break;
            }

        case -1:
            {
                break;
            }
    }



    isComputerWaiting = false;
    console.log("stop wait");



    if (computerMovesQueue.length > 0) ProcessQueueSelection();

    if (isComputerTurnOver) BeginHumanTurn();
}



export { InitialiseBoards, CreateBoardBackground, HighlightPlayerShips, InitialiseButtons, HumanWin, ComputerWin, BeginHumanTurn, BeginComputerTurn, VisualizeComputerSelection };