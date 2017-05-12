import {GameObjectAbstract} from "./abstract/GameObjectAbstract";
import {Control} from "./Control";
import {ComponentInterface} from "./interfaces/ComponentInterface";
import {ControlMouse} from "./ControlMouse";
export class Sample extends GameObjectAbstract {

    private alpha: number = 0;

    public speed: number = 2;

    public movement: boolean = false;

    private components: ComponentInterface[] = [
        new Control(),
        new ControlMouse()
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

    setPosition(point: PIXI.Point) {
        this.view.position = point;
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
