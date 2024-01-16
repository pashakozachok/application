import { State }                    from "../types/state";
import { Actions, StatefulService } from "./stateful_service";

type Message = {
    type: string,
    payload: object
}

type Listener = (message: Message) => void;

class MessageRoom {
    readonly messages: Message[];
    readonly listeners: Set<Listener>;

    constructor() {
        this.messages = [];
        this.listeners = new Set();
    }

    send(message: Message) {
        this.messages.push(message)
    }

    pop(): Message | undefined {
        return this.messages.pop();
    }

    get length() {
        return this.messages.length;
    }

    subscribe(listener: Listener) {
        this.listeners.add(listener);
    }

    unsubscribe(listener: Listener) {
        this.listeners.delete(listener);
    }
}

export default class MessageBus extends StatefulService {
    private rooms: Map<string, MessageRoom>;
    private timer?: NodeJS.Timeout;

    constructor() {
        super();
        this.rooms = new Map();
    }

    private createRoom(name: string) {
        const room = new MessageRoom();
        this.rooms.set(name, room);
        return room;
    }

    getRoom(name: string): MessageRoom {
        const room = this.rooms.get(name);
        return room || this.createRoom(name);
    }

    processMessages = () => {
        this.rooms.forEach(room => {
            for (let i = 0; i < room.length; i++) {
                const message = room.pop();
                room.listeners.forEach(l => {
                    if (message) l(message);
                })
            }
        })
    }

    async start() {
        this.checkState(Actions.start);
        this.state = State.STARTING;
        this.timer = setInterval(this.processMessages, 0);
        this.state = State.RUNNING;
    }

    async stop() {
        this.checkState(Actions.stop);
        this.state = State.STOPPING;
        clearInterval(this.timer);
        this.state = State.STOPPED;
    }
}