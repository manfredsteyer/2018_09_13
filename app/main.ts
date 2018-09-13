import { sayHello } from "./hello";
import { Flight } from "./flight";

// import './chat'; // used later
import './flights';

sayHello('World');

const f = new Flight();
f.id = 17;
f.from = 'Graz';
f.to = 'Gleisdorf';
f.date = '2018-09-13T17:00';

console.debug('flight', f);

const f2: Flight = {
    id: 17,
    from: 'Graz',
    to: 'Vorau',
    date: '2018-09-14T18:00'
}

console.debug('flight2', f2);