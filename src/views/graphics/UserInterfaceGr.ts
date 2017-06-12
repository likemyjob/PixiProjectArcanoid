import {UserInterfaceView} from "../UserInterfaceView";
import {TextGr} from "./TextGr";
export class UserInterfaceGr {
    container: PIXI.Container;
    hp: PIXI.Graphics;

    healthPlayer: number = 100;

    textGr: TextGr = new TextGr();

    constructor(component: UserInterfaceView) {
        this.container = component.container;
        this.container.removeChildAt(0);
        this.initPanel();
        this.initHpBar();
        this.initText();

        this.container.position.set(100, 100);
    }

    initPanel() {
        let gr = new PIXI.Graphics();
        gr.beginFill(0xA9A9A9, 0.5);
        gr.drawRoundedRect(0, 0, 200, 140, 1);
        gr.endFill();
        this.container.addChild(gr);
    }

    initHpBar() {
        let gr = new PIXI.Graphics();
        gr.lineStyle(2, 0x000000, 0.8);
        gr.beginFill(0xffffff, 0);
        gr.drawRoundedRect(21, 9, 22, 102, 1);
        gr.endFill();
        this.container.addChild(gr);

        let hp = new PIXI.Graphics();
        hp.beginFill(0x1E90FF, 1);
        hp.drawRoundedRect(22, 110, 20, -100, 1);
        hp.endFill();

        this.container.addChild(hp);
        this.hp = hp;
    }

    initText() {
        let hp = this.textGr.createText(this.container, 'Water', 'hpStyle');
        hp.position.set(10, 110);
    }

    setHp(hp: number) {
        if (hp != this.healthPlayer) {
            this.hp.clear();
            this.hp.beginFill(0x1E90FF, 1);
            this.hp.drawRoundedRect(22, 110, 20, -hp, 1);
            this.hp.endFill();
            this.healthPlayer = hp;
        }
    }


}
