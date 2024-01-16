import { State }                                      from "./types/state";
import { ILogger }                                    from "./types/logger";
import { ApplicationConfigBase, ApplicationServices }  from "./types/application";
import { Actions, StatefulService }                   from "./services/stateful_service";
import MessageBus                                     from "./services/message_bus";

export default class Application extends StatefulService {
    private readonly services: ApplicationServices;

    private id: any;
    private logger: ILogger;
    public communicationChannel: MessageBus;

    constructor(config: ApplicationConfigBase, logger: ILogger, services: ApplicationServices) {
        super();
        this.id = config.id;
        this.logger = logger;
        this.services = services;
        this.communicationChannel = new MessageBus();
    }

    private async startServices() {
        this.checkState(Actions.startServices);
        this.changeState(State.STARTING_SERVICES);
        const services = Object.values(this.services);
        for (const service of [this.communicationChannel, ...services]) {
            await service.start();
        }
    }

    private async stopServices() {
        this.checkState(Actions.stopServices);
        this.changeState(State.STOPPING_SERVICES);
        const services = Object.values(this.services);
        for (const service of [this.communicationChannel, ...services].reverse()) {
            await service.stop();
        }
    }

    async start() {
        this.checkState(Actions.start);
        try {
            await this.startServices();
        } catch (e) {
            this.emit('error', e);
        }
        this.changeState(State.RUNNING);
    }

    async stop() {
        this.checkState(Actions.stop);
        try {
            await this.stopServices();
        } catch (e) {
            this.emit('error', e);
        }
        this.changeState(State.STOPPED);
    }
}