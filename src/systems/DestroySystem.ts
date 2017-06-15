import {System} from "../abstract/System";
import {Enemy} from "../entities/Enemy";
import {Container} from "typedi";
import {EnemyManager} from "./EnemyManager";
export class DestroySystem extends System {
    assignComponents: any = {
        'DestroyComponent': ['destroy'],
    };

    destroy() {
        let enemyManager = Container.get(EnemyManager);
        if (this.entity instanceof Enemy) {
            enemyManager.removeEnemy(this.entity);
        }
        this.em.destroyEntity(this.entity);
        enemyManager.checkWin();
    }
}
