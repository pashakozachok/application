"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./types/state");
const stateful_service_1 = require("./services/stateful_service");
const message_bus_1 = __importDefault(require("./services/message_bus"));
class Application extends stateful_service_1.StatefulService {
    services;
    id;
    logger;
    communicationChannel;
    constructor(config, logger, services) {
        super();
        this.id = config.id;
        this.logger = logger;
        this.services = services;
        this.communicationChannel = new message_bus_1.default();
    }
    async startServices() {
        this.checkState(stateful_service_1.Actions.startServices);
        this.changeState(state_1.State.STARTING_SERVICES);
        const services = Object.values(this.services);
        for (const service of [this.communicationChannel, ...services]) {
            await service.start();
        }
    }
    async stopServices() {
        this.checkState(stateful_service_1.Actions.stopServices);
        this.changeState(state_1.State.STOPPING_SERVICES);
        const services = Object.values(this.services);
        for (const service of [this.communicationChannel, ...services].reverse()) {
            await service.stop();
        }
    }
    async start() {
        this.checkState(stateful_service_1.Actions.start);
        try {
            await this.startServices();
        }
        catch (e) {
            this.emit('error', e);
        }
        this.changeState(state_1.State.RUNNING);
    }
    async stop() {
        this.checkState(stateful_service_1.Actions.stop);
        try {
            await this.stopServices();
        }
        catch (e) {
            this.emit('error', e);
        }
        this.changeState(state_1.State.STOPPED);
    }
}
exports.default = Application;
//# sourceMappingURL=application.js.map