import {System} from "../abstract/System";
import {BallMovementComponent} from "../components/BallMovementComponent";
import {Ball} from "../entities/Ball";
import {Vector} from "../helpers/Vector";
export class CollisionSystem extends System {
    assignComponents: string[];
    executable: string[] = [
        'checkCollide'
    ];

    checkCollide(component: BallMovementComponent) {
        if (!(component instanceof BallMovementComponent)) {
            return;
        }

        let pos = component.entity.view.getPosition();
        this.render.entities.forEach((entity: Ball) => {
            if (!(entity instanceof Ball)) {
                return;
            }
            let dV: Vector = entity.components['BallMovementComponent'].directionVector;

        });
    }
}