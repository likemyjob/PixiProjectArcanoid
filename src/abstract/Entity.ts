import {Container} from "typedi";
import {Render} from "../Render";
import {EntityInterface} from "../interfaces/EntityInterface";
import {ComponentsMap} from "../interfaces/ComponentsMap";
import {ComponentInterface} from "../interfaces/ComponentInterface";
export abstract class Entity implements EntityInterface {

    public components: ComponentsMap<ComponentInterface> = {};

    private render: Render;

    constructor() {
        this.render = Container.get(Render);
        this.render.addEntity(this);
    }
}
