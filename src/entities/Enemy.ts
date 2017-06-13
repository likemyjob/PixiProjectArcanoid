import {Entity} from "../abstract/Entity";
import {EnemyView} from "../views/EnemyView";
import {EnemyComponent} from "../components/EnemyComponent";
import {HealthComponent} from "../components/HealthComponent";
export class Enemy extends Entity {
    public components: any = {
        'EnemyComponent': new EnemyComponent(this),
        'EnemyView': new EnemyView(this),
        'HealthComponent': new HealthComponent(this)
    };
}
