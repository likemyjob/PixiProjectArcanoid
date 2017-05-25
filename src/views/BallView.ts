import {View} from "../abstract/View";
import {EntityInterface} from "../interfaces/EntityInterface";
export class BallView extends View {
    name: string = 'Ball';
    public container: PIXI.Container;

    public initialize: boolean = false;

    constructor(entity:EntityInterface) {
        super(entity);

        this.container = new PIXI.Container();

        let gr = new PIXI.Graphics();
        gr.lineStyle(2, 0x000000, 1);
        gr.beginFill(0xEEE5E5, 1);
        gr.drawCircle(0, 0, 10);
        gr.endFill();

        this.container.addChild(gr);
        this.render.app.stage.addChild(this.container);
    }
}
