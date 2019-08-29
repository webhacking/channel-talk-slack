import {IncomingMessage} from "http";
import {Observable} from 'rxjs/internal/Observable';
import {Observer} from 'rxjs/internal/types';

const packets$ = (req: IncomingMessage): Observable<Uint8Array[]> => {
  return Observable.create((observer: Observer<{}>) => {
    const chunks: Uint8Array[] = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => observer.next(Buffer.concat(chunks)));
  })
};

export default packets$;