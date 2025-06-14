
import CreateGameboard from "../src/scripts/gameboard";


test('Basic initialisation', ()=>{

    CreateGameboard(10);
});

test('Basic initialisation', ()=>{

    expect(()=>CreateGameboard(-1)).toThrow("Size error");
});

test('Place valid boat', ()=>{

    const gameBoard = CreateGameboard(10);

    expect(gameBoard.PlaceShip([2, 2], 3, true)).toBe(true);
});

test('Place invalid ship (left)', ()=>{

    const gameBoard = CreateGameboard(10);


    expect(gameBoard.PlaceShip([-1, 2], 3, true)).toBe(false);
});


test('Place invalid ship (right)', ()=>{

    const gameBoard = CreateGameboard(10);

    expect(gameBoard.PlaceShip([9, 2], 3, true)).toBe(false);
});


test('Place invalid ship (top)', ()=>{

    const gameBoard = CreateGameboard(10);


    expect(gameBoard.PlaceShip([2, -2], 3, false)).toBe(false);
});


test('Place invalid ship (bottom)', ()=>{

    const gameBoard = CreateGameboard(10);

    expect(gameBoard.PlaceShip([2, 7], 4, false)).toBe(false);
});


test('Overlaping ships', ()=>{

    const gameBoard = CreateGameboard(10);

    gameBoard.PlaceShip([2, 2], 2, false);

    expect(gameBoard.PlaceShip([0, 2], 4, true)).toBe(false);
});


test('Adjacent ships', ()=>{

    const gameBoard = CreateGameboard(10);

    gameBoard.PlaceShip([4, 2], 2, false);
    
    expect(gameBoard.PlaceShip([0, 2], 4, true)).toBe(true);
});

test('Attack ship', ()=>{
    const gameBoard = CreateGameboard(10);
    gameBoard.PlaceShip([2, 2], 2, true);

    expect(gameBoard.AttackPosition([2, 2])).toBe(1);
});

test('Miss attack', ()=>{
    const gameBoard = CreateGameboard(10);
    gameBoard.PlaceShip([2, 2], 2, true);

    expect(gameBoard.AttackPosition([2, 3])).toBe(0);

});

test('Attack outside the board', ()=>{

    const gameBoard = CreateGameboard(10);
    gameBoard.PlaceShip([2, 2], 2, true);

    expect(gameBoard.AttackPosition([-1, 3])).toBe(-1);
});

test('Attack same spot', () =>{
    const gameBoard = CreateGameboard(10);
    gameBoard.PlaceShip([2, 2], 2, true);

    gameBoard.AttackPosition([2, 2]);
    expect(gameBoard.AttackPosition([2, 2])).toBe(-1);

});


test('Everything sunk when empty', ()=>{

    const gameBoard = CreateGameboard(10);

    expect(gameBoard.IsEverythingSunk()).toBe(true);
});

test('Dont sink everything', ()=>{

    const gameBoard = CreateGameboard(10);

    gameBoard.PlaceShip([2, 2], 2, true);
    gameBoard.AttackPosition([2, 2]);

    const value = gameBoard.IsEverythingSunk();

    expect(value).toBe(false);
});


test('Sink everything', ()=>{

    const gameBoard = CreateGameboard(10);

    gameBoard.PlaceShip([2, 2], 2, true);
    
    gameBoard.AttackPosition([2, 2]);
    gameBoard.AttackPosition([3, 2]);
    
    expect(gameBoard.IsEverythingSunk()).toBe(true);
});

test('Sink everything (vertical ship)', ()=>{

    const gameBoard = CreateGameboard(10);
    gameBoard.PlaceShip([2, 2], 4, false);

    gameBoard.AttackPosition([2, 2]);
    gameBoard.AttackPosition([2, 3]);
    gameBoard.AttackPosition([2, 4]);
    gameBoard.AttackPosition([2, 5]);

    expect(gameBoard.IsEverythingSunk()).toBe(true);
});


test('Dont sink everything, multiple ships', ()=>{

    const gameBoard = CreateGameboard(10);
    gameBoard.PlaceShip([2, 2], 2, true);
    gameBoard.PlaceShip([2, 4], 2, true);

    gameBoard.AttackPosition([2, 2]);
    gameBoard.AttackPosition([3, 2]);

    expect(gameBoard.IsEverythingSunk()).toBe(false);
});

test('Sink everything, multiple ships', ()=>{

      const gameBoard = CreateGameboard(10);
    gameBoard.PlaceShip([2, 2], 2, true);
    gameBoard.PlaceShip([2, 4], 2, true);

    gameBoard.AttackPosition([2, 2]);
    gameBoard.AttackPosition([3, 2]);

    gameBoard.AttackPosition([2, 4]);
    gameBoard.AttackPosition([3, 4]);

    expect(gameBoard.IsEverythingSunk()).toBe(true);
});

test('Miss after sinking everything', ()=>{

    const gameBoard = CreateGameboard(10);

    gameBoard.PlaceShip([2, 2], 2, true);
    gameBoard.PlaceShip([2, 4], 2, true);

    gameBoard.AttackPosition([2, 2]);
    gameBoard.AttackPosition([3, 2]);

    gameBoard.AttackPosition([2, 4]);
    gameBoard.AttackPosition([3, 4]);

    gameBoard.AttackPosition([0, 0]);

    expect(gameBoard.IsEverythingSunk()).toBe(true);
});