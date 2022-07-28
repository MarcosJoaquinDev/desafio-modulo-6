const piedra = require('url:./hands/piedra.png');
const papel = require('url:./hands/papel.png');
const tijera = require('url:./hands/tijera.png');
import { state } from '../state';
export function initPublishedRoomCode() {
	customElements.define(
		'x-code-published',
		class RoomCodePublished extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			me: string = state.data.name;
			anotherPlayer: string = 'other';
			codeRoom: number;
			constructor() {
				super();
				this.render();
			}
			render() {
				this.codeRoom = state.data.keyRoom == 0 ? 123456 : state.data.keyRoom;
				this.shadow.innerHTML = `
				<header class='header'>
					<aside class='header__players-score'>
						<h2 class='header__players-score__me'>${this.me}: 0<h2>
						<h2 class='header__players-score__another'>${this.anotherPlayer}: 1<h2>
					</aside>
					<aside class='header__room'>
						<h2 class='header__room__title' >Sala:<h2>
						<h2 class='header__room__code'>${this.codeRoom}<h2>
					</aside>
				</header>
				<section class='main-message'>
					<h3 class='main-message__top'>Compartí el código:</h3>
					<h2 class='main-message__code' >${this.codeRoom}</h2>
					<p class='main-message__bottom' >Con tu contrincante</p>
				</section>
				<footer class='hands'>
					<img class='container__hands__rock' src='${piedra}'/>
					<img class='container__hands__paper' src='${papel}' />
					<img class='container__hands__scissors' src='${tijera}' />
				</footer>
				`;
				const styleEl = document.createElement('style');
				styleEl.innerHTML = `
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

				.main-message{
					display:flex;
					flex-direction: column;
					margin:100px auto;
				}
				.main-message__top,
				.main-message__code,
				.main-message__bottom{
					text-align: center;
					font-family: 'Odibee Sans', cursive;
					margin:0;
				}
				.main-message__top,
				.main-message__bottom{
					font-size:60px;
					font-weight: 300;
				}
				.main-message__code{
					font-size:80px;
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
