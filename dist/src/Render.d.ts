/// <reference path="../node_modules/@types/box2d/index.d.ts" />
/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />
/// <reference path="helpers/FPSMeter.d.ts" />
export declare class Render {
    box2d: any;
    static SIZE: number;
    app: PIXI.Application;
    width: number;
    height: number;
    resources: any;
    entities: any;
    systems: any;
    gravity: Box2D.Common.Math.b2Vec2;
    world: Box2D.Dynamics.b2World;
    b2AABB: Box2D.Collision.b2AABB;
    timeStep: number;
    velocityIterations: number;
    positionIterations: number;
    hz: number;
    stop: boolean;
    constructor();
    addEntity(obj: any): void;
    addSystem(obj: any): void;
    private resize();
    update(delta: number): void;
    onLoaded(loader: any, res: any): void;
    getRandom(min: number, max: number): number;
    init(): void;
    restart(): void;
}
