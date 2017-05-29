import {System} from "../abstract/System";
import {BallView} from "../views/BallView";
import * as box2d from "box2d.ts/Box2D/Box2D/Box2D";
import {PlayerView} from "../views/PlayerView";
import {PlayerComponent} from "../components/PlayerComponent";
import {BallComponent} from "../components/BallComponent";
import {WallView} from "../views/WallView";
export class RenderViewSystem extends System {
    assignComponents: string[] = [
        'BallView',
        'PlayerView',
        'WallView'
    ];
    executable: string[] = [
        'movePlayer',
        'moveBall',
        'moveWall'
    ];

    movePlayer(component: PlayerView) {
        if (!(component instanceof PlayerView)) {
            return;
        }

        let bodyComp: PlayerComponent = component.entity.components['PlayerComponent'];

        let position: box2d.b2Vec2 = bodyComp.body.GetPosition();

        bodyComp.position = position;

        component.container.position.x = position.x - bodyComp.width / 2;
        component.container.position.y = position.y - bodyComp.height / 2;
    }

    moveWall(component: WallView) {
        if (!(component instanceof WallView)) {
            return;
        }

        let bodyComp: PlayerComponent = component.entity.components['WallComponent'];

        let position: box2d.b2Vec2 = bodyComp.body.GetPosition();

        bodyComp.position = position;

        component.container.position.x = position.x - bodyComp.width / 2;
        component.container.position.y = position.y ;
    }

    moveBall(component: BallView) {
        if (!(component instanceof BallView)) {
            return;
        }

        let bodyComp: BallComponent = component.entity.components['BallComponent'];

        let position: box2d.b2Vec2 = bodyComp.body.GetPosition();

        bodyComp.position = position;

        component.container.position.x = position.x;
        component.container.position.y = position.y;
    }
}
