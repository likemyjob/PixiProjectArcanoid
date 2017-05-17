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
        'move'
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

            let playerPos = this.player.view.getPosition();
            let playerWidth = this.player.view.getWidth();
            let width = component.entity.view.getWidth();
            let height = component.entity.view.getHeight();

            if ((pos.x + width / 2 > playerPos.x ) && (pos.x - width / 2 < playerPos.x + playerWidth )) {
                if (pos.y + component.nextPos.y + height / 2 >= playerPos.y) {
                    component.directionVector.y *= -1;
                    component.directionVector.addVector(this.player.components['PlayerMovementComponent'].directionVector);
                }
            }

            component.module = Math.sqrt(Math.pow(component.directionVector.x, 2) + Math.pow(component.directionVector.y, 2));
            component.nextPos.x = component.speed * component.directionVector.x / component.module;
            component.nextPos.y = component.speed * component.directionVector.y / component.module;

            this.addPosition(component, component.nextPos);
        }
    }
}
