/// <reference path="../node_modules/@types/pixi.js/index.d.ts" />
import {Container, Service} from "typedi";
import {Sample} from "./Sample";
import {GameObjectInterface} from "./interfaces/GameObjectInterface";
@Service()
export class Render {
    public app: PIXI.Application;
    public width: number;
    public height: number;
    private resources: any;

    private updating: any = [];

    constructor() {
        PIXI.loader
            .add('shader', 'Assets/image.jpg')
            .load(this.onLoaded.bind(this));
    }

    addUpdating(obj: GameObjectInterface) {
        this.updating.push(obj);
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

    public update() {
        this.updating.forEach(function (object: GameObjectInterface) {
            object.update();
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

        let sample = Container.get(Sample);


        this.app.start();
        let that = this;
        this.app.ticker.add(function (delta: number) {
            that.update();
        });
    }
}
