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

        this.container.addChild(gr);
        this.render.app.stage.addChild(this.container);
    }
}
