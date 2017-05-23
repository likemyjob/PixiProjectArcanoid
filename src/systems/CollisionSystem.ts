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
        'checkCollidePlayer',
        'fieldCollide'
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
        let nextPos = component.nextPos;
        let playerPos = player.view.getPosition();
        let playerWidth = player.view.getWidth();
        let playerHeight = player.view.getHeight();
        let width = component.entity.view.getWidth();
        let height = component.entity.view.getHeight();

        if ((pos.x + width / 2 + nextPos.x > playerPos.x ) && (pos.x - width / 2 + nextPos.x < playerPos.x + playerWidth )) {
            if ((pos.y + height / 2 + nextPos.y >= playerPos.y) && (pos.y - height / 2 + nextPos.y <= playerPos.y + playerHeight )) {
                component.collide = true;
                console.log('player collide');
                component.timeFly = 0;

                component.directionVector.x = component.directionVector.x / component.module;
                component.directionVector.y = component.directionVector.x / component.module;

                component.directionVector.addVector(player.components['PlayerMovementComponent'].normal);

                let pv = player.components['PlayerMovementComponent'].directionVector.clone();
                pv.multiply(player.components['PlayerMovementComponent'].impuls);

                component.directionVector.addVector(pv);

                component.speed = 20;

                // component.collide = false;
            }
        }
    }

    fieldCollide(component: BallMovementComponent) {
        if (!(component instanceof BallMovementComponent)) {
            return;
        }

        if (component.collide) {
            return;
        }

        let pos = component.entity.view.getPosition();
        if (pos.x + component.nextPos.x + component.entity.view.getWidth() >= this.render.width) {
            component.collide = true;
            component.directionVector.x *= -1;
            component.collide = false;
        }
        if (pos.x + component.nextPos.x <= 0) {
            component.collide = true;
            component.directionVector.x *= -1;
            component.collide = false;
        }

        if (pos.y + component.nextPos.y <= 0) {
            component.collide = true;
            component.directionVector.y *= -1;
            component.speed = component.speed / 2;
            component.collide = false;
        }

        if (pos.y + component.nextPos.y >= this.render.height) {
            component.collide = true;
            component.directionVector.y *= -1;
            pos.y = this.render.height - component.entity.view.getHeight() /2;
            // component.speed = 0;
            component.collide = false;
        }
    }

    checkCollidePlayer(component: PlayerMovementComponent) {
        if (!(component instanceof PlayerMovementComponent)) {
            return;
        }


    }
}
