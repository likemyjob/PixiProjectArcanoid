/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />
/// <reference types="pixi.js" />
import { GameObjectInterface } from "./interfaces/GameObjectInterface";
export declare class Render {
    app: PIXI.Application;
    width: number;
    height: number;
    private resources;
    private updating;
    constructor();
    addUpdating(obj: GameObjectInterface): void;
    private resize();
    update(): void;
    onLoaded(loader: any, res: any): void;
}
