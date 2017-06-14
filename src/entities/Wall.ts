import {Entity} from "../abstract/Entity";
import {WallComponent} from "../components/WallComponent";
import {PhysicsComponent} from "../components/PhysicsComponent";
import {PixiView} from "../views/PixiView";
export class Wall extends Entity {
    public components: any = {
        'WallComponent': new WallComponent(this),
        'PixiView': new PixiView(this),
        'PhysicsComponent': new PhysicsComponent(this)
    };
}
