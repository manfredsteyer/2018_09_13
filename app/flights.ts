import { from, Observable, Observer, fromEvent } from "rxjs";
import { publish, map, debounceTime, switchMap } from "rxjs/operators";
import { Flight } from "./flight";

function find(from: string, to: string): Observable<Flight[]> {
    return Observable.create((sender: Observer<string>) => {
        fetch(`http://www.angular.at/api/flight?from=${from}&to=${to}`)
            .then(r => r.text())
            .then(text => sender.next(text))
            .catch(e => sender.error(e));
    }).pipe(
        map( (txt: string) => JSON.parse(txt))
    );
}

function render(flights: Flight[]) {
    let html = '<table class="table table-striped">';

    flights.forEach(f => {
        html += `<tr><td>${f.id}</td><td>${f.from}</td><td>${f.to}</td><td>${f.date}</td></tr>`;
    });

    html += '</table>';

    document.getElementById('output').innerHTML = html;
}

let input$ = fromEvent(document.getElementById('input'), 'input');

let flights$ = input$
                    .pipe(
                        debounceTime(300),
                        map( (e: any ) => e.target.value),
                        switchMap(v => find(v, ''))
                    );

let s = flights$.subscribe(
    flights => render(flights),
    err => console.error('Fehler beim Laden', err)
);



