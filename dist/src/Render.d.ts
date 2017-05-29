/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />
/// <reference path="../node_modules/box2d.ts/Box2D/Box2D/Box2D.d.ts" />
/// <reference path="helpers/FPSMeter.d.ts" />
/// <reference types="pixi.js" />
import * as box2d from "box2d.ts/Box2D/Box2D/Box2D";
export declare class Render {
    app: PIXI.Application;
    width: number;
    height: number;
    resources: any;
    entities: any;
    private systems;
    gravity: box2d.b2Vec2;
    world: box2d.b2World;
    borderWorld: box2d.b2AABB;
    timeStep: number;
    velocityIterations: number;
    positionIterations: number;
    particleIterations: number;
    body: box2d.b2Body;
    constructor();
    addEntity(obj: any): void;
    addSystem(obj: any): void;
    private resize();
    update(delta: number): void;
    onLoaded(loader: any, res: any): void;
    addBody(): void;
    getRandom(min: number, max: number): number;
    box2dCreateWorld(): void;
}
