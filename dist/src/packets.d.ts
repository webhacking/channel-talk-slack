import { IncomingMessage } from "http";
import { Observable } from 'rxjs/internal/Observable';
declare const packets$: (req: IncomingMessage) => Observable<Uint8Array[]>;
export default packets$;
