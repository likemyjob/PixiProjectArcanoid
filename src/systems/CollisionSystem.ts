import {System} from "../abstract/System";
import {BallMovementComponent} from "../components/BallMovementComponent";
import {Ball} from "../entities/Ball";
import {Vector} from "../helpers/Vector";
import {PlayerMovementComponent} from "../components/PlayerMovementComponent";
import {Player} from "../entities/Player";
export class CollisionSystem extends System {
    assignComponents: string[] = [
        'BallMovementComponent',
        'PlayerMovementComponent'
    ];
    executable: string[] = [
        'checkCollideBall',
        'checkCollidePlayer'
    ];

    checkCollideBall(component: BallMovementComponent) {
        if (!(component instanceof BallMovementComponent)) {
            return;
        }


        this.render.entities.forEach((entity: Ball | Player) => {
            this.logicBall(component, entity);
            this.logicPlayer(component, entity);
        });
    }

    logicBall(component: BallMovementComponent, entity: Ball) {
        if (!(entity instanceof Ball)) {
            return;
        }

        //check self
        if (entity === component.entity) {
            return;
        }

        let pos = component.entity.view.getPosition();

        let ePos = entity.components['BallMovementComponent'].entity.view.getPosition();
        let eWidth = entity.components['BallMovementComponent'].entity.view.getWidth();

        let normal = new Vector(ePos.x - pos.x, ePos.y - pos.y);
        if (Math.sqrt(Math.pow(normal.x, 2) + Math.pow(normal.y, 2)) < eWidth) {
            component.collide = true;
            entity.components['BallMovementComponent'].directionVector.addVector(normal);
            component.collide = false;
        }
    }

    logicPlayer(component: BallMovementComponent, player: Player) {
        if (!(player instanceof Player)) {
            return;
        }
        let pos = component.entity.view.getPosition();
        let playerPos = player.view.getPosition();
        let playerWidth = player.view.getWidth();
        let playerHeight = player.view.getHeight();
        let width = component.entity.view.getWidth();
        let height = component.entity.view.getHeight();

        if ((pos.x + width / 2 > playerPos.x ) && (pos.x - width / 2 < playerPos.x + playerWidth )) {
            if ((pos.y + component.nextPos.y + height / 2 >= playerPos.y) && (playerPos.y + playerHeight <= pos.y + component.nextPos.y + height)) {
                component.collide = true;
                console.log('player collide');

                component.directionVector.addVector(player.components['PlayerMovementComponent'].normal);
                component.timeFly = 0;
                component.collide = false;
            }
        }
    }

    checkCollidePlayer(component: PlayerMovementComponent) {
        if (!(component instanceof PlayerMovementComponent)) {
            return;
        }


    }
}
