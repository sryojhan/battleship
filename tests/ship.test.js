
import CreateShip from "../src/scripts/ship";


test('Unhit ship', ()=>{

    const ship = CreateShip(3);

    expect(ship.IsSunk()).toBe(false);
})


test('Ship hit but not sunk', ()=>{

    const ship = CreateShip(3);

    ship.Hit();

    expect(ship.IsSunk()).toBe(false);
})

test('Ship sunk', ()=>{

    const ship = CreateShip(3);

    ship.Hit();
    ship.Hit();
    ship.Hit();

    expect(ship.IsSunk()).toBe(true);
})

test('Ship hit more than its lenght', ()=>{

    const ship = CreateShip(3);

    ship.Hit();
    ship.Hit();
    ship.Hit();
    ship.Hit();

    expect(ship.IsSunk()).toBe(true);
})