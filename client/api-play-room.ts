async function createNewUser(name: string) {
	const promise = await fetch('/player', {
		method: 'post',
		body: JSON.stringify({ name }),
		headers: { 'Content-Type': 'application/json' },
	});

	return promise.json();
}
async function createPlayroom(userId: string) {
	const promise = await fetch('/playroom', {
		method: 'post',
		body: JSON.stringify({ userId }),
		headers: { 'Content-Type': 'application/json' },
	});
	return promise.json();
}
async function enterThePlayRoom(userId: string, keyRoom: number) {
	const promise = await fetch(`/playroom/${keyRoom}?userId=${userId}`, {
		method: 'get',
	});
	return promise.json();
}
async function playerCreatorName(name: string, rtdb_Id: number) {
	const promise = await fetch('/player-creator', {
		method: 'post',
		body: JSON.stringify({ name, rtdb_Id }),
		headers: { 'Content-Type': 'application/json' },
	});
	return promise.json();
}
async function incomingPlayer(name: string, rtdb_Id: number) {
	const promise = await fetch('/incoming-player', {
		method: 'post',
		body: JSON.stringify({ name, rtdb_Id }),
		headers: { 'Content-Type': 'application/json' },
	});
	if (promise.status == 404) {
		return 'this player is Undifined in this room';
	} else {
		return promise.json();
	}
}
async function existRoom(roomId: number) {
	const promise = await fetch('/existRoom/' + roomId, {
		method: 'get',
	});
	if (promise.status == 404) {
		return 'This room not exist';
	} else {
		return 'ok';
	}
}
async function gameStateReset(player: string, rtdb_Id: string) {
	const promise = await fetch('/start-player', {
		method: 'post',
		body: JSON.stringify({ player, rtdb_Id }),
		headers: { 'Content-Type': 'application/json' },
	});
	return promise.json();
}
async function resetAllGame(rtdb_Id: string) {
	const promise = await fetch('/reset-all-match', {
		method: 'post',
		body: JSON.stringify({ rtdb_Id }),
		headers: { 'Content-Type': 'application/json' },
	});
	return promise.json();
}
async function moveOption(player: string, rtdb_Id: string, move: string) {
	const promise = await fetch('/move', {
		method: 'post',
		body: JSON.stringify({ move, player, rtdb_Id }),
		headers: { 'Content-Type': 'application/json' },
	});
	return promise.json();
}
async function resetMatchGame(rtdb_Id: string, player: string) {
	const promise = await fetch('/reset', {
		method: 'post',
		body: JSON.stringify({ rtdb_Id, player }),
		headers: { 'Content-Type': 'application/json' },
	});
	return promise.json();
}
async function getData(rtdb_Id: string, player: string) {
	const promise = await fetch('/getdata', {
		method: 'post',
		body: JSON.stringify({ rtdb_Id, player }),
		headers: { 'Content-Type': 'application/json' },
	});
	return promise.json();
}
async function resetOnline(rtdb: string, player: string) {
	const promise = await fetch('/online', {
		method: 'post',
		body: JSON.stringify({ rtdb, player }),
		headers: { 'Content-Type': 'application/json' },
	});
	return promise.json();
}
async function savePointsInDataBase(
	rtdb_Id: string,
	player1: string,
	points1: number,
	player2: string,
	points2: number
) {
	const promise = await fetch('/set-points', {
		method: 'post',
		body: JSON.stringify({ rtdb_Id, player1, player2, points1, points2 }),
		headers: { 'Content-Type': 'application/json' },
	});
	return promise.json();
}
export {
	createNewUser,
	createPlayroom,
	enterThePlayRoom,
	playerCreatorName,
	incomingPlayer,
	existRoom,
	gameStateReset,
	moveOption,
	resetMatchGame,
	getData,
	resetOnline,
	savePointsInDataBase,
	resetAllGame,
};
