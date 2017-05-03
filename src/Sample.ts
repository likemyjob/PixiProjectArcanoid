import {Service} from "typedi";
import {GameObjectAbstract} from "./abstract/GameObjectAbstract";
@Service()
export class Sample extends GameObjectAbstract {

    private text: string = 'sample test';
    private alpha: number = 0;

    build() {
        let image = this.render.resources.sample;
        this.view = PIXI.Sprite.from(image.data);

        this.view.position = new PIXI.Point(100, 100);
        this.view.anchor.set(0.5);

        this.render.app.stage.addChild(this.view);
    }

    update(delta: number) {
        this.view.position.x = 200 + 100 * Math.cos(this.alpha) * delta;
        this.view.position.y = 200 + 100 * Math.sin(this.alpha) * delta;
        this.alpha += 0.01;
    }

    constructor() {
        super();
        this.build();
    }
}
