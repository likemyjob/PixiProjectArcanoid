/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />
/// <reference path="../node_modules/box2d.ts/Box2D/Box2D/Box2D.ts" />
/// <reference path="helpers/FPSMeter.d.ts" />
import {Service} from "typedi";
import {Ball} from "./entities/Ball";
import * as box2d from "box2d.ts/Box2D/Box2D/Box2D";
import {BodyIntSystem} from "./systems/initialize/BodyInitSystem";
import {ViewIntSystem} from "./systems/initialize/ViewInitSystem";
import {RenderViewSystem} from "./systems/RenderViewSystem";
import {Player} from "./entities/Player";
import {PlayerMovementSystem} from "./systems/PlayerMovementSystem";
import {Wall} from "./entities/Wall";

@Service()
export class Render {

    public static SIZE = 30;

    public app: PIXI.Application;
    public width: number;
    public height: number;
    public resources: any;

    public entities: any = [];
    private systems: any = [];

    public gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 1);
    public world: box2d.b2World = new box2d.b2World(this.gravity);
    public borderWorld: box2d.b2AABB = new box2d.b2AABB();
    public timeStep: number = 1 / 60;
    public velocityIterations: number = 8;
    public positionIterations: number = 3;

    public hz = 60;
    public particleIterations: number = box2d.b2CalculateParticleIterations(10, 0.04, 1 / this.hz);

    constructor() {
        PIXI.loader
            .add('sample', 'Assets/sample.png')
            .load(this.onLoaded.bind(this));
    }

    addEntity(obj: any) {
        this.entities.push(obj);
    }

    addSystem(obj: any) {
        this.systems.push(obj);
    }

    private resize() {
        this.width = document.getElementById('wrapper').offsetWidth;
        this.height = document.getElementById('wrapper').offsetHeight;
        let that = this;
        window.onresize = function (event) {
            that.width = document.getElementById('wrapper').offsetWidth;
            that.height = document.getElementById('wrapper').offsetHeight;
            that.app.renderer.resize(that.width, that.height);
        };
    }

    public update(delta: number) {
        this.systems.forEach(function (system: any) {
            system.update(delta);
        });
    }

    public onLoaded(loader: any, res: any) {
        this.resize();
        this.app = new PIXI.Application(this.width, this.height, {
            backgroundColor: 0x1a6f1d,
            antialias: true,
            autoResize: true
        }, false);
        document.getElementById('wrapper').appendChild(this.app.view);
        this.app.stop();

        this.borderWorld.lowerBound.Set(-1000 / Render.SIZE, -1000 / Render.SIZE);
        this.borderWorld.upperBound.Set(1000 / Render.SIZE, 1000 / Render.SIZE);

        this.world.SetAllowSleeping(true);
        this.world.SetWarmStarting(true);
        this.world.SetContinuousPhysics(true);
        this.world.SetSubStepping(false);

        this.resources = res;
        let meter = new FPSMeter();

        let LeftWall = new Wall();
        LeftWall.components['WallComponent'].position.Set(5, this.height / 2);
        LeftWall.components['WallComponent'].width = 10;
        LeftWall.components['WallComponent'].height = this.height;

        let RightWall = new Wall();
        RightWall.components['WallComponent'].position.Set(this.width - 5, this.height / 2);
        RightWall.components['WallComponent'].width = 10;
        RightWall.components['WallComponent'].height = this.height;

        let TopWall = new Wall();
        TopWall.components['WallComponent'].position.Set(this.width / 2, 5);
        TopWall.components['WallComponent'].width = this.width;
        TopWall.components['WallComponent'].height = 10;

        let DownWall = new Wall();
        DownWall.components['WallComponent'].position.Set(this.width / 2, this.height - 5);
        DownWall.components['WallComponent'].width = this.width;
        DownWall.components['WallComponent'].height = 10;

        let player = new Player();

        let balls: any = [];

        for (let i = 1; i < 60; i++) {
            balls[i] = new Ball();
            balls[i].components['BallComponent'].position.Set(this.getRandom(10, this.width + 100), this.getRandom(10, this.height - 100));
            balls[i].components['BallComponent'].radius = 10;
            balls[i].components['BallComponent'].density = 0.01;
            balls[i].components['BallComponent'].restitution = 1;
        }

        // let ball = new Ball();
        // ball.components['BallComponent'].position.Set(100, 200);
        // ball.components['BallComponent'].radius = 20;
        // ball.components['BallComponent'].density = 0.1;
        // ball.components['BallComponent'].restitution = 0.1;

        let bodyIntSystem = new BodyIntSystem();
        let viewIntSystem = new ViewIntSystem();
        let renderViewSystem = new RenderViewSystem();

        let plSystem = new PlayerMovementSystem();

        console.log(this.particleIterations);


        this.app.start();
        let that = this;

        setInterval(() => {
            this.world.Step(this.timeStep, this.velocityIterations, this.positionIterations);
        }, 10);

        this.app.ticker.add((delta: number) => {

            meter.tick();
            that.update(delta);
            // ball.components['BallComponent'].body.ApplyForce(new box2d.b2Vec2(0,100),ball.components['BallComponent'].body.GetLocalCenter());
            // ball.components['BallComponent'].body.ApplyLinearImpulseToCenter(new box2d.b2Vec2(0,-10));
        });
    }

    getRandom(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

}
