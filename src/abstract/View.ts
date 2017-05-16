import {Container} from "typedi";
import {Render} from "../Render";
import {ViewInterface} from "../interfaces/ViewtInterface";
import {Vector} from "../helpers/Vector";
export abstract class View implements ViewInterface{

    public render: Render;

    public container:PIXI.Container;

    constructor() {
        this.render = Container.get(Render);
    }

    shift(vector: Vector) {
        this.container.position.x += vector.x;
        this.container.position.y += vector.y;
    }

    getPosition() {
        return this.container.position;
    }

    getWidth() {
        return this.container.width;
    }

    getHeight() {
        return this.container.height;
    }
}
