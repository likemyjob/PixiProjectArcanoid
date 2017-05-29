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
    public app: PIXI.Application;
    public width: number;
    public height: number;
    public resources: any;

    public entities: any = [];
    private systems: any = [];

    public gravity: box2d.b2Vec2 = new box2d.b2Vec2(0, 10);
    public world: box2d.b2World = new box2d.b2World(this.gravity);
    public borderWorld: box2d.b2AABB = new box2d.b2AABB();
    public timeStep: number = 1 / 60;
    public velocityIterations: number = 8;
    public positionIterations: number = 3;
    public particleIterations: number = box2d.b2CalculateParticleIterations(10, 0.04, 1 / 60);

    public body: box2d.b2Body;

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

        this.borderWorld.lowerBound.Set(-100.0, -100.0);
        this.borderWorld.upperBound.Set(100.0, 100.0);

        this.resources = res;
        let meter = new FPSMeter();

        let LeftWall = new Wall();
        LeftWall.components['WallComponent'].position.Set(0, 0);
        LeftWall.components['WallComponent'].width = 10;
        LeftWall.components['WallComponent'].height = this.height;

        let RightWall = new Wall();
        RightWall.components['WallComponent'].position.Set(this.width, 0);
        RightWall.components['WallComponent'].width = 10;
        RightWall.components['WallComponent'].height = this.height;

        let TopWall = new Wall();
        TopWall.components['WallComponent'].position.Set(0, 0);
        TopWall.components['WallComponent'].width = this.width;
        TopWall.components['WallComponent'].height = 10;

        let DownWall = new Wall();
        DownWall.components['WallComponent'].position.Set(0, this.height);
        DownWall.components['WallComponent'].width = this.width;
        DownWall.components['WallComponent'].height = 10;

        let player = new Player();

        let balls: any = [];

        for (let i = 1; i < 1450; i++) {
            balls[i] = new Ball();
            balls[i].components['BallComponent'].position.Set(this.getRandom(10, this.width + 10), this.getRandom(10, this.height - 10));
        }


        let bodyIntSystem = new BodyIntSystem();
        let viewIntSystem = new ViewIntSystem();
        let renderViewSystem = new RenderViewSystem();

        let plSystem = new PlayerMovementSystem();


        this.app.start();
        let that = this;
        this.app.ticker.add((delta: number) => {
            meter.tick();
            // for (let i: number = 0; i < 2; ++i) {
            this.world.Step(this.timeStep, this.velocityIterations, this.positionIterations, this.particleIterations);
            // }
            // console.log(this.body.GetPosition());
            that.update(delta);
        });
    }

    addBody() {
        // Define the dynamic body. We set its position and call the body factory.
        let bodyDef: box2d.b2BodyDef = new box2d.b2BodyDef();
        bodyDef.type = box2d.b2BodyType.b2_dynamicBody;
        bodyDef.position.Set(100, 100);
        this.body = this.world.CreateBody(bodyDef);

        let circle: box2d.b2CircleShape = new box2d.b2CircleShape();
        circle.m_radius = 5;

        let fd: box2d.b2FixtureDef = new box2d.b2FixtureDef();
        fd.shape = circle;
        fd.density = 1;
        fd.restitution = 1;

        this.body.CreateFixture(fd);

    }

    // addBody() {
    //     // Define the dynamic body. We set its position and call the body factory.
    //     let bodyDef: box2d.b2BodyDef = new box2d.b2BodyDef();
    //     bodyDef.type = box2d.b2BodyType.b2_dynamicBody;
    //     bodyDef.position.Set(100, 100);
    //     this.body = this.world.CreateBody(bodyDef);
    //     // Define another box shape for our dynamic body.
    //     let dynamicBox: box2d.b2PolygonShape = new box2d.b2PolygonShape();
    //     dynamicBox.SetAsBox(10, 10);
    //
    //     // Define the dynamic body fixture.
    //     let fixtureDef: box2d.b2FixtureDef = new box2d.b2FixtureDef();
    //     fixtureDef.shape = dynamicBox;
    //
    //
    //     // Set the box density to be non-zero, so it will be dynamic.
    //     fixtureDef.density = 0.1;
    //     fixtureDef.restitution = 0.9;
    //
    //     // Override the default friction.
    //     fixtureDef.friction = 0.03;
    //
    //     // Add the shape to the body.
    //     let fixture: box2d.b2Fixture = this.body.CreateFixture(fixtureDef);
    // }

    getRandom(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    box2dCreateWorld() {
        // Define the ground body.
        let groundBodyDef: box2d.b2BodyDef = new box2d.b2BodyDef();
        groundBodyDef.position.Set(0, this.height - 20);

        // Call the body factory which allocates memory for the ground body
        // from a pool and creates the ground box shape (also from a pool).
        // The body is also added to the world.
        let groundBody: box2d.b2Body = this.world.CreateBody(groundBodyDef);

        // Define the ground box shape.
        let groundBox: box2d.b2PolygonShape = new box2d.b2PolygonShape();

        // The extents are the half-widths of the box.
        groundBox.SetAsBox(this.width, 20);

        // Add the ground fixture to the ground body.
        groundBody.CreateFixture(groundBox, 0);
    }
}
