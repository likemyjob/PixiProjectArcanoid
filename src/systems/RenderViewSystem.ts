import {System} from "../abstract/System";
import {BallView} from "../views/BallView";
import {BodyComponent} from "../components/BodyComponent";
import * as box2d from "box2d.ts/Box2D/Box2D/Box2D";
export class RenderViewSystem extends System {
    assignComponents: string[] = [
        'BallView'
    ];
    executable: string[] = [
        'move'
    ];

    move(component: BallView) {
        if (!(component instanceof BallView)) {
            return;
        }

        let bodyComp: BodyComponent = component.entity.components['BodyComponent'];

        let position: box2d.b2Vec2 = bodyComp.body.GetPosition();

        bodyComp.position = position;

        component.container.position.x = position.x;
        component.container.position.y = position.y;
    }
}
