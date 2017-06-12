import {ComponentInterface} from "./ComponentInterface";
import {ComponentsMap} from "./ComponentsMap";
export interface EntityInterface {
    name:string;
    components: ComponentsMap<ComponentInterface | any>;
}
