import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
const config = {
	apiKey: 'getv6vZRnwzqOelNl4BWtrTSsMcoAQu0zOmrJQQS',
	authDomain: 'dwf-piedra-papel-tijera.firebaseapp.com',
	databaseURL: 'https://dwf-piedra-papel-tijera-default-rtdb.firebaseio.com',
};

const APP = initializeApp(config);
const RTDB = getDatabase(APP);

export { RTDB };
