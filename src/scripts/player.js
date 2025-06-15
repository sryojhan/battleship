import CreateGameboard from "./gameboard.js"


const CreatePlayer = function (size) {

    const board = CreateGameboard(size);
    const ships = [];

    const ReceiveAttack = function (position) {
        return board.AttackPosition(position);
    }

    const IsDefeated = function () {

        return board.IsEverythingSunk();
    }

    const PlaceShip = function(topLeftCoordinate, length, isHorizontal){

        const ret = board.PlaceShip(topLeftCoordinate, length, isHorizontal);

        if(ret){

            ships.push({position: topLeftCoordinate, length, isHorizontal});
        }

        return ret;
    }

    const ChooseAttack = function(){

    }

    const GetAllShips = function(){
        return ships;
    }

    //* Add ChooseAttack here so intellisense detects it
    return { ChooseAttack, ReceiveAttack, IsDefeated, PlaceShip, GetAllShips, isHuman: true };
}

const CreateHumanPlayer = function (size, HumanSelection) {

    const playerLogic = CreatePlayer(size);

    playerLogic.ChooseAttack = HumanSelection;

    return playerLogic;
}


const CreateComputerPlayer = function (size) {


    const playerLogic = CreatePlayer(size);

    const options = Array.from({length: size * size}, (_, idx) => idx);

    const RandomComputerAttack = function(){

        if(options.length === 0) return [0, 0];

        const optIdx = Math.floor(Math.random() * options.length);
        const positionIdx = options[optIdx];

        options.splice(optIdx, 1);

        const col = positionIdx % size;
        const row = Math.floor(positionIdx / size);

        return [col, row];
    }


    playerLogic.ChooseAttack = RandomComputerAttack;
    playerLogic.isHuman = false;

    return playerLogic;
}



export {CreateHumanPlayer, CreateComputerPlayer};