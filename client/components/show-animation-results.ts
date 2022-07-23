import { state } from '../state';
import { Router } from '@vaadin/router';
export function initShowAnimationResults() {
	customElements.define(
		'x-animation-results',
		class AnimationResult extends HTMLElement {
			shadow = this.attachShadow({ mode: 'open' });
			myPlay: string = 'papel';
			anotherPlay: string = 'piedra';
			constructor() {
				super();
				this.render();
			}
			timerAnimation() {
				setTimeout(() => {
					Router.go('/points-results');
				}, 1500);
			}
			render() {
				this.myPlay = state.data.meChoice;
				this.anotherPlay = state.data.otherChoice;
				this.shadow.innerHTML = `
			<div class='hands-container'>
				<x-hand-option hand='${this.anotherPlay}' position='up' class='up' ></x-hand-option>
				<x-hand-option hand='${this.myPlay}' postion='down' class='down' ></x-hand-option>
    	</div>
				`;
				const styleEl = document.createElement('style');
				styleEl.innerHTML = `
				.hands-container{
					display: flex;
					flex-direction: column;
					justify-content: space-between;
					align-items: center;
					margin: 0 auto;
					height: 100vh;
				}
				img{
					width:300px;
				}
				@keyframes slideInFromUp {
					0% {
						transform: translateY(-800%);
					}
					100% {
						transform: translateY(0);
					}
				}
				@keyframes slideInFromDown {
					0% {
							transform: translateY(800%);
					}
					100% {
							transform: translateY(0);
					}
				}
				x-hand-option.up{
					animation: 1.5s ease-out 0s 1 slideInFromUp;
				}
				x-hand-option.down{
					animation: 1.5s ease-out 0s 1 slideInFromDown;
				}
				`;
				this.shadow.appendChild(styleEl);
				this.timerAnimation();
			}
		}
	);
}
