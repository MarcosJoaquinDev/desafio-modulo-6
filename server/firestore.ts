import * as admin from 'firebase-admin';
import * as serviceAccount from './key.json';

admin.initializeApp({
	credential: admin.credential.cert(serviceAccount as any),
	databaseURL: 'https://dwf-piedra-papel-tijera-default-rtdb.firebaseio.com',
});
const DATA_BASE = admin.firestore();
const RTDB = admin.database();

export { DATA_BASE, RTDB };
