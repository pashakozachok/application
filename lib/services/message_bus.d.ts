import { StatefulService } from "./stateful_service";
type Message = {
    type: string;
    payload: object;
};
type Listener = (message: Message) => void;
declare class MessageRoom {
    readonly messages: Message[];
    readonly listeners: Set<Listener>;
    constructor();
    send(message: Message): void;
    pop(): Message | undefined;
    get length(): number;
    subscribe(listener: Listener): void;
    unsubscribe(listener: Listener): void;
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
