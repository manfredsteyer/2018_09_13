import { Observable, Observer } from "rxjs";
import { map } from "rxjs/operators";
import { Flight } from "./flight";

export function find(from: string, to: string): Observable<Flight[]> {
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

export default find;