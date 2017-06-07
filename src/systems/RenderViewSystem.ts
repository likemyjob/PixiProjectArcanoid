import {System} from "../abstract/System";
import {BallView} from "../views/BallView";
import {PlayerView} from "../views/PlayerView";
import {PlayerComponent} from "../components/PlayerComponent";
import {BallComponent} from "../components/BallComponent";
import {Render} from "../Render";
import b2Vec2 = Box2D.Common.Math.b2Vec2;
export class RenderViewSystem extends System {
    assignComponents: any = {
        'BallView': ['moveBall'],
        'PlayerView': ['movePlayer'],
    };

    movePlayer(component: PlayerView) {
        let bodyComp: PlayerComponent = component.entity.components['PlayerComponent'];

        let position: b2Vec2 = bodyComp.body.GetPosition();
        let angle: number = bodyComp.body.GetAngle();

        position.Multiply(Render.SIZE);

        bodyComp.position = position;

        component.container.position.x = Math.round(position.x);
        component.container.position.y = Math.round(position.y);

        component.container.rotation = angle;
    }

    moveBall(component: BallView) {
        let bodyComp: BallComponent = component.entity.components['BallComponent'];
        // component.container.rotation = bodyComp.body.GetAngle();
        let position: b2Vec2 = bodyComp.body.GetPosition().Copy();

        bodyComp.body.ApplyForce(this.render.box2d.Common.Math.b2Vec2(0, -1000000), bodyComp.body.GetWorldCenter());

        position.Multiply(Render.SIZE);
        bodyComp.position = position;
        console.log(bodyComp.position);
        component.container.position.x = Math.round(position.x);
        component.container.position.y = Math.round(position.y);
    }
}
