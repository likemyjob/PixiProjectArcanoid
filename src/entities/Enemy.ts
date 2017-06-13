import {Entity} from "../abstract/Entity";
import {EnemyComponent} from "../components/EnemyComponent";
import {HealthComponent} from "../components/HealthComponent";
import {PhysicsComponent} from "../components/PhysicsComponent";
import {PixiView} from "../views/PixiView";
export class Enemy extends Entity {
    public components: any = {
        'EnemyComponent': new EnemyComponent(this),
        'PixiView': new PixiView(this),
        'HealthComponent': new HealthComponent(this),
        'PhysicsComponent': new PhysicsComponent(this)
    };
}
