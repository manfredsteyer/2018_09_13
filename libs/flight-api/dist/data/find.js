"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var rxjs_1 = require("rxjs");
var operators_1 = require("rxjs/operators");
function find(from, to) {
    return rxjs_1.Observable.create(function (sender) {
        fetch("http://www.angular.at/api/flight?from=" + from + "&to=" + to)
            .then(function (r) { return r.text(); })
            .then(function (text) { return sender.next(text); })
            .catch(function (e) { return sender.error(e); });
    }).pipe(operators_1.map(function (txt) { return JSON.parse(txt); }));
}
exports.find = find;
//# sourceMappingURL=find.js.map