"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("../types/state");
const stateful_service_1 = require("./stateful_service");
class MessageRoom {
    messages;
    listeners;
    constructor() {
        this.messages = [];
        this.listeners = new Set();
    }
    send(message) {
        this.messages.push(message);
    }
    pop() {
        return this.messages.pop();
    }
    get length() {
        return this.messages.length;
    }
    subscribe(listener) {
        this.listeners.add(listener);
    }
    unsubscribe(listener) {
        this.listeners.delete(listener);
    }
}
class MessageBus extends stateful_service_1.StatefulService {
    rooms;
    timer;
    constructor() {
        super();
        this.rooms = new Map();
    }
    createRoom(name) {
        const room = new MessageRoom();
        this.rooms.set(name, room);
        return room;
    }
    getRoom(name) {
        const room = this.rooms.get(name);
        return room || this.createRoom(name);
    }
    processMessages = () => {
        this.rooms.forEach(room => {
            for (let i = 0; i < room.length; i++) {
                const message = room.pop();
                room.listeners.forEach(l => {
                    if (message)
                        l(message);
                });
            }
        });
    };
    async start() {
        this.checkState(stateful_service_1.Actions.start);
        this.state = state_1.State.STARTING;
        this.timer = setInterval(this.processMessages, 0);
        this.state = state_1.State.RUNNING;
    }
    async stop() {
        this.checkState(stateful_service_1.Actions.stop);
        this.state = state_1.State.STOPPING;
        clearInterval(this.timer);
        this.state = state_1.State.STOPPED;
    }
}
exports.default = MessageBus;
//# sourceMappingURL=message_bus.js.map