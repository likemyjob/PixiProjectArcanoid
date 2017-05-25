import {Container} from "typedi";
import {Render} from "../Render";
import {EntityInterface} from "../interfaces/EntityInterface";
import {Component} from "./Component";
export abstract class View extends Component {
    initialize: boolean = false;
    public render: Render;

    public container: PIXI.Container;

    constructor(entity: EntityInterface) {
        super(entity);
        this.render = Container.get(Render);
    }
}
