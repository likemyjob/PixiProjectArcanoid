import {Entity} from "../abstract/Entity";
import {BallView} from "../views/BallView";
import {BallComponent} from "../components/BallComponent";
import {PhysicsComponent} from "../components/PhysicsComponent";
export class Ball extends Entity {
    public components: any = {
        'BallComponent': new BallComponent(this),
        'BallView': new BallView(this),
        'PhysicsComponent': new PhysicsComponent(this)
    };
}
