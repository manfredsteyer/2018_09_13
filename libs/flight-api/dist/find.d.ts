import { Observable } from "rxjs";
import { Flight } from "./flight";
export declare function find(from: string, to: string): Observable<Flight[]>;
export default find;
