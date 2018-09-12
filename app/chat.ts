export const conn = new WebSocket('wss://remy-ws.glitch.me/');

const output = document.getElementById('output');

conn.onopen = function (event) {
    console.debug('open');    
}

conn.onmessage = function (event) {
    const message = event.data; 
    output.innerHTML += `<li>${message}</li>`;
};

conn.onclose = function (event) {
    console.debug('closed');
};

conn.onerror = function (event) {
    console.debug('closed');
};

const input = document.getElementById("input") as HTMLInputElement;
input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
        const msg = input.value;
        conn.send(msg);
        output.innerHTML += `<li>ME> ${msg}</li>`;
        input.value = '';
    }
})



