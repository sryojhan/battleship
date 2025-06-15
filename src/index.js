import './styles.css';

import { HighlightPlayerShips, InitialiseButtons, ComputerWin, HumanWin, BeginHumanTurn, BeginComputerTurn, InitialiseBoards , VisualizeComputerSelection, SunkShip} from './scripts/DOMmanager';
import GameManager from './scripts/gamemanager';

const size = 10;

const CPUvsCPU = false;

const gameManager = GameManager(size, HumanWin, ComputerWin, BeginHumanTurn, BeginComputerTurn, VisualizeComputerSelection, SunkShip, CPUvsCPU);

InitialiseBoards(size, ()=>{} ,gameManager.HumanSelection);

HighlightPlayerShips(true, gameManager.GetAllHumanShips());

InitialiseButtons(gameManager.RandomHumanBoard, gameManager.GetAllHumanShips, gameManager.Begin);


console.log(gameManager.GetAllComputerShips());