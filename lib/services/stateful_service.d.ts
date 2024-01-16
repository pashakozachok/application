/// <reference types="node" />
import { EventEmitter } from "events";
import { State } from "../types/state";
export interface IStatefulService extends EventEmitter {
    state: State;
    start(): Promise<void>;
    stop(): Promise<void>;
}
export declare enum Actions {
    start = "start",
    stop = "stop",
    startServices = "startServices",
    stopServices = "stopServices"
}
export declare abstract class StatefulService extends EventEmitter implements IStatefulService {
    state: State;
    protected constructor();
    start(): Promise<void>;
    stop(): Promise<void>;
    protected checkState(action: Actions): void;
    protected changeState(newState: State): void;
}
