import { from, Observable, Observer, fromEvent, combineLatest, Subject, BehaviorSubject, ReplaySubject, Subscription } from "rxjs";
import { publish, map, debounceTime, switchMap, flatMap, delay, exhaustMap, share, takeUntil } from "rxjs/operators";
import { Flight } from "@flights/flight-api";
import { find } from "@flights/flight-api";

// Quellen

const closeAll$ = new Subject<void>();

const flightSelected$ = new BehaviorSubject<Flight>(null);

const from$ = fromEvent(document.getElementById('from'), 'input')
                .pipe(
                    debounceTime(300),
                    map( (e: any ) => e.target.value)
                );

const to$ = fromEvent(document.getElementById('to'), 'input')
                .pipe(
                    debounceTime(300),
                    map( (e: any ) => e.target.value)
                );


const subs = new Array<Subscription>();

const btnRegister = document.getElementById('btnRegister');
fromEvent(btnRegister, 'click').subscribe(e => {
    
    flightSelected$.pipe(takeUntil(closeAll$)).subscribe(flight => {
        console.debug('Flight selected', flight);
    });

    

});

// Senken

const flights$ = combineLatest(from$, to$)
                    .pipe(
                        map(t => ({from: t[0], to: t[1]})),
                        switchMap(p => find(p.from, p.to)),
                        share(),
                        takeUntil(closeAll$)
                    );

const count$ = flights$.pipe(
                    map(flights => flights.length),
                    takeUntil(closeAll$)
                );

const s1 = flights$.subscribe(
    flights => render(flights),
    err => console.error('Fehler beim Laden', err)
);

const s2 = count$.subscribe(
    count => console.debug('count', count),
    err => console.error('Fehler beim Laden', err)
);

document.getElementById('btnClose').addEventListener('click', e => {
    closeAll$.next();
});

// Hilfskonstrukte

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


