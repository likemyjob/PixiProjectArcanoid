import {Component} from "../abstract/Component";
export class PlayerMovementComponent extends  Component{
    public name: string = 'PlayerMovementComponent';
    public angle: number = 0;
    public speed: number = 10;
    public movement: boolean = false;
    public position: PIXI.Point = new PIXI.Point(100, 100);
    public entity: any;
}
