/// <reference types="pixi.js" />
import { GameObjectInterface } from "../interfaces/GameObjectInterface";
import { Render } from "../Render";
export declare abstract class GameObjectAbstract implements GameObjectInterface {
    protected active: boolean;
    protected render: Render;
    protected view: PIXI.Sprite;
    constructor();
    build(): void;
    status(): boolean;
    destroy(): void;
    update(delta: number): void;
}
