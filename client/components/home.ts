import { Router } from '@vaadin/router';
const piedra = require('url:./hands/piedra.png');
const papel = require('url:./hands/papel.png');
const tijera = require('url:./hands/tijera.png');
export function initHomePage() {
	customElements.define(
		'x-home',
		class Home extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			constructor() {
				super();
				this.render();
			}
			buttonListener() {
				const btnNewGameEl = this.shadow.querySelector(
					'.container__btn-new-game'
				);
				const btnRoomEl = this.shadow.querySelector('.container__btn-room');

				btnNewGameEl.addEventListener('click', () => {
					Router.go('/new-room');
				});
				btnRoomEl.addEventListener('click', () => {
					Router.go('/exist-room');
				});
			}
			render() {
				const containEl = document.createElement('div');
				const styleEl = document.createElement('style');
				containEl.innerHTML = `
			<main class='container'>
				<h1 class='container__title'>Piedra, Papel o Tijera</h1>
				<button class='container__btn-new-game' >Nuevo Juego</button>
				<button class='container__btn-room' >Ingresar a una sala</button>
				<div class='hands'>
				<img class='hands__rock' src='${piedra}'/>
				<img class='hands__paper' src='${papel}'/>
				<img class='hands__scissors' src='${tijera}'/>
				</div>
				</main>
			`;

				styleEl.innerHTML = `
			.container{
				height:100vh;
				padding-bottom:0;
				display:flex;
				align-items:center;
				flex-direction:column;
				gap:10px;
				font-family: 'Odibee Sans', cursive;
			}
			.container__title{
				margin:0;
				font-size: 80px;
				color: #009048;
				max-width:280px;
				text-align:center;
			}
			.container__btn-new-game,
			.container__btn-room{
				margin:0 auto;
				width: 320px;
				font-size: 45px;
				font-family: 'Odibee Sans', cursive;
				color: white;
				background-color:#006CFC;
				border: solid 10px #001997;
				border-radius: 10px;
				cursor: pointer;
			}
			.hands{
				max-width:400px;
				margin: 0 auto;
				display:flex;
				gap:10px;
				padding: 20px;
				padding-bottom:0;
				justify-content:space-between;
			}
			.hands__rock,
			.hands__paper,
			.hands__scissors{
				width: 100px;	
				height:88%;
			}
			`;

				this.shadow.appendChild(styleEl);
				this.shadow.appendChild(containEl);
				this.buttonListener();
			}
		}
	);
}
