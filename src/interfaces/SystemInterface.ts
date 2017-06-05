import {Render} from "../Render";
import {EntityInterface} from "./EntityInterface";
export interface SystemInterface {
    render: Render;
    assignComponents: string[];
    update(delta: number, entity: EntityInterface): void;
}
