import {System} from "../abstract/System";
import {Enemy} from "../entities/Enemy";
import {Container, Service} from "typedi";
import {Player} from "../entities/Player";
import {Ball} from "../entities/Ball";
import {EntityManager} from "../listeners/EntityManager";
import {Bonus} from "../entities/Bonus";
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
        let maxEnemy = 10;
        let distance = 25;
        let shift = (maxEnemy - 1) * distance / 2;
        let index = 0;
        for (let i = 0; i < maxEnemy; i++) {
            for (let j = 0; j < maxEnemy; j++) {
                this.enemies[index] = new Enemy();
                this.enemies[index].components['PhysicsComponent'].position.Set(this.render.width / 2 + i * distance - shift, this.render.height / 4 - j * distance + shift);
                this.enemies[index].components['PhysicsComponent'].width = 20;
                this.enemies[index].components['PhysicsComponent'].height = 20;

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
                this.enemies[index].components['PhysicsComponent'].position.Set(j * 10 + this.render.width / 2 + i * distance - shift, this.render.height / 4 - j * distance + shift);
                this.enemies[index].components['PhysicsComponent'].width = 20;
                this.enemies[index].components['PhysicsComponent'].height = 20;

                index++;
            }
        }
    }

    createLevel3() {
        let maxEnemy = 5;
        let distance = 50;
        let shift = (maxEnemy - 1) * distance / 2;
        let index = 0;
        for (let i = 0; i < maxEnemy; i++) {
            for (let j = 0; j < maxEnemy; j++) {
                this.enemies[index] = new Enemy();
                this.enemies[index].components['PhysicsComponent'].position.Set(j * 10 + this.render.width / 2 + i * distance - shift, this.render.height / 4 - j * distance + shift);
                this.enemies[index].components['PhysicsComponent'].angle = Math.PI / 4;
                this.enemies[index].components['PhysicsComponent'].width = 20;
                this.enemies[index].components['PhysicsComponent'].height = 20;
                index++;
            }
        }
    }


    nextLevel() {
        this.level++;
        this.clear();
    }

    clear() {
        this.enemies = [];
        let player = Container.get(Player);
        let em = Container.get(EntityManager);

        em.removeSetOfEntities(Ball);
        em.removeSetOfEntities(Enemy);

        player.components['HealthComponent'].health = 100;

        this.createLevel();

        let newBall = new Ball();
        newBall.components['PhysicsComponent'].position.Set(this.render.width / 2, this.render.height / 2);
        newBall.components['PhysicsComponent'].restitution = 1;
    }

    removeEnemy(enemy: Enemy) {
        let index = this.enemies.indexOf(enemy);
        this.enemies.splice(index, 1);
        let bonus = new Bonus();
        bonus.components['PhysicsComponent'].width = 10;
        bonus.components['PhysicsComponent'].heidht = 10;
        bonus.components['PhysicsComponent'].position = enemy.components['PhysicsComponent'].position;
    }

    checkWin() {
        let em = Container.get(EntityManager);
        if (!em.findEntity(Enemy)) {
            this.nextLevel();
            this.clear();
        }
    }
}
