import {Render} from "../Render";
import {EntityInterface} from "./EntityInterface";
export interface SystemInterface {
    render: Render;
    assignComponents: string[];
    executable: string[];
    update(delta: number, entity: EntityInterface): void;
}
