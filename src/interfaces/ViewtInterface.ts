import {Render} from "../Render";
import {Vector} from "../helpers/Vector";
export interface ViewInterface {
    render: Render;
    shift(vec:Vector):void;
    getPosition():PIXI.Point;
    getWidth():number;
    getHeight():number;
}
