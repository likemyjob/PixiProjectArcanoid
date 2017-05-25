import {Render} from "../Render";
import {Container} from "typedi";
export abstract class Physics {

    public name: string;
    public render: Render;

    constructor() {
        this.render = Container.get(Render);
    }

}
