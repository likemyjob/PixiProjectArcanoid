import {EntityInterface} from "./EntityInterface";
import {EntityManager} from "../listeners/EntityManager";
import {Render} from "../Render";
export interface SystemInterface {
    render: Render;
    em: EntityManager;
    assignComponents: string[];
    update(entity: EntityInterface): void;
}
