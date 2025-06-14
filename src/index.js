import './styles.css';

import { CreateBoardBackground, HighlightPlayerShips, InitialiseButtons } from './scripts/DOMmanager';
import GameManager from './scripts/gamemanager';

const board = document.querySelector('.self');
const enemy = document.querySelector('.enemy');

const size = 10;

const gameManager = GameManager(size);

CreateBoardBackground(board, size, ()=>{console.log("self selected")});
CreateBoardBackground(enemy, size, gameManager.HumanSelection);



HighlightPlayerShips(board, size, gameManager.GetAllHumanShips());

InitialiseButtons(gameManager, board, size);


console.log(gameManager.GetAllComputerShips());