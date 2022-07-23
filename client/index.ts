import { initHomePage } from './components/home';
import { initEntranceRoom } from './components/entrance-room';
import { initCreateRoom } from './components/create-room';
import { initPublishedRoomCode } from './components/published-code';
import { initStartGame } from './components/start-game';
import { initRoomWaiting } from './components/room-waiting';
import { initGameTimer } from './components/game-timer';
import { initShowAnimationResults } from './components/show-animation-results';
import { handsComponent } from './components/hands-component';
import { initResults } from './components/results';
import { initErrorPage } from './components/error';
import { initUserDisconnect } from './components/user-disconect';
import './router';

function main() {
	handsComponent();
	initHomePage();
	initCreateRoom();
	initEntranceRoom();
	initPublishedRoomCode();
	initRoomWaiting();
	initStartGame();
	initGameTimer();
	initShowAnimationResults();
	initResults();
	initErrorPage();
	initUserDisconnect();
}
main();
