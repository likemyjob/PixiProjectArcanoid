/// <reference path="../node_modules/@types/box2d/index.d.ts" />
/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />
/// <reference path="helpers/FPSMeter.d.ts" />
import {Container, Service} from "typedi";
import {Ball} from "./entities/Ball";
import {Player} from "./entities/Player";
import {Contact} from "./listeners/Contact";
import {SystemManager} from "./systems/SystemManager";
import {UI} from "./entities/UI";
import {EntityInterface} from "./interfaces/EntityInterface";
import {EnemyManager} from "./systems/EnemyManager";
import {EntityManager} from "./listeners/EntityManager";
import b2ContactListener = Box2D.Dynamics.b2ContactListener;
import {DestroyComponent} from "./components/DestroyComponent";
@Service()
export class Render {
    public box2d = require("box2dweb/box2d.js");
    public static SIZE = 20;

    public app: PIXI.Application;
    public width: number;
    public height: number;
    public resources: any;

    public entities: any = [];
    public systems: any = [];

    public gravity: Box2D.Common.Math.b2Vec2 = new this.box2d.Common.Math.b2Vec2(0, 10);
    public world: Box2D.Dynamics.b2World = new this.box2d.Dynamics.b2World(this.gravity, true);
    public b2AABB: Box2D.Collision.b2AABB = new this.box2d.Collision.b2AABB();
    public timeStep: number = 1 / 60;
    public velocityIterations: number = 10;
    public positionIterations: number = 10;

    public hz = 60;

    public stop = false;

    public entityManager: EntityManager;

    constructor() {
        PIXI.loader
            .add('sample', 'Assets/sample.png')
            .load(this.onLoaded.bind(this));
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
        this.entityManager.update();
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
        let meter = new FPSMeter();

        let player = Container.get(Player);
        player.components['PhysicsComponent'].position.Set(this.width / 2, this.height - 65);
        player.components['PhysicsComponent'].height = 20;
        // let ui = new UI();

        let ball = new Ball();
        ball.components['PhysicsComponent'].position.Set(this.width / 2, this.height / 2);
        ball.components['PhysicsComponent'].restitution = 1;

        this.entityManager = Container.get(EntityManager);
        let systemManager = new SystemManager();

        this.init();

        this.app.start();
        let that = this;

        setInterval(function () {
            if (!that.stop) {
                that.world.Step(that.timeStep, that.velocityIterations, that.positionIterations);
                that.world.ClearForces();
                that.world.DrawDebugData();
            }
        }, 1000 / 60);

        this.app.ticker.add((delta: number) => {
            meter.tick();
            that.update(delta);
        });
    }

    getRandom(min: number, max: number) {
        return Math.random() * (max - min) + min;
    }

    init() {
        let b2DebugDraw = this.box2d.Dynamics.b2DebugDraw;

        let contactListener = new Contact();
        this.world.SetContactListener(contactListener);

        //setup debug draw
        let debugDraw = new b2DebugDraw();
        let can: any = document.getElementById("test");

        can.width = this.width / 4;
        can.height = this.height / 4;

        debugDraw.SetSprite(can.getContext("2d"));
        debugDraw.SetDrawScale(5.0);
        debugDraw.SetFillAlpha(0.5);
        debugDraw.SetLineThickness(1.0);
        debugDraw.SetFlags(b2DebugDraw.e_shapeBit | b2DebugDraw.e_jointBit);
        this.world.SetDebugDraw(debugDraw);
    }

    restart() {
        let em = Container.get(EntityManager);
        let player = Container.get(Player);

        let ball = em.findEntity(Ball);
        ball.components['DestroyComponent'] = new DestroyComponent(ball);
        player.components['HealthComponent'].health = 100;

        let enemyManager = Container.get(EnemyManager);
        enemyManager.removeAll();

        this.stop = false;
        // let ball = new Ball();
        // ball.components['BallComponent'].position.Set(this.width / 2, this.height - 120);
    }

}
