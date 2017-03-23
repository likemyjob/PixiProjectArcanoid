import {GameObjectInterface} from "../interfaces/GameObjectInterface";
import {Container} from "typedi";
import {Render} from "../Render";
export abstract class GameObjectAbstract implements GameObjectInterface {
    constructor(){
        let render = Container.get(Render);
        render.addUpdating(this);
    }
    public update() {
    }
}
