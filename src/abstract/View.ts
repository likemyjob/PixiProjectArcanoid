import {Container} from "typedi";
import {Render} from "../Render";
import {ViewInterface} from "../interfaces/ViewtInterface";
export abstract class View implements ViewInterface{

    public render: Render;

    constructor() {
        this.render = Container.get(Render);
    }
}
