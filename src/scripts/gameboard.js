/*
    Create a Gameboard class/factory.
    Gameboards should be able to place ships at specific coordinates by calling the ship factory or class.
    Gameboards should have a receiveAttack function that takes a pair of coordinates, determines whether or not the attack hit a ship and then sends the ‘hit’ function to the correct ship, or records the coordinates of the missed shot.
    Gameboards should keep track of missed attacks so they can display them properly.
    Gameboards should be able to report whether or not all of their ships have been sunk.

    - Place ship
    - ReceiveAttack
    - Manage ship's health
    - Manage missed shots
    - Know if everything is sunk

    typical size = 10x10
    display positions: [1-10, A-J]

    ships: 1 x Carrier (5), 2 x Battleship (4), 3 x Destroyer (3), 4 x Submarine (3), 5 x Patrol Boat (2) 
*/

import CreateShip from "./ship.js";

const CreateGameboard = function (size) {

    if (size < 0) throw new Error('Size error');

    const grid = new Array(size);

    for(let it = 0; it < size; it++){
        grid[it] = new Array(size).fill(null);
    }

    const allShotPositions = [];
    const ships = [];

    const IsPointInsideBounds = function (position) {

        if (
            position[0] < 0 || position[1] < 0 ||
            position[0] >= size || position[1] >= size
        ) { return false; }
        return true;
    }

    const IsPositionAvaliable = function (position) {

        if (!IsPointInsideBounds(position)) return false;

        return grid[position[0]][position[1]] === null;
    }

    /**
     * 
     * @param {*} topLeftCoordinate 
     * @param {*} length 
     * @param {*} isHorizontal
     * @returns {boolean} Returs whether the ship was created correctly
     */
    const PlaceShip = function (topLeftCoordinate, length, isHorizontal) {

        const increment = isHorizontal ? [1, 0] : [0, 1];

        const CalculatePosition = function (i) {

            return [topLeftCoordinate[0] + increment[0] * i, topLeftCoordinate[1] + increment[1] * i];
        }

        //* First check if all the positions are valid

        for (let i = 0; i < length; i++) {

            const position = CalculatePosition(i);

            if (!IsPositionAvaliable(position)) return false;
        }

        const ship = CreateShip(length);

        for (let i = 0; i < length; i++) {

            const position = CalculatePosition(i);

            grid[position[0]][position[1]] = ship;
        }


        ships.push(ship);

        return true;
    }

    /**
     * 
     * @param {*} position 
     * @returns -1 if the position is invalid, 0 if it missed and 1 if it hit a ship
     */
    const AttackPosition = function (position) {

        if (!IsPointInsideBounds(position)) return -1;
        if (allShotPositions.find((elem) => elem[0] === position[0] && elem[1] === position[1])) return -1;

        allShotPositions.push(position);
        const ship = grid[position[0]][position[1]];


        if (ship) {

            ship.Hit();
            return 1;
        }

        return 0;
    }

    const IsEverythingSunk = function () {

        if (ships.length === 0) return true;

        return ships.every(ship => ship.IsSunk());
    }



    return { PlaceShip, AttackPosition, IsEverythingSunk };
}

export default CreateGameboard;
