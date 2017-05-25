import {Render} from "../Render";
import {View} from "../abstract/View";
import {EntityInterface} from "../interfaces/EntityInterface";
export class PlayerView extends View {

    name: string = 'PlayerView';
    public render: Render;

    constructor(entity: EntityInterface) {
        super(entity);

        this.container = new PIXI.Container();

        let gr = new PIXI.Graphics();
        gr.lineStyle(2, 0x000000, 1);
        gr.beginFill(0xEEE5E5, 1);
        gr.drawRoundedRect(0, 0, 100, 10, 1);
        gr.endFill();

        this.container.addChild(gr);
        this.render.app.stage.addChild(this.container);
    }


}
