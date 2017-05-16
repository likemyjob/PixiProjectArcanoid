import {Component} from "../abstract/Component";
import {Vector} from "../helpers/Vector";
export class PlayerMovementComponent extends  Component{
    public name: string = 'PlayerMovementComponent';
    public speed: number = 10;
    public entity: any;
    public directionVector:Vector = new Vector();
}
