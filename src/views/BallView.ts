import {View} from "../abstract/View";
export class BallView extends View {

    public container: PIXI.Container;

    constructor() {
        super();

        this.container = new PIXI.Container();

        let gr = new PIXI.Graphics();
        gr.lineStyle(2, 0x000000, 1);
        gr.beginFill(0xEEE5E5, 1);
        gr.drawCircle(0, 0, 10);
        gr.endFill();

        this.container.addChild(gr);

        this.setDefaultPosition();

        this.render.app.stage.addChild(this.container);
    }

    setDefaultPosition() {
        this.container.position.x = (this.render.width - this.container.width / 2) / 2;
        this.container.position.y = this.render.height - this.container.height - 42;
    }

}
