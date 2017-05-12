import {Container} from "typedi";
import {Render} from "../Render";
export abstract class View {

    protected render: Render;

    constructor() {
        this.render = Container.get(Render);
    }
}
