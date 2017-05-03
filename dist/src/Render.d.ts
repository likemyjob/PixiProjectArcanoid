/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />
/// <reference types="pixi.js" />
import { GameObjectInterface } from "./interfaces/GameObjectInterface";
export declare class Render {
    app: PIXI.Application;
    width: number;
    height: number;
    resources: any;
    private updating;
    constructor();
    addUpdating(obj: GameObjectInterface): void;
    private resize();
    update(delta: number): void;
    onLoaded(loader: any, res: any): void;
}
