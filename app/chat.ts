export const conn = new WebSocket('wss://remy-ws.glitch.me/');

const output = document.getElementById('output');

conn.onopen = event => console.debug('open');    

conn.onmessage = function (event) {
    const message = event.data; 
    output.innerHTML += `<li>
                            ${message}
                        </li>`; // Es5
};

conn.onclose = function (event) {
    console.debug('closed');
};

conn.onerror = function (event) {
    console.debug('error');
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



