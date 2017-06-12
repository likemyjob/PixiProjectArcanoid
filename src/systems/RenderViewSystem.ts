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
let box2d = require("box2dweb/box2d.js");
export class RenderViewSystem extends System {
    assignComponents: any = {
        'BallView': ['moveBall'],
        'PlayerView': ['movePlayer'],
        'EnemyComponent': ['destroy'],
        'UserInterfaceView': ['displayHealthPlayer'],
        'BallComponent': ['destroy2']
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

    destroy(component: EnemyComponent) {
        if (component.shouldBeDestroy) {
            this.render.app.stage.removeChild(component.entity.components['EnemyView'].container);
            this.render.world.DestroyBody(component.body);
            let index = this.render.entities.indexOf(component.entity);
            this.render.entities.splice(index, 1);
        }
    }

    destroy2(component: BallComponent) {
        if (component.shouldBeDestroy) {
            let container = component.entity.components['BallView'].container;
            this.render.app.stage.removeChild(container);
            this.render.world.DestroyBody(component.body);
            let index = this.render.entities.indexOf(component.entity);
            this.render.entities.splice(index, 1);
        }
    }
}
