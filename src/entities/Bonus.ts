import {Entity} from "../abstract/Entity";
import {BonusComponent} from "../components/BonusComponent";
import {PixiView} from "../views/PixiView";
import {PhysicsComponent} from "../components/PhysicsComponent";
import {DynamicComponent} from "../components/DynamicComponent";
export class Bonus extends Entity {
    public components: any = {
        'BonusComponent': new BonusComponent(this),
        'PixiView': new PixiView(this),
        'PhysicsComponent': new PhysicsComponent(this),
        'DynamicComponent': new DynamicComponent(this)
    }
}
