/*
    Ship responsibilities

    - Manage it's size
    - Manage it's health
*/

const CreateShip = function (length, ShipPoints) {

    let hits = 0;

    const points = ShipPoints;

    const Hit = function () {
        
        hits++;
    }

    const IsSunk = function(){

        return hits >= length;
    }

    const GetShipPoints = function(){
        return points;
    }

    return {Hit, IsSunk, GetShipPoints};
}

export default CreateShip;
