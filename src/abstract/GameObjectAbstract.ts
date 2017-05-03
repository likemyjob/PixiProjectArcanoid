import {GameObjectInterface} from "../interfaces/GameObjectInterface";
import {Container} from "typedi";
import {Render} from "../Render";
export abstract class GameObjectAbstract implements GameObjectInterface {

    protected active: boolean;
    protected render: Render;
    protected view: PIXI.Sprite;

    constructor() {
        this.render = Container.get(Render);
        this.render.addUpdating(this);
    }

    public build(): void {

    }

    public status(): boolean {
        return this.active;
    }

    public destroy() {
        this.render.app.stage.removeChild(this.view);
    }

    public update(delta: number) {
    }
}
