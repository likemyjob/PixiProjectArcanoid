import {Container} from "typedi";
import {Render} from "../Render";
export abstract class Entity {

    private render: Render;

    constructor() {
        this.render = Container.get(Render);
        this.render.addEntity(this);
    }
}
