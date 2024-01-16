import { EventEmitter } from "events";
import { State }        from "../types/state";

export interface IStatefulService extends EventEmitter {
    state: State,

    start(): Promise<void>

    stop(): Promise<void>
}

export enum Actions {
    start = 'start',
    stop = 'stop',
    startServices = 'startServices',
    stopServices = 'stopServices'
}

const VALID_STATES = {
    [Actions.start]: [State.INIT],
    [Actions.stop]: [State.STARTING_SERVICES, State.RUNNING],
    [Actions.startServices]: [State.INIT],
    [Actions.stopServices]: [State.STARTING_SERVICES, State.RUNNING]
}

export abstract class StatefulService extends EventEmitter implements IStatefulService {
    state: State = State.INIT;

    protected constructor() {
        super();
    }

    async start() {

    }

    async stop() {

    }

    protected checkState(action: Actions) {
        const validStates = VALID_STATES[action];
        if (!validStates.includes(this.state)) {
            const error = new Error(`Not allowed to ${ action } w/ state ${ this.state }, allowed states: ${ validStates.join(', ') }`);
            this.emit('error', error);
        }
    }

    protected changeState(newState: State) {
        this.state = newState;
        this.emit('state-change', newState);
    }
}