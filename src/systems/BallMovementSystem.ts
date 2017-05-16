import {System} from "../abstract/System";
import {Vector} from "../helpers/Vector";
import {BallMovementComponent} from "../components/BallMovementComponent";
import {Player} from "../entities/Player";
import {Container} from "typedi";
export class BallMovementSystem extends System {
    assignComponents: string[] = [
        'BallMovementComponent'
    ];
    executable: string[] = ['move'];

    private player: Player;

    private directionVector: Vector = new Vector(0, -1);

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

        if (!this.directionVector.isNull()) {
            let module = Math.sqrt(Math.pow(this.directionVector.x, 2) + Math.pow(this.directionVector.y, 2));
            let x = component.speed * this.directionVector.x / module;
            let y = component.speed * this.directionVector.y / module;

            let pos = this.getPosition(component);

            if (pos.x + x + component.entity.view.getWidth() >= this.render.width) {
                this.directionVector.x *= -1;
            }
            if (pos.x + x <= 0) {
                this.directionVector.x *= -1;
            }

            if (pos.y + y <= 0) {
                this.directionVector.y *= -1;
            }

            if (pos.y + y >= this.render.height) {
                this.directionVector.y *= -1;
            }

            let playerPos = this.player.view.getPosition();
            let playerWidth = this.player.view.getWidth();

            if ((pos.x > playerPos.x ) && (pos.x < playerPos.x + playerWidth )) {
                if (pos.y + y + component.entity.view.getHeight() >= playerPos.y) {
                    this.directionVector.y *= -1;
                }
            }


            this.addPosition(component, new Vector(x, y));
        }
    }
}
