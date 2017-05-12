/// <reference types="pixi.js" />
import { GameObjectAbstract } from "./abstract/GameObjectAbstract";
export declare class Sample extends GameObjectAbstract {
    private alpha;
    speed: number;
    movement: boolean;
    private components;
    build(): void;
    setPosition(point: PIXI.Point): void;
    update(delta: number): void;
    constructor();
}
