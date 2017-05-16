/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />
import {Service} from "typedi";
import {PlayerMovementSystem} from "./systems/PlayerMovementSystem";
import {Player} from "./entities/Player";
import {Ball} from "./entities/Ball";
import {BallMovementSystem} from "./systems/BallMovementSystem";
import {Vector} from "./helpers/Vector";
import {CollisionSystem} from "./systems/CollisionSystem";
@Service()
export class Render {
    public app: PIXI.Application;
    public width: number;
    public height: number;
    public resources: any;

    public entities: any = [];
    private systems: any = [];

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
        let that = this;
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

        let player = new Player();
        let ball = new Ball();
        let ball2 = new Ball();
        ball2.view.shift(new Vector(100,0));

        let plSystem = new PlayerMovementSystem();
        let ballSystem = new BallMovementSystem();
        let collisionSystem = new CollisionSystem();

        this.app.start();
        let that = this;
        this.app.ticker.add(function (delta: number) {
            that.update(delta);
        });
    }
}
