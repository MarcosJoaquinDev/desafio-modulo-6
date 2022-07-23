import * as express from 'express';
import * as cors from 'cors';
import { DATA_BASE, RTDB } from './firestore';
import { v4 as uuid } from 'uuid';
const APP = express();

APP.use(cors());
APP.use(express.json());

const PORT = process.env.PORT || 3000;

function main() {
	APP.listen(PORT, () => console.log(`inizalite in http://localhost:${PORT}`));
	APP.use(express.static('dist'));
	const playersCollection = DATA_BASE.collection('players');
	const playRoomsCollection = DATA_BASE.collection('playrooms');

	// MANDO UN NOMBRE Y ME DEVUELVE EL ID DEL NOMBRE
	APP.post('/player', (req, res) => {
		const { name } = req.body;
		playersCollection
			.where('name', '==', name)
			.get()
			.then((result) => {
				if (result.empty) {
					playersCollection.add({ name: name }).then((newUser) => {
						res.json({ id: newUser.id, message: 'user create' });
					});
				} else {
					res.json({
						id: result.docs[0].id,
						message: 'user exist',
					});
				}
			});
	});
	// MANDO EL ID DEL NOMBRE Y ME DEVUEL IDcorto DE LA PLAYROOM
	APP.post('/playroom', (req, res) => {
		const { userId } = req.body;
		playersCollection
			.doc(userId)
			.get()
			.then((doc) => {
				if (doc.exists) {
					const roomRef = RTDB.ref('playrooms/' + uuid());
					roomRef
						.set({
							currentGame: {
								Player1: {
									choice: '',
									name: '',
									online: false,
									start: false,
									points: 0,
								},
								Player2: {
									choice: '',
									name: '',
									online: false,
									start: false,
									points: 0,
								},
							},
						})
						.then(() => {
							const longID = roomRef.key;
							const roomId = (
								10000 + Math.floor(Math.random() * 9999)
							).toString();
							playRoomsCollection
								.doc(roomId)
								.set({ rtdbRoomId: longID })
								.then(() => {
									res.json({ id: roomId });
								});
						});
				}
			});
	});
	// MANDO EL USERID Y ID corto DE LA ROOM Y ME DEVUELVE EL ID DE LA RTDB
	APP.get('/playroom/:playRoomId', (req, res) => {
		const { userId } = req.query;
		const { playRoomId } = req.params;
		playersCollection
			.doc(userId.toString())
			.get()
			.then((doc) => {
				if (doc.exists) {
					playRoomsCollection
						.doc(playRoomId)
						.get()
						.then((snapshot) => {
							const data = snapshot.data();
							res.json(data);
						});
				} else {
					res.status(404).json({ error: 'not exist' });
				}
			});
	});
	APP.post('/player-creator', (req, res) => {
		const { name } = req.body;
		const { rtdb_Id } = req.body;
		const choiceRoomRef = RTDB.ref(
			'playrooms/' + rtdb_Id + '/currentGame/' + 'Player1/' + 'name'
		);
		choiceRoomRef.set(name, () => {
			res.json({ player: 'Player1' });
		});
	});
	APP.post('/incoming-player', (req, res) => {
		const { name } = req.body;
		const { rtdb_Id } = req.body;

		const player1RoomRef = RTDB.ref(
			'playrooms/' + rtdb_Id + '/currentGame/' + 'Player1/' + 'name'
		);
		const player2RoomRef = RTDB.ref(
			'playrooms/' + rtdb_Id + '/currentGame/' + 'Player2/' + 'name'
		);
		player2RoomRef.get().then((snap) => {
			const nameplayer2 = snap.val();
			if (snap.val() == '') {
				player2RoomRef.set(name, () => {
					res.json({ player: 'Player2' });
				});
			} else if (nameplayer2 == name) {
				res.json({ player: 'Player2' });
			} else if (nameplayer2 != name) {
				player1RoomRef.get().then((snapshot) => {
					const namePlayer1 = snapshot.val();
					if (namePlayer1 == name) {
						res.json({ player: 'Player1' });
					} else {
						res
							.status(404)
							.json({ player: 'this player is Undifined in this room' });
					}
				});
			}
		});
	});
	APP.post('/start-player', (req, res) => {
		const { player } = req.body;
		const { rtdb_Id } = req.body;
		const playerRef = RTDB.ref(
			'playrooms/' + rtdb_Id + '/currentGame/' + player + '/start'
		);
		playerRef.get().then((snap) => {
			const statePlayer = snap.val();
			if (statePlayer) {
				playerRef.set(false, () => {
					res.json({ message: 'ok' });
				});
			} else {
				playerRef.set(true, () => {
					res.json({ message: 'ok' });
				});
			}
		});
	});
	APP.get('/existRoom/:idRoom', (req, res) => {
		const { idRoom } = req.params;
		playRoomsCollection
			.doc(idRoom)
			.get()
			.then((doc) => {
				if (doc.exists) {
					res.json({ message: 'this room exist' });
				} else {
					res.status(404).json({ message: 'Error: not exist' });
				}
			});
	});
	APP.post('/move', (req, res) => {
		const { move } = req.body;
		const { player } = req.body;
		const { rtdb_Id } = req.body;
		const choiceRoomRef = RTDB.ref(
			'playrooms/' + rtdb_Id + '/currentGame/' + `${player}/` + 'choice'
		);
		choiceRoomRef.set(move, () => {
			res.json({ send: 'ok' });
		});
	});
	APP.post('/reset', (req, res) => {
		const { rtdb_Id } = req.body;
		const choicePlayer1 = RTDB.ref(
			'playrooms/' + rtdb_Id + '/currentGame/' + 'Player1/' + 'choice'
		);
		const choicePlayer2 = RTDB.ref(
			'playrooms/' + rtdb_Id + '/currentGame/' + 'Player2/' + 'choice'
		);
		const startPlayer1 = RTDB.ref(
			'playrooms/' + rtdb_Id + '/currentGame/' + 'Player1/' + 'start'
		);
		const startPlayer2 = RTDB.ref(
			'playrooms/' + rtdb_Id + '/currentGame/' + 'Player2/' + 'start'
		);
		startPlayer1.set(false);
		startPlayer2.set(false);
		choicePlayer1.set('');
		choicePlayer2.set('');
		res.json({ msj: 'ok' });
	});
	APP.post('/getdata', (req, res) => {
		const { rtdb_Id } = req.body;
		const { player } = req.body;
		if (player == 'Player1') {
			const playerRoomRef = RTDB.ref('playrooms/' + rtdb_Id + '/currentGame');
			playerRoomRef.get().then((snap) => {
				const data = snap.val();
				const meName = data.Player1.name;
				const mePoints = data.Player1.points;
				const otherPoints = data.Player2.points;
				const otherName = data.Player2.name;
				res.json({
					me: { meName, mePoints },
					other: { otherName, otherPoints },
				});
			});
		} else {
			const playerRoomRef = RTDB.ref('playrooms/' + rtdb_Id + '/currentGame');
			playerRoomRef.get().then((snap) => {
				const data = snap.val();
				const mePoints = data.Player2.points;
				const meName = data.Player2.points;
				const otherPoints = data.Player1.points;
				const otherName = data.Player1.points;
				res.json({
					me: { meName, mePoints },
					other: { otherName, otherPoints },
				});
			});
		}
	});
	APP.post('/online', (req, res) => {
		const { rtdb } = req.body;
		const { player } = req.body;
		const playRoomRef = RTDB.ref(
			'playrooms/' + rtdb + '/currentGame/' + player + '/online'
		);
		playRoomRef.get().then((snap) => {
			const data = snap.val();
			if (data) {
				playRoomRef.set(false);
				res.json({ reset: 'ok' });
			} else {
				playRoomRef.set(true);
				res.json({ reset: 'ok' });
			}
		});
	});
	APP.post('/set-points', (req, res) => {
		const { rtdb_Id } = req.body;
		const { player } = req.body;
		const { points } = req.body;
		const pointsPlayer = RTDB.ref(
			'playrooms/' + rtdb_Id + '/currentGame/' + player + '/points'
		);
		pointsPlayer.set(points, () => {
			res.json({ send: 'ok' });
		});
	});
}
main();
