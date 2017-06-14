import {Entity} from "../abstract/Entity";
import {BallComponent} from "../components/BallComponent";
import {PhysicsComponent} from "../components/PhysicsComponent";
import {PixiView} from "../views/PixiView";
import {DynamicComponent} from "../components/DynamicComponent";
export class Ball extends Entity {
    public components: any = {
        'BallComponent': new BallComponent(this),
        'PixiView': new PixiView(this),
        'PhysicsComponent': new PhysicsComponent(this),
        'DynamicComponent': new DynamicComponent(this)
    };
}
