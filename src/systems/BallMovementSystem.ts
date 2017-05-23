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
        'friction',
        'gravity',
        'move',
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
        if (component.collide) {
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
        if (pos.y + height + component.nextPos.y >= this.render.height) {
            component.directionVector = new Vector(0, component.timeFly * component.gravity);
            component.timeFly = 0;
            return;
        }

        component.timeFly += 1;
        let g = new Vector(0, 1);

        let speed = component.timeFly * component.gravity;

        if (component.directionVector.y < 0) {
            g.y *= component.gravity * component.timeFly;
            speed *= -1;
        }

        component.directionVector.addVector(g);
        component.speed += speed;
    }


    move(component: BallMovementComponent) {


        if (!(component instanceof BallMovementComponent)) {
            return;
        }

        if (!component.directionVector.isNull()) {
            if (component.collide) {
                return;
            }

            component.module = Math.sqrt(Math.pow(component.directionVector.x, 2) + Math.pow(component.directionVector.y, 2));
            component.nextPos.x += component.speed * component.directionVector.x / component.module;
            component.nextPos.y += component.speed * component.directionVector.y / component.module;
            this.addPosition(component, component.nextPos);
            component.nextPos = new Vector();
        }
    }

}
