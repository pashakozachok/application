import { IStatefulService } from "../services/stateful_service";
export interface ApplicationConfigBase {
    id: string | number;
}
export type ApplicationServices = {
    [name: string]: IStatefulService;
};
