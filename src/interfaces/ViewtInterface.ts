import {Render} from "../Render";
import {ComponentInterface} from "./ComponentInterface";
export interface ViewInterface extends ComponentInterface {
    initialize: boolean;
    container: PIXI.Container;
    render: Render;
}
