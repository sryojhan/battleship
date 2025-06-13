/*
    Ship responsibilities

    - Manage it's size
    - Manage it's health
*/

const CreateShip = function (length) {

    let hits = 0;

    const Hit = function () {
        
        hits++;
    }

    const IsSunk = function(){

        return hits >= length;
    }

    return {Hit, IsSunk};
}

export default CreateShip;
