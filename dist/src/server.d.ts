import { Observable } from 'rxjs/internal/Observable';
import * as http from "http";
declare const createHttpRxStream$: (port: number) => Observable<[http.IncomingMessage, http.ServerResponse]>;
export default createHttpRxStream$;
