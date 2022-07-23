import { Router } from '@vaadin/router';

const router = new Router(document.querySelector('.root'));
router.setRoutes([
	{ path: '/', component: 'x-home' },
	{ path: '/new-room', component: 'x-new-room' },
	{ path: '/exist-room', component: 'x-exist-room' },
	{ path: '/code-public', component: 'x-code-published' },
	{ path: '/waiting-room', component: 'x-room-waiting' },
	{ path: '/start-game', component: 'x-start-game' },
	{ path: '/game', component: 'x-game-timer' },
	{ path: '/show-animation', component: 'x-animation-results' },
	{ path: '/points-results', component: 'x-points-results' },
	{ path: '/error', component: 'x-error' },
	{ path: '/disconect', component: 'x-disconect' },
]);
