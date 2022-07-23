import { state } from '../state';
import { Router } from '@vaadin/router';

const ERROR = [
	{
		error: 'error player',
		description:
			'Ups, esta sala está completa y tu nombre no coincide con nadie en la sala.',
	},
	{
		error: 'error playroom',
		description:
			'Ups, esta sala no existe, regresá, crea una o comprueba si tu codigo es correcto',
	},
];
export function initErrorPage() {
	customElements.define(
		'x-error',
		class Error extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			constructor() {
				super();
				this.render();
			}
			listener() {
				const buttonEl = this.shadow.querySelector('.button') as any;
				buttonEl.addEventListener('click', () => {
					Router.go('/');
				});
			}
			render() {
				const errorText: any = ERROR.find((e) => e.error == state.data.error);
				this.shadow.innerHTML = `
				<main class='container'>
					<h1 class='container__title'>Piedra Papel o Tijera</h1>
					<div class='container__description'>
						<p  class='container__description-text'>${errorText.description}</p>	
					</div>
					<section class='container-button'>
						<button class='button'>Volver</button>
					</section>
				</main>
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
					font-size: 80px;
					color: #009048;
					max-width:280px;
					text-align:center;
				}
				.container__description{
					max-width:320px;
					display:flex;
					font-size: 45px;
					margin:0;
					padding:20px;
				}
				.container__description-text{
					margin:0;
					text-align: center;
					color: red;
				}
				.container-button{
					width:400px;
					padding:5px;
					display: flex;
					justify-content:center;
					align-items: center;
					gap:10px; 
				}
				@media (max-width: 400px) {
					.container-button {
						padding:10px;
						width: 350px;
					}
				}
				.button{
					width:100%;
					height: 80px;
					padding:5px;
					border:solid 10px #182460;
					background-color: #006CFC;
					color:white;
					border-radius: 10px;
					font-size: 45px;
					font-family: 'Odibee Sans', cursive;
				}
				`;
				this.shadow.appendChild(styleEl);
				this.listener();
			}
		}
	);
}
