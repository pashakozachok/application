import { ILogger } from "./types/logger";
import { ApplicationConfigBase, ApplicationServices } from "./types/application";
import { StatefulService } from "./services/stateful_service";
import MessageBus from "./services/message_bus";
export default class Application extends StatefulService {
    private readonly services;
    private id;
    private logger;
    communicationChannel: MessageBus;
    constructor(config: ApplicationConfigBase, logger: ILogger, services: ApplicationServices);
    private startServices;
    private stopServices;
    start(): Promise<void>;
    stop(): Promise<void>;
}
