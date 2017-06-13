import {Entity} from "../abstract/Entity";
import {WallComponent} from "../components/WallComponent";
import {WallView} from "../views/WallView";
import {PhysicsComponent} from "../components/PhysicsComponent";
export class Wall extends Entity {
    name = 'default';
    public components: any = {
        'WallComponent': new WallComponent(this),
        'PixiView': new WallView(this),
        'PhysicsComponent': new PhysicsComponent(this)
    };
}
