import {Component} from "../abstract/Component";
import {Vector} from "../helpers/Vector";
export class BallMovementComponent extends Component {
    name = 'BallMovementComponent';
    public speed: number = 10;
    public directionVector: Vector = new Vector(0, -1);
    public collide: boolean = false;
    public module: number = 1;
    public nextPos: Vector = new Vector(0, 0);
    public friction: number = 0.01;
    public gravity: number = 0.01;
    public timeFly = 0;
}
