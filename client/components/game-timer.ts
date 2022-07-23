const piedra = require('url:./hands/piedra.png');
const papel = require('url:./hands/papel.png');
const tijera = require('url:./hands/tijera.png');
import 'animate.css';
import { state } from '../state';
import { Router } from '@vaadin/router';
export function initGameTimer() {
	customElements.define(
		'x-game-timer',
		class GameTimer extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			constructor() {
				super();
				this.render();
			}
			sendOption() {
				const rockButtonEl: any = this.shadow.querySelector('.hands__rock');
				const paperButtonEl: any = this.shadow.querySelector('.hands__paper');
				const scissorsButtonEl: any =
					this.shadow.querySelector('.hands__scissors');
				rockButtonEl.addEventListener('click', () => {
					state.setMove('piedra');
				});
				paperButtonEl.addEventListener('click', () => {
					state.setMove('papel');
				});
				scissorsButtonEl.addEventListener('click', () => {
					state.setMove('tijera');
				});
			}
			timer() {
				const counter: any = this.shadow.querySelector('.timer');
				let number = 3;
				const arrayAnimation = [
					'timer animate__animated animate__backOutDown',
					'timer animate__animated animate__backOutLeft',
					'timer animate__animated animate__backOutRight',
					'timer animate__animated animate__backOutUp',
				];
				let idInterval = setInterval(() => {
					counter.setAttribute('class', arrayAnimation[number]) as any;
					counter.innerHTML = number.toString();
					if (number == 0) {
						counter.setAttribute('class', 'timer');
						clearInterval(idInterval);
					}
					number--;
				}, 1500);
			}
			render() {
				this.shadow.innerHTML = `
				<section class='timer-container'>
					<h1 class='timer'></h1>
				</section>
				<section class='hands'>
					<img class='hands__option hands__rock' src='${piedra}'>
					<img class='hands__option hands__paper' src='${papel}'>
					<img class='hands__option hands__scissors' src='${tijera}'>
				</section>
				`;
				const style = document.createElement('style');
				const link = document.createElement('link');
				link.rel = 'stylesheet';
				link.href =
					'https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css';
				style.innerHTML = `
				.timer-container{
					margin: 0;
					height: 50vh;
					font-size:100px;
					font-family: 'Odibee Sans', cursive;
					text-align: center;
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
							width:300px;
							left: 10%;
							right: 10%;
						}
					}
					.hands__rock,
					.hands__paper,
					.hands__scissors{
						width: 100px;
						opacity: 0.5;
					}
					@media (max-width: 600px) {
						.hands__rock,
						.hands__paper,
						.hands__scissors{
							width:80px;
						}
					}
					.hands__rock:hover,
					.hands__paper:hover,
					.hands__scissors:hover{
						position: relative;
						bottom: 50px;
						opacity: 1;
					}
			`;
				this.shadow.appendChild(style);
				this.shadow.appendChild(link);
				this.timer();
				this.sendOption();
			}
		}
	);
}
