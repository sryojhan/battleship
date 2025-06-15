import { CreateHumanPlayer, CreateComputerPlayer } from "./player";



const GameManager = function (size, onWin, onLoose, onBeginHumanTurn, onBeginComputerTurn, VisualizeComputerSelection) {

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
        onBeginHumanTurn();
    }

    const GetAllHumanShips = function () {

        return human.GetAllShips();
    }

    const GetAllComputerShips = function () {

        return computer.GetAllShips();
    }

    const CheckVictory = function () {

        if (human.IsDefeated()) {

            onLoose();
            playing = false;
        }
        if (computer.IsDefeated()) {

            onWin();
            playing = false;
        }
        return 0;
    }

    const HumanSelection = function (i) {

        if(!playing) return;

        const col = i % size;
        const row = Math.floor(i / size);

        const ret = computer.ReceiveAttack([col, row]);

        if (ret === 1) {
            CheckVictory();
        }

        else if (ret === 0) {

            onBeginComputerTurn();
            ComputerSelection();
        }

        return ret;
    }

    const ComputerSelection = function () {

        if(!playing) return;

        const position = computer.ChooseAttack();

        const idx = position[1] * size + position[0];

        const ret = human.ReceiveAttack(position);

        if (ret === -1) {
            return ComputerSelection();
        }

        VisualizeComputerSelection(idx, ret);

        if (ret === 0) {
            onBeginHumanTurn();
            return ret;
        }

        CheckVictory();
        ComputerSelection();
    }




    const RandomHumanBoard = function () {

        human = CreateHumanPlayer(size, HumanSelection);
        RandomizeBoardPosition(human);
    }


    let human = CreateHumanPlayer(size, HumanSelection);
    const computer = CreateComputerPlayer(size);


    RandomizeBoardPosition(human);
    RandomizeBoardPosition(computer);


    return { HumanSelection, Begin, GetAllHumanShips, GetAllComputerShips, RandomHumanBoard };
}



export default GameManager;