import { StatefulService } from "./stateful_service";
type Message = {
    type: string;
    payload: object;
};
declare class MessageRoom {
    readonly messages: Message[];
    readonly listeners: Set<Function>;
    constructor();
    send(message: Message): void;
    pop(): Message | undefined;
    get length(): number;
    subscribe(listener: Function): void;
    unsubscribe(listener: Function): void;
}
export default class MessageBus extends StatefulService {
    private rooms;
    private timer?;
    constructor();
    private createRoom;
    getRoom(name: string): MessageRoom;
    processMessages: () => void;
    start(): Promise<void>;
    stop(): Promise<void>;
}
export {};
