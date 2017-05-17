import {System} from "../abstract/System";
import {BallMovementComponent} from "../components/BallMovementComponent";
import {Ball} from "../entities/Ball";
import {Vector} from "../helpers/Vector";
export class CollisionSystem extends System {
    assignComponents: string[] = [
        'BallMovementComponent'
    ];
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

            if (entity === component.entity) {
                return;
            }

            let ePos = entity.components['BallMovementComponent'].entity.view.getPosition();
            let eWidth = entity.components['BallMovementComponent'].entity.view.getWidth();

            let normal = new Vector(ePos.x - pos.x, ePos.y - pos.y);
            if (Math.sqrt(Math.pow(normal.x, 2) + Math.pow(normal.y, 2)) < eWidth) {
                console.log('collide');
                component.collide = true;
                entity.components['BallMovementComponent'].directionVector.addVector(normal);
                component.collide = false;
            }

        });
    }
}
