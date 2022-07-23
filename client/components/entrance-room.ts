import { Router } from '@vaadin/router';
import { state } from '../state';
export function initEntranceRoom() {
	customElements.define(
		'x-exist-room',
		class ExistingRoom extends HTMLElement {
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
					const roomCode = target['room-code'].value;
					const nameUser = target['name-user'].value;
					state.createUser(nameUser, roomCode);
					target['room-code'].value = '';
					target['name-user'].value = '';
				});
			}
			render() {
				this.shadow.innerHTML = `
				<main class='container'>
					<h1 class='container__title'>Piedra Papel o Tijera</h1>
					<form class='container__form'>
						<input class='container__form__input' name='name-user' type='text' placeholder='Nombre'/>
						<input class='container__form__input' name='room-code' type='text' placeholder='codigo'/>
						<button class='container__form__button' >Ingresar a la sala</button>
					</form>
				</main>
				`;
				const styleEl = document.createElement('style');
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
				.container__form{
					max-width:400px;
					padding:20px;
					display: flex;
					flex-direction:column;
					justify-content:space-between;
					align-items: center;
					gap:20px; 
				}
				.container__form__input{
					width:85%;
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
					padding:10px;
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
