import { from, Observable, Observer, fromEvent, combineLatest, Subject, BehaviorSubject, ReplaySubject } from "rxjs";
//                                                  ^------ Factory-Functionen

import { publish, map, debounceTime, switchMap, flatMap, delay, exhaustMap, share } from "rxjs/operators";
//                                                                ^------- pipe
import { Flight } from "./flight";

// obs.pipe(combineLatest(obs2)) <==> combineLatest(obs, obs2)

function find(from: string, to: string): Observable<Flight[]> {
    return Observable.create((sender: Observer<string>) => {
        fetch(`http://www.angular.at/api/flight?from=${from}&to=${to}`)
            .then(r => r.text())
            .then(text => sender.next(text))
            .catch(e => sender.error(e));
    }).pipe(
        map( (txt: string) => JSON.parse(txt)),
        // delay(5000)
    );
}


// Quellen

let flightSelected$ = new BehaviorSubject<Flight>(null);

let from$ = fromEvent(document.getElementById('from'), 'input')
                .pipe(
                    debounceTime(300),
                    map( (e: any ) => e.target.value)
                );

let to$ = fromEvent(document.getElementById('to'), 'input')
                .pipe(
                    debounceTime(300),
                    map( (e: any ) => e.target.value)
                );

let flights$ = combineLatest(from$, to$)
                    .pipe(
                        map(t => ({from: t[0], to: t[1]})),
                        switchMap(p => find(p.from, p.to)),
                        share()
                    );

let count$ = flights$.pipe(map(flights => flights.length));

flights$.subscribe(
    flights => render(flights),
    err => console.error('Fehler beim Laden', err)
);

count$.subscribe(
    count => console.debug('count', count),
    err => console.error('Fehler beim Laden', err)
);


const btnRegister = document.getElementById('btnRegister');
fromEvent(btnRegister, 'click').subscribe(e => {
    flightSelected$.subscribe(flight => {
        console.debug('Flight selected', flight);
    });
});


function render(flights: Flight[]) {
    let html = '<table class="table table-striped">';

    flights.forEach(f => {
        html += `<tr><td><a id="f-${f.id}">Select</a></td><td>${f.id}</td><td>${f.from}</td><td>${f.to}</td><td>${f.date}</td></tr>`;
    });

    html += '</table>';

    document.getElementById('output').innerHTML = html;

    flights.forEach(f => {
        const link = document.getElementById('f-' + f.id);
        link.addEventListener('click', e => {
            flightSelected$.next(f);
        });
    });
}
