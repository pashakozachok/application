"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatefulService = exports.Actions = void 0;
const events_1 = require("events");
const state_1 = require("../types/state");
var Actions;
(function (Actions) {
    Actions["start"] = "start";
    Actions["stop"] = "stop";
    Actions["startServices"] = "startServices";
    Actions["stopServices"] = "stopServices";
})(Actions || (exports.Actions = Actions = {}));
const VALID_STATES = {
    [Actions.start]: [state_1.State.INIT],
    [Actions.stop]: [state_1.State.STARTING_SERVICES, state_1.State.RUNNING],
    [Actions.startServices]: [state_1.State.INIT],
    [Actions.stopServices]: [state_1.State.STARTING_SERVICES, state_1.State.RUNNING]
};
class StatefulService extends events_1.EventEmitter {
    state = state_1.State.INIT;
    constructor() {
        super();
    }
    async start() {
    }
    async stop() {
    }
    checkState(action) {
        const validStates = VALID_STATES[action];
        if (!validStates.includes(this.state)) {
            const error = new Error(`Not allowed to ${action} w/ state ${this.state}, allowed states: ${validStates.join(', ')}`);
            this.emit('error', error);
        }
    }
    changeState(newState) {
        this.state = newState;
        this.emit('state-change', newState);
    }
}
exports.StatefulService = StatefulService;
//# sourceMappingURL=stateful_service.js.map