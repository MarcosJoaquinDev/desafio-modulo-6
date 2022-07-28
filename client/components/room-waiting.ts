const piedra = require('url:./hands/piedra.png');
const papel = require('url:./hands/papel.png');
const tijera = require('url:./hands/tijera.png');
import { state } from '../state';
export function initRoomWaiting() {
	customElements.define(
		'x-room-waiting',
		class RoomWinting extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			me: string = state.data.namePlayers.me;
			anotherPlayer: string = state.data.namePlayers.other;
			codeRoom: number = 12345;
			constructor() {
				super();
				this.render();
			}
			render() {
				this.me = state.data.name;
				this.codeRoom = state.data.keyRoom;
				this.shadow.innerHTML = `
			<main class='container'>
				<header class='header'>
					<aside class='header__players-score'>
						<h2 class='header__players-score__me'>${this.me}: ${state.data.points.me}<h2>
						<h2 class='header__players-score__another'>${this.anotherPlayer}: ${state.data.points.other}<h2>
					</aside>
					<aside class='header__room'>
						<h2 class='header__room__title' >Sala:<h2>
						<h2 class='header__room__code'>${this.codeRoom}<h2>
					</aside>
				</header>
				<h1 class='title-main'>Esperando a que ${this.anotherPlayer} presione ¡Jugar!...<h1>
				<footer class='hands'>
					<img class='container__hands__rock' src='${piedra}'/>
					<img class='container__hands__paper' src='${papel}' />
					<img class='container__hands__scissors' src='${tijera}' />
				</footer>
			</main>
			`;
				const styleEl = document.createElement('style');
				styleEl.innerHTML = `
			.container{
				height: 100vh;
				position:relative;
			}	
			.header{
				display:flex;
				justify-content:space-between;
				padding: 0 40px;
				font-size:24px;
				font-family: 'Odibee Sans', cursive;
				align-items: center;
			}
			.header__players-score{}
			.header__players-score__me{
					margin:0;
			}
			.header__players-score__another{
				margin:0;
				color: #FF6442;
			}
			.header__room{
			}
			.header__room__title{
				margin:0
			}
			.header__room__code{
				font-weight: 400;
				margin:0
			}
			.title-main{
				width:380px;
				font-size:60px;
				font-family: 'Odibee Sans', cursive;
				text-align: center;
				margin:0 auto;
				margin-top: 30px;
			}
			.hands{
				margin:0 auto;
				width:350px;
				display: flex;
				justify-content: space-between;
				position:absolute;
				left: 20%;
				right: 20%;
				bottom: -30px;
				}
				@media (max-width: 600px) {
					.hands{
						left: 10%;
						right: 10%;
					}
				}
				.container__hands__rock,
				.container__hands__paper,
				.container__hands__scissors{
					width: 60px;
				}
			`;
				this.shadow.appendChild(styleEl);
			}
		}
	);
}
