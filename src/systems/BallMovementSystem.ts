import {System} from "../abstract/System";
import {Vector} from "../helpers/Vector";
import {BallMovementComponent} from "../components/BallMovementComponent";
import {Player} from "../entities/Player";
import {Container} from "typedi";
import {
    b2Vec2,
} from "box2d.ts/Box2D/Box2D/Box2D";
export class BallMovementSystem extends System {
    assignComponents: string[] = [
        'BallMovementComponent'
    ];
    executable: string[] = [
        // 'friction',
        // 'gravity',
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

        let position: b2Vec2 = this.render.body.GetPosition();

        let pos = component.entity.view.getPosition();
        pos.x = position.x;
        pos.y = position.y;
        //
        // console.log(this.render.body.GetLinearVelocityFromWorldPoint(new b2Vec2(0,0),new b2Vec2(0,500)));
        // this.render.body.SetGravityScale(10);
        // this.render.body.ApplyLinearImpulseToCenter(new b2Vec2(100,0));
        // this.render.body.ApplyForce(new b2Vec2(0, 1), this.render.body.GetWorldCenter());
        // console.log(this.render.body.GetLinearVelocity());
        // this.render.body.ApplyForce(new b2Vec2(1000,0),this.render.body.GetWorldCenter())
        // console.log(position.x.toFixed(2), position.y.toFixed(2));
    }

}
