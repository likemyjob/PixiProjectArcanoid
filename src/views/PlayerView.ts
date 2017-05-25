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

        this.container.addChild(gr);
        this.render.app.stage.addChild(this.container);
    }


}
