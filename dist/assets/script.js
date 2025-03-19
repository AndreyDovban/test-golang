let ws;

function connect() {
	ws = new WebSocket('ws://127.0.0.1:5000/ws');

	ws.onopen = function () {
		console.log('Connected to WebSocket server');
	};

	ws.onmessage = function (event) {
		let messageDisplay = document.getElementById('messages');
		messageDisplay.innerHTML += `<p>${event.data}</p>`;
	};

	ws.onclose = function () {
		console.log('WebSocket connection closed, retrying...');
		setTimeout(connect, 1000); // Reconnect after 1 second
	};

	ws.onerror = function (error) {
		console.error('WebSocket error:', error);
	};
}

function sendMessage() {
	let input = document.getElementById('messageInput');
	let message = input.value;
	ws.send(message);
	input.value = '';
}

connect();

const but2 = document.querySelector('#but2');

but2.onclick = sendMessage;
