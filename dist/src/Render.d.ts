/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />
/// <reference path="../node_modules/box2d.ts/Box2D/Box2D/Box2D.d.ts" />
/// <reference types="pixi.js" />
import { b2Vec2, b2World, b2Body } from "box2d.ts/Box2D/Box2D/Box2D";
export declare class Render {
    app: PIXI.Application;
    width: number;
    height: number;
    resources: any;
    entities: any;
    private systems;
    gravity: b2Vec2;
    world: b2World;
    timeStep: number;
    velocityIterations: number;
    positionIterations: number;
    body: b2Body;
    constructor();
    addEntity(obj: any): void;
    addSystem(obj: any): void;
    private resize();
    update(delta: number): void;
    onLoaded(loader: any, res: any): void;
    addBody(): void;
    box2dCreateWorld(): void;
}
