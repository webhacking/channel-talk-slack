import {Observable} from 'rxjs/internal/Observable';
import * as http from "http";
import {IncomingMessage, ServerResponse} from "http";
import {Subject} from 'rxjs/internal/Subject';

const createHttpRxStream$ = (port: number): Observable<[IncomingMessage, ServerResponse]> => {
  const subject = new Subject();
  const observable = subject.asObservable();
  http.createServer().listen(port).on('request', (req, res) => subject.next([req, res]));
  return <Observable<[IncomingMessage, ServerResponse]>>observable;
};

export default createHttpRxStream$;

