import {Render} from "../Render";
import {View} from "../abstract/View";
import {Vector} from "../helpers/Vector";
export class PlayerView extends View {

    public render: Render;

    private view: PIXI.Container;

    constructor() {
        super();

        this.view = new PIXI.Container();

        let gr = new PIXI.Graphics();
        gr.lineStyle(2, 0x000000, 1);
        gr.beginFill(0xEEE5E5, 1);
        gr.drawRoundedRect(0, 0, 100, 10, 1);
        gr.endFill();

        this.view.addChild(gr);

        this.setDefaultPosition();

        this.render.app.stage.addChild(this.view);
    }

    setDefaultPosition() {
        this.view.position.x = (this.render.width - this.view.width) / 2;
        this.view.position.y = this.render.height - this.view.height - 40;
    }

    shift(vector: Vector) {
        this.view.position.x += vector.x;
        this.view.position.y += vector.y;
    }

    getPosition() {
        return this.view.position;
    }

    getWidth() {
        return this.view.width;
    }
}
