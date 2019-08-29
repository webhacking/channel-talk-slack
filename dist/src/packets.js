"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Observable_1 = require("rxjs/internal/Observable");
var packets$ = function (req) {
    return Observable_1.Observable.create(function (observer) {
        var chunks = [];
        req.on('data', function (chunk) { return chunks.push(chunk); });
        req.on('end', function () { return observer.next(Buffer.concat(chunks)); });
    });
};
exports.default = packets$;
//# sourceMappingURL=packets.js.map