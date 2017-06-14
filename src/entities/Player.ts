import {Entity} from "../abstract/Entity";
import {Service} from "typedi";
import {HealthComponent} from "../components/HealthComponent";
import {PhysicsComponent} from "../components/PhysicsComponent";
import {PixiView} from "../views/PixiView";
import {PlayerComponent} from "../components/PlayerComponent";
import {DynamicComponent} from "../components/DynamicComponent";
@Service()
export class Player extends Entity {
    public components: any = {
        'PhysicsComponent': new PhysicsComponent(this),
        'PixiView': new PixiView(this),
        'HealthComponent': new HealthComponent(this),
        'PlayerComponent': new PlayerComponent(this),
        'DynamicComponent': new DynamicComponent(this),
    };
}
