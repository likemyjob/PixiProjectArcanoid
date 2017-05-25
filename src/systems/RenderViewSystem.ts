import {System} from "../abstract/System";
import {BallView} from "../views/BallView";
import {BodyComponent} from "../components/BodyComponent";
import * as box2d from "box2d.ts/Box2D/Box2D/Box2D";
import {PlayerView} from "../views/PlayerView";
export class RenderViewSystem extends System {
    assignComponents: string[] = [
        'BallView',
        'PlayerView'
    ];
    executable: string[] = [
        'movePlayer',
        'moveBall'
    ];

    movePlayer(component: PlayerView) {
        if (!(component instanceof PlayerView)) {
            return;
        }

        let bodyComp: BodyComponent = component.entity.components['PlayerComponent'];

        let position: box2d.b2Vec2 = bodyComp.body.GetPosition();

        bodyComp.position = position;

        component.container.position.x = position.x;
        component.container.position.y = position.y;
    }

    moveBall(component: BallView) {
        if (!(component instanceof BallView)) {
            return;
        }

        let bodyComp: BodyComponent = component.entity.components['BallComponent'];

        let position: box2d.b2Vec2 = bodyComp.body.GetPosition();

        bodyComp.position = position;

        component.container.position.x = position.x;
        component.container.position.y = position.y;
    }
}
