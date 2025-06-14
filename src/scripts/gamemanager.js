import { CreateHumanPlayer, CreateComputerPlayer } from "./player";



const GameManager = function (size) {

    let playing = false;

    const ships = [5, 4, 3, 3, 2];

    const RandomizeBoardPosition = function (player) {

        player.GetAllShips().length = 0;

        for (const shipLength of ships) {

            let valid = false;

            do {

                const col = Math.floor(Math.random() * size);
                const row = Math.floor(Math.random() * size);

                const isHorizontal = Math.random() > 0.5 ? true : false;

                valid = player.PlaceShip([col, row], shipLength, isHorizontal);

            } while (!valid);
        }
    }

    const Begin = function () {
        playing = true;

    }

    const GetAllHumanShips = function () {

        return human.GetAllShips();
    }

    const GetAllComputerShips = function () {

        return computer.GetAllShips();
    }

    const BeginHumanSelection = function () {

    }

    const HumanSelection = function (i) {

        const col = i % size;
        const row = Math.floor(i / size);

        return computer.ReceiveAttack([col, row]);
    }


    const RandomHumanBoard = function(){

        human = CreateHumanPlayer(size, HumanSelection);
        RandomizeBoardPosition(human);
    }


    let human = CreateHumanPlayer(size, HumanSelection);
    const computer = CreateComputerPlayer(size);


    RandomizeBoardPosition(human);
    RandomizeBoardPosition(computer);


    return { HumanSelection, Begin, GetAllHumanShips, GetAllComputerShips , RandomHumanBoard};
}



export default GameManager;