import {Render} from "../Render";
import {View} from "../abstract/View";
export class PlayerView extends View {

    protected render: Render;

    private view: PIXI.Sprite;

    constructor() {
        super();
        let image = this.render.resources.sample;
        this.view = PIXI.Sprite.from(image.data);

        this.view.position = new PIXI.Point(100, 100);
        this.view.anchor.set(0.5);

        this.render.app.stage.addChild(this.view);
    }
}
