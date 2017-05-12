/// <reference types="pixi.js" />
import { GameObjectInterface } from "../interfaces/GameObjectInterface";
import { Render } from "../Render";
export declare abstract class GameObjectAbstract implements GameObjectInterface {
    protected active: boolean;
    protected render: Render;
    view: PIXI.Sprite;
    speed: number;
    movement: boolean;
    constructor();
    build(): void;
    status(): boolean;
    destroy(): void;
    update(delta: number): void;
}
