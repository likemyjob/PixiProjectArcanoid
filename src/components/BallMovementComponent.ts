import {Component} from "../abstract/Component";
import {Vector} from "../helpers/Vector";
export class BallMovementComponent extends Component {
    name = 'BallMovementComponent';
    public speed: number = 0;
    public directionVector: Vector = new Vector(100, 0);
    public collide: boolean = false;
    public module: number = 1;
    public nextPos: Vector = new Vector(0, 0);
    public friction: number = 0.001;
    public gravity: number = 0.05;
    public timeFly = 0;
}
