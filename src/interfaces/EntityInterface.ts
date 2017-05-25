import {ComponentInterface} from "./ComponentInterface";
import {ComponentsMap} from "./ComponentsMap";
export interface EntityInterface {
    components: ComponentsMap<ComponentInterface | any>;
}
