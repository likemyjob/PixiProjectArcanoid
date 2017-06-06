/// <reference path="../node_modules/@types/box2d/index.d.ts" />
/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />
/// <reference path="helpers/FPSMeter.d.ts" />
/// <reference types="pixi.js" />
/// <reference types="box2d" />
export declare class Render {
    static SIZE: number;
    app: PIXI.Application;
    width: number;
    height: number;
    resources: any;
    entities: any;
    private systems;
    gravity: Box2D.Common.Math.b2Vec2;
    timeStep: number;
    velocityIterations: number;
    positionIterations: number;
    hz: number;
    constructor();
    addEntity(obj: any): void;
    addSystem(obj: any): void;
    private resize();
    update(delta: number): void;
    onLoaded(loader: any, res: any): void;
    getRandom(min: number, max: number): number;
}
