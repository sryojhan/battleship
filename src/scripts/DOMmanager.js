


const CreateBoardBackground = function (parent, size, clickCallback) {


    const sqrSize = size * size;

    for (let i = 0; i < sqrSize; i++) {

        const elem = document.createElement('div');
        elem.classList.add('cell');

        parent.append(elem);

        elem.addEventListener('click', () => {

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


const HighlightPlayerShips = function(parent, size, ships){


    const revealElements = parent.querySelectorAll('.reveal');

    revealElements.forEach(element => {
        
        element.classList.remove('reveal');
    });


    for(const ship of ships){

        const increment = ship.isHorizontal ? [1, 0] : [0, 1];

        for(let i = 0; i < ship.length; i++){


            const position = [ship.position[0] + increment[0] * i, ship.position[1] + increment[1] * i]; 

            const idx = position[1] * size + position[0];
            
            parent.children[idx].classList.add('reveal');
        }
    }

}



const InitialiseButtons = function(gameManager, playerBoard, size){


    const randomize = document.querySelector('#random');
    const play = document.querySelector('#play');


    randomize.addEventListener('click', ()=>{

        gameManager.RandomHumanBoard();
        HighlightPlayerShips(playerBoard, size, gameManager.GetAllHumanShips());
    });


    play.addEventListener('click', ()=>{

        console.log("hola");

        gameManager.Begin();

        randomize.remove();
        play.remove();
    });
}


export { CreateBoardBackground, HighlightPlayerShips, InitialiseButtons};