/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />
/// <reference path="../node_modules/box2d.ts/Box2D/Box2D/Box2D.ts" />
import {Service} from "typedi";
import {PlayerMovementSystem} from "./systems/PlayerMovementSystem";
import {Player} from "./entities/Player";
import {Ball} from "./entities/Ball";
import {BallMovementSystem} from "./systems/BallMovementSystem";
import {CollisionSystem} from "./systems/CollisionSystem";
import {
    b2Vec2,
    b2World,
    b2BodyDef,
    b2Fixture,
    b2Body,
    b2PolygonShape,
    b2BodyType,
    b2FixtureDef
} from "box2d.ts/Box2D/Box2D/Box2D";
import {b2CircleShape} from "../dist/node_modules/box2d.ts/Box2D/Box2D/Collision/Shapes/b2CircleShape";

@Service()
export class Render {
    public app: PIXI.Application;
    public width: number;
    public height: number;
    public resources: any;

    public entities: any = [];
    private systems: any = [];

    public gravity: b2Vec2 = new b2Vec2(0, 10);
    public world: b2World = new b2World(this.gravity);
    public timeStep: number = 1/60;
    public velocityIterations: number = 10;
    public positionIterations: number = 10;

    public body: b2Body;

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

        this.box2dCreateWorld();
        this.addBody();

        let player = new Player();
        let ball = new Ball();
        // let ball2 = new Ball();
        // let ball3 = new Ball();
        // let ball4 = new Ball();
        // let ball5 = new Ball();
        // ball2.view.shift(new Vector(-2,-100));
        // ball3.view.shift(new Vector(-4,-120));
        // ball4.view.shift(new Vector(-6,-140));
        // ball5.view.shift(new Vector(-8,-160));

        let plSystem = new PlayerMovementSystem();
        let ballSystem = new BallMovementSystem();
        let collisionSystem = new CollisionSystem();

        this.app.start();
        let that = this;
        this.app.ticker.add((delta: number) => {
            this.world.Step(this.timeStep, this.velocityIterations, this.positionIterations);
            that.update(delta);
        });
    }

    addBody() {
        // Define the dynamic body. We set its position and call the body factory.
        let bodyDef: b2BodyDef = new b2BodyDef();
        bodyDef.type = b2BodyType.b2_dynamicBody;
        bodyDef.position.Set(100, 100);
        this.body = this.world.CreateBody(bodyDef);
        // Define another box shape for our dynamic body.
        let dynamicBox: b2CircleShape = new b2CircleShape();
        dynamicBox.SetAsBox(10, 10);

        // Define the dynamic body fixture.
        let fixtureDef: b2FixtureDef = new b2FixtureDef();
        fixtureDef.shape = dynamicBox;


        // Set the box density to be non-zero, so it will be dynamic.
        fixtureDef.density = 10;
        fixtureDef.restitution = 10;

        // Override the default friction.
        fixtureDef.friction = 0.003;

        // Add the shape to the body.
        let fixture: b2Fixture = this.body.CreateFixture(fixtureDef);
    }

    box2dCreateWorld() {
        // Define the ground body.
        let groundBodyDef: b2BodyDef = new b2BodyDef();
        groundBodyDef.position.Set(0, this.height - 20);

        // Call the body factory which allocates memory for the ground body
        // from a pool and creates the ground box shape (also from a pool).
        // The body is also added to the world.
        let groundBody: b2Body = this.world.CreateBody(groundBodyDef);

        // Define the ground box shape.
        let groundBox: b2PolygonShape = new b2PolygonShape();

        // The extents are the half-widths of the box.
        groundBox.SetAsBox(this.width, 20);

        // Add the ground fixture to the ground body.
        groundBody.CreateFixture(groundBox, 0);
    }
}
