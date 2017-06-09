import {System} from "../abstract/System";
import {Enemy} from "../entities/Enemy";
export class EnemyManager extends System {
    constructor() {
        super();
        this.createLevel();
    }

    createLevel() {
        let enemies: any = [];

        let maxEnemy = 5;
        let distance = 50;
        let shift = (maxEnemy - 1) * distance / 2;
        for (let i = 0; i < maxEnemy; i++) {
            for (let j = 0; j < maxEnemy; j++) {
                enemies[i * j] = new Enemy();
                enemies[i * j].components['EnemyComponent'].position.Set(j * 10 + this.render.width / 2 + i * distance - shift, this.render.height / 4 - j * distance + shift);
            }
        }
    }
}
