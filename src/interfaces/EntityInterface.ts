import {ViewInterface} from "./ViewtInterface";
import {ComponentInterface} from "./ComponentInterface";
import {ComponentsMap} from "./ComponentsMap";
export interface EntityInterface {
    views: ViewInterface[];
    components: ComponentsMap<ComponentInterface>;
}
