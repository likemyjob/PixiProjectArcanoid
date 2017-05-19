import {System} from "../abstract/System";
import {Vector} from "../helpers/Vector";
import {BallMovementComponent} from "../components/BallMovementComponent";
import {Player} from "../entities/Player";
import {Container} from "typedi";
export class BallMovementSystem extends System {
    assignComponents: string[] = [
        'BallMovementComponent'
    ];
    executable: string[] = [
        'move',
        'friction',
        'gravity'
    ];

    private player: Player;

    constructor() {
        super();
        this.player = Container.get(Player);
    }

    addPosition(component: BallMovementComponent, newPosition: Vector) {
        component.entity.view.shift(newPosition);
    }

    getPosition(component: BallMovementComponent): PIXI.Point {
        return component.entity.view.getPosition();
    }

    friction(component: BallMovementComponent) {
        if (!(component instanceof BallMovementComponent)) {
            return;
        }
        if (component.speed <= 0) {
            component.speed = 0;
            return;
        }
        component.speed -= component.friction;
    }

    gravity(component: BallMovementComponent) {
        if (!(component instanceof BallMovementComponent)) {
            return;
        }

        if (component.collide) {
            return;
        }

        let pos = this.getPosition(component);
        let height = component.entity.view.getHeight();
        if (pos.y + height / 2 >= this.render.height) {
            component.timeFly = 0;
            return;
        }

        component.timeFly += 1;

        let g = new Vector(0, component.timeFly * component.gravity);

        this.addPosition(component, g);
    }


    move(component: BallMovementComponent) {
        if (!(component instanceof BallMovementComponent)) {
            return;
        }

        if (!component.directionVector.isNull()) {
            if (component.collide) {
                return;
            }

            let pos = this.getPosition(component);

            if (pos.x + component.nextPos.x + component.entity.view.getWidth() >= this.render.width) {
                component.directionVector.x *= -1;
            }
            if (pos.x + component.nextPos.x <= 0) {
                component.directionVector.x *= -1;
            }

            if (pos.y + component.nextPos.y <= 0) {
                component.directionVector.y *= -1;
            }

            if (pos.y + component.nextPos.y >= this.render.height) {
                component.directionVector.y *= -1;
            }



            component.module = Math.sqrt(Math.pow(component.directionVector.x, 2) + Math.pow(component.directionVector.y, 2));
            component.nextPos.x = component.speed * component.directionVector.x / component.module;
            component.nextPos.y = component.speed * component.directionVector.y / component.module;

            this.addPosition(component, component.nextPos);
        }
    }
}
