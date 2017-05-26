/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />
/// <reference path="../node_modules/box2d.ts/Box2D/Box2D/Box2D.ts" />
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
    public timeStep: number = 1 / 60;
    public velocityIterations: number = 10;
    public positionIterations: number = 10;

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
        this.resources = res;

        // this.box2dCreateWorld();
        // this.addBody();

        // this.body.ApplyLinearImpulseToCenter(new b2Vec2(1000, 0));

        let wall1 = new Wall();
        wall1.components['WallComponent'].position.Set(1, 0);
        wall1.components['WallComponent'].width = 10;
        wall1.components['WallComponent'].height = this.height;

        let wall2 = new Wall();
        wall2.components['WallComponent'].position.Set(this.width - 11, 0);
        wall2.components['WallComponent'].width = 10;
        wall2.components['WallComponent'].height = this.height;

        let wall3 = new Wall();
        wall3.components['WallComponent'].position.Set(0, 0);
        wall3.components['WallComponent'].width = this.width;
        wall3.components['WallComponent'].height = 10;

        let wall4 = new Wall();
        wall4.components['WallComponent'].position.Set(0, this.height - 11);
        wall4.components['WallComponent'].width = this.width;
        wall4.components['WallComponent'].height = 10;

        let player = new Player();
        let ball = new Ball();


        let bodyIntSystem = new BodyIntSystem();
        let viewIntSystem = new ViewIntSystem();
        let renderViewSystem = new RenderViewSystem();

        let plSystem = new PlayerMovementSystem();


        this.app.start();
        let that = this;
        this.app.ticker.add((delta: number) => {
            for (let i: number = 0; i < 30; ++i) {
                this.world.Step(this.timeStep, this.velocityIterations, this.positionIterations);
            }
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
