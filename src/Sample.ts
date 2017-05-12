import {Container, Service} from "typedi";
import {GameObjectAbstract} from "./abstract/GameObjectAbstract";
import {Control} from "./Control";
import {ComponentInterface} from "./interfaces/ComponentInterface";
@Service()
export class Sample extends GameObjectAbstract {

    private text: string = 'sample test';
    private alpha: number = 0;

    public speed: number = 2;

    private components: ComponentInterface[] = [
        Container.get(Control)
    ];

    build() {
        let image = this.render.resources.sample;
        this.view = PIXI.Sprite.from(image.data);

        this.view.position = new PIXI.Point(100, 100);
        this.view.anchor.set(0.5);

        this.render.app.stage.addChild(this.view);

        let that = this;
        this.components.forEach(function (component: any) {
            component.init(that);
        });
    }

    update(delta: number) {
        // this.view.position.x = 200 + 100 * Math.cos(this.alpha) * delta;
        // this.view.position.y = 200 + 100 * Math.sin(this.alpha) * delta;
        // this.alpha += 0.01;

        this.components.forEach(function (component: any) {
            component.update(delta);
        });
    }

    constructor() {
        super();
        this.build();
    }
}
