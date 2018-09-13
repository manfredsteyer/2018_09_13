import { Observable, Observer } from "rxjs";
import { Flight } from "./flight";
import { map } from "rxjs/operators";

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
