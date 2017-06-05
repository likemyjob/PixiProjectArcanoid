import {System} from "../abstract/System";
import {BallView} from "../views/BallView";
import * as box2d from "box2d.ts/Box2D/Box2D/Box2D";
import {PlayerView} from "../views/PlayerView";
import {PlayerComponent} from "../components/PlayerComponent";
import {BallComponent} from "../components/BallComponent";
import {Render} from "../Render";
export class RenderViewSystem extends System {
    assignComponents: any = {
        'BallView': ['moveBall'],
        'PlayerView': ['movePlayer'],
    };

    movePlayer(component: PlayerView) {
        let bodyComp: PlayerComponent = component.entity.components['PlayerComponent'];

        let position: box2d.b2Vec2 = bodyComp.body.GetPosition();
        let angle: number = bodyComp.body.GetAngle();

        bodyComp.position = position.SelfMul(Render.SIZE);

        component.container.position.x = Math.round(position.x);
        component.container.position.y = Math.round(position.y);

        component.container.rotation = angle;
    }

    moveBall(component: BallView) {
        let bodyComp: BallComponent = component.entity.components['BallComponent'];
        component.container.rotation = bodyComp.body.GetAngle();
        let position: box2d.b2Vec2 = bodyComp.body.GetPosition();
        // console.log(position);
        bodyComp.position = position.SelfMul(Render.SIZE);

        // console.log(bodyComp.position.x.toFixed(2));

        component.container.position.x = Math.round(position.x);
        component.container.position.y = Math.round(position.y);
    }
}
