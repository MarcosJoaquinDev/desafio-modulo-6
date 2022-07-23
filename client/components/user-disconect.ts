import { state } from '../state';
export function initUserDisconnect() {
	customElements.define(
		'x-disconect',
		class StartGame extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			constructor() {
				super();
				this.render();
			}
			render() {
				this.shadow.innerHTML = `
				<h1>Usuario desconectado</h1>
				<button>Volver</button>
				`;
			}
		}
	);
}
