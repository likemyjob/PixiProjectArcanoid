import {System} from "../abstract/System";
import {Enemy} from "../entities/Enemy";
import {EntityInterface} from "../interfaces/EntityInterface";
import {Container, Service} from "typedi";
import {Player} from "../entities/Player";
import {Ball} from "../entities/Ball";
import {UI} from "../entities/UI";
@Service()
export class EnemyManager extends System {
    enemies: any = [];

    level: number = 1;

    constructor() {
        super();
        this.createLevel();
    }

    createLevel() {
        let that: any = this;
        try {
            that['createLevel' + this.level]();
        } catch (e) {
            that.level = 1;
            that.createLevel();
        }
    }

    createLevel1() {
        let maxEnemy = 5;
        let distance = 50;
        let shift = (maxEnemy - 1) * distance / 2;
        let index = 0;
        for (let i = 0; i < maxEnemy; i++) {
            for (let j = 0; j < maxEnemy; j++) {
                this.enemies[index] = new Enemy();
                this.enemies[index].components['EnemyComponent'].position.Set(j * 10 + this.render.width / 2 + i * distance - shift, this.render.height / 4 - j * distance + shift);
                index++;
            }
        }
    }

    createLevel2() {
        let maxEnemy = 5;
        let distance = 50;
        let shift = (maxEnemy - 1) * distance / 2;
        let index = 0;
        for (let i = 0; i < maxEnemy; i++) {
            for (let j = 0; j < maxEnemy; j++) {
                this.enemies[index] = new Enemy();
                this.enemies[index].components['EnemyComponent'].position.Set(j * 10 + this.render.width / 2 + i * distance - shift, this.render.height / 4 - j * distance + shift);
                this.enemies[index].components['EnemyComponent'].angle = Math.PI / 4;
                index++;
            }
        }
    }

    removeAll() {
        this.enemies.forEach((entity: EntityInterface) => {
            entity.components['EnemyComponent'].shouldBeDestroy = true;
        });
        this.enemies = [];
        this.level = 1;
        this.createLevel();
    }

    nextLevel() {
        this.level++;
        this.clear();
    }

    clear() {
        this.enemies = [];
        let player = Container.get(Player);

        this.render.entities.forEach((entity: EntityInterface) => {
            if (entity instanceof Ball) {
                let ballComp = entity.components['BallComponent'];
                ballComp.shouldBeDestroy = true;
            }
            if (entity instanceof UI) {
                player.components['HealthComponent'].health = 100;
            }
        });

        this.createLevel();

        let ball = new Ball();
        ball.components['BallComponent'].position.Set(this.render.width / 2, this.render.height - 120);
    }
}
