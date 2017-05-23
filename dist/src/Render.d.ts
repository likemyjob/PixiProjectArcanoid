/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />
/// <reference path="../node_modules/box2d.ts/Box2D/Box2D/Box2D.d.ts" />
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
