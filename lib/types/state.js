"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.State = void 0;
var State;
(function (State) {
    State["INIT"] = "INIT";
    State["STARTING"] = "STARTING";
    State["STOPPING"] = "STOPPING";
    State["RUNNING"] = "RUNNING";
    State["STOPPED"] = "STOPPED";
    State["ERRORED"] = "ERRORED";
    State["STARTING_SERVICES"] = "STARTING_SERVICES";
    State["STOPPING_SERVICES"] = "STOPPING_SERVICES";
})(State || (exports.State = State = {}));
//# sourceMappingURL=state.js.map