import {Component} from "../abstract/Component";
export class PlayerMovementComponent extends  Component{
    public name: string = 'PlayerMovementComponent';
    public angle: number = 0;
    public speed: number = 2;
    public movement: boolean = false;
    public position: PIXI.Point = new PIXI.Point(100, 100);
    public entity: any;
}
