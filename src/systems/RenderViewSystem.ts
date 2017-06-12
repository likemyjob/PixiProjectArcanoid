import {System} from "../abstract/System";
import {BallView} from "../views/BallView";
import {PlayerView} from "../views/PlayerView";
import {PlayerComponent} from "../components/PlayerComponent";
import {BallComponent} from "../components/BallComponent";
import {Render} from "../Render";
import {EnemyComponent} from "../components/EnemyComponent";
import {UserInterfaceView} from "../views/UserInterfaceView";
import {Container} from "typedi";
import {Player} from "../entities/Player";
import b2Vec2 = Box2D.Common.Math.b2Vec2;
import {ComponentInterface} from "../interfaces/ComponentInterface";
import {SystemInterface} from "../interfaces/SystemInterface";
import {EnemyManager} from "./EnemyManager";
import {EntityInterface} from "../interfaces/EntityInterface";
import {Enemy} from "../entities/Enemy";
let box2d = require("box2dweb/box2d.js");
export class RenderViewSystem extends System {
    assignComponents: any = {
        'BallView': ['moveBall'],
        'PlayerView': ['movePlayer'],
        'EnemyComponent': ['destroyEnemy', 'checkWin'],
        'UserInterfaceView': ['displayHealthPlayer'],
        'BallComponent': ['destroyBall']
    };

    movePlayer(component: PlayerView) {
        let bodyComp: PlayerComponent = component.entity.components['PlayerComponent'];
        RenderViewSystem.syncPosition(component, bodyComp);
    }

    moveBall(component: BallView) {
        let bodyComp: BallComponent = component.entity.components['BallComponent'];
        RenderViewSystem.syncPosition(component, bodyComp);
    }

    displayHealthPlayer(component: UserInterfaceView) {
        let player = Container.get(Player);
        let hp = player.components['HealthComponent'].health;
        component.helper.setHp(hp);

        if (hp <= 0) {
            this.render.stop = true;
        }
    }

    static syncPosition(component: any, bodyComp: any) {
        component.container.rotation = bodyComp.body.GetAngle();
        let position: b2Vec2 = bodyComp.body.GetPosition().Copy();
        let angle: number = bodyComp.body.GetAngle();
        position.Multiply(Render.SIZE);
        bodyComp.position = position;
        component.container.position.x = Math.round(position.x);
        component.container.position.y = Math.round(position.y);
        component.container.rotation = angle;
    }

    destroy(component: ComponentInterface | any, view: string) {
        if (component.shouldBeDestroy) {
            this.render.app.stage.removeChild(component.entity.components[view].container);
            this.render.world.DestroyBody(component.body);
            let index = this.render.entities.indexOf(component.entity);
            delete this.render.entities[index];
        }
    }

    destroyEnemy(component: EnemyComponent) {
        this.destroy(component, 'EnemyView');
    }

    destroyBall(component: BallComponent) {
        this.destroy(component, 'BallView');
    }

    checkWin(component: EnemyComponent) {
        if (this.render.stop) {
            return;
        }

        let count = 0;
        this.render.entities.forEach((entity: EntityInterface) => {
            if (entity instanceof Enemy) {
                count++;
            }
        });

        if (count == 0) {
            console.log('Win');
            let enemyManager = Container.get(EnemyManager);
            enemyManager.nextLevel();
        }

    }
}
