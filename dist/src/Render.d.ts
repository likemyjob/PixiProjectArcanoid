/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />
/// <reference types="pixi.js" />
export declare class Render {
    app: PIXI.Application;
    width: number;
    height: number;
    resources: any;
    entities: any;
    private systems;
    constructor();
    addEntity(obj: any): void;
    addSystem(obj: any): void;
    private resize();
    update(delta: number): void;
    onLoaded(loader: any, res: any): void;
}
