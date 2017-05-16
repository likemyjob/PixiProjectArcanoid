import {Component} from "../abstract/Component";
import {Vector} from "../helpers/Vector";
export class BallMovementComponent extends Component {
    name = 'BallMovementComponent';
    public speed: number = 10;
    public directionVector: Vector = new Vector(0, -1);
}
