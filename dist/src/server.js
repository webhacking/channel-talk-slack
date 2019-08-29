"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var http = __importStar(require("http"));
var Subject_1 = require("rxjs/internal/Subject");
var createHttpRxStream$ = function (port) {
    var subject = new Subject_1.Subject();
    var observable = subject.asObservable();
    http.createServer().listen(port).on('request', function (req, res) { return subject.next([req, res]); });
    return observable;
};
exports.default = createHttpRxStream$;
//# sourceMappingURL=server.js.map