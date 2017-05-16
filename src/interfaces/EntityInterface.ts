import {ViewInterface} from "./ViewtInterface";
import {ComponentInterface} from "./ComponentInterface";
import {ComponentsMap} from "./ComponentsMap";
export interface EntityInterface {
    view: ViewInterface;
    components: ComponentsMap<ComponentInterface | any>;
}
