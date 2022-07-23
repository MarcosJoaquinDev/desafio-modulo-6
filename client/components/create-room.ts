import { Router } from '@vaadin/router';
import { state } from '../state';
const piedra = require('url:./hands/piedra.png');
const papel = require('url:./hands/papel.png');
const tijera = require('url:./hands/tijera.png');

export function initCreateRoom() {
	customElements.define(
		'x-new-room',
		class NewRoom extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			constructor() {
				super();
				this.render();
			}
			listener() {
				const formEl = this.shadow.querySelector('.container__form');
				formEl.addEventListener('submit', (e) => {
					e.preventDefault();
					const target = e.target as any;
					const name = target.player.value;
					state.createRoom(name);
					target.player.value = '';
				});
			}
			render() {
				this.shadow.innerHTML = `
				<main class='container'>
					<h1 class='container__title'>Piedra Papel o Tijera</h1>
					<form class='container__form'>
						<label class='container__form__title'>Tu nombre</label>
						<input class='container__form__input' type='text' name='player'/>
						<button class='container__form__button' >Empezar</button>
					</form>
				</main>
				<section class='container__hands'>
					<img class='container__hands__rock' src='${piedra}'/>
					<img class='container__hands__paper' src='${papel}'/>
					<img class='container__hands__scissors'  src='${tijera}'/>
				</section>
			`;
				const styleEl = document.createElement('style');
				styleEl.innerHTML = `
			.container{
				padding-bottom:0;
				display:flex;
				align-items:center;
				flex-direction:column;
				gap:10px;
				font-family: 'Odibee Sans', cursive;
			}
			.container__title{
				margin:0;
				width:200px;
				font-size: 60px;
				color: #009048;
				max-width:280px;
				text-align:center;
			}
			.container__form{
				max-width:400px;
				padding:5px;
				display: flex;
				flex-direction:column;
				justify-content:space-between;
				align-items: center;
				gap:10px; 
			}
			.container__form__title{
				font-size:45px;
				font-family: 'Odibee Sans', cursive;
			}
			.container__form__input{
				width:85%;
				height: 45px;
				padding:10px;
				border-radius: 10px;
				border:solid 10px #182460;
				color: #D9D9D9;
				font-size: 45px;
				font-family: 'Odibee Sans', cursive;
				text-align: center;
			}
			.container__form__button{
				width:95%;
				height: 80px;
				padding:5px;
				border:solid 10px #182460;
				background-color: #006CFC;
				color:white;
				border-radius: 10px;
				font-size: 45px;
				font-family: 'Odibee Sans', cursive;
			}
			.container__hands{
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
				.container__hands {
					left: 10%;
				right: 10%;
				}
			}
			.container__hands__rock,
			.container__hands__paper,
			.container__hands__scissors{
				width: 80px;
			}
			`;
				this.shadow.appendChild(styleEl);
				this.listener();
			}
		}
	);
}
