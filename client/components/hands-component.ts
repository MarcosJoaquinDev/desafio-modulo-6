const images = [
	{
		option: 'piedra',
		urlImg: require('url:./hands/piedra.png'),
	},
	{
		option: 'papel',
		urlImg: require('url:./hands/papel.png'),
	},
	{
		option: 'tijera',
		urlImg: require('url:./hands/tijera.png'),
	},
];
export function handsComponent() {
	customElements.define(
		'x-hand-option',
		class HandOption extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			constructor() {
				super();
				this.render();
			}
			render() {
				const handPosition = this.getAttribute('position');
				const option: any = images.find(
					(item) => item.option == this.getAttribute('hand')
				);

				this.shadow.innerHTML = `
      	<img src='${option.urlImg}' class='${handPosition}' >
				`;
				const styleEl = document.createElement('style');
				styleEl.innerHTML = `
				img{
					width:150px;
				}
				.up{
					transform: rotate(-180deg);
				}
				`;
				this.shadow.appendChild(styleEl);
			}
		}
	);
}
