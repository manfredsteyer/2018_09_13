import { Observable, Observer, fromEvent } from 'rxjs';
import { map, filter } from 'rxjs/operators';
//                             ^--- Ab v 6 normal
//                                  davor: Anti-Pattern

export class Chat {

    messages$: Observable<string>;

    private conn: WebSocket;

    connect() {
        
        this.messages$ = Observable.create((sender: Observer<string>) => {

            this.conn = new WebSocket('wss://remy-ws.glitch.me/');

            this.conn.onopen = event => console.debug('open');    

            this.conn.onmessage = function (event) {
                const message = event.data; 
                sender.next(message);
            };
            
            this.conn.onclose = function (event) {
                sender.complete();
            };
            
            this.conn.onerror = function (event) {
                sender.error(event);
            };

            return () => {
                this.conn.close();
            }
    
        });

        

    }

    send(message: string): void {
        this.conn.send(message);
    }

}

const output = document.getElementById('output');


const chat = new Chat();
chat.connect();
chat.messages$
    .pipe(
        filter(msg => isNaN(parseFloat(msg))),
        map(msg => `<b>${msg}</b>`)
    )
    .subscribe(
    message => {
        output.innerHTML += `<li>${message}</li>`;
    }
);


const input = document.getElementById("input") as HTMLInputElement;

fromEvent(input, 'keydown').pipe(
    map((e: KeyboardEvent) => [e.key, input.value])
)
.subscribe(
    tupel => {
        if (tupel[0] === 'Enter') {
            const msg = tupel[1];
            chat.send(msg);
            output.innerHTML += `<li>ME> ${msg}</li>`;
            input.value = '';
        }
    }
);