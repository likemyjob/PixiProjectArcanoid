import {System} from "../../abstract/System";
import {BallView} from "../../views/BallView";
import {PlayerView} from "../../views/PlayerView";
import {BallComponent} from "../../components/BallComponent";
import {PlayerComponent} from "../../components/PlayerComponent";
import {WallView} from "../../views/WallView";
import {WallComponent} from "../../components/WallComponent";
import {EnemyView} from "../../views/EnemyView";
import {EnemyComponent} from "../../components/EnemyComponent";
export class ViewIntSystem extends System {
    assignComponents: any = {
        'BallView': ['initBall'],
        'PlayerView': ['initPlayer'],
        'WallView': ['initWall'],
        'EnemyView': ['initEnemy']
    };

    initBall(component: BallView) {
        if (ViewIntSystem.checkInit(component)) {
            return;
        }

        let bodyComp: BallComponent = component.entity.components['BallComponent'];

        let gr: any = component.container.getChildAt(0);
        gr.lineStyle(2, 0x000000, 1);
        gr.beginFill(0xEEE5E5, 1);
        gr.drawCircle(0, 0, bodyComp.radius);
        gr.endFill();

        let gr2 = new PIXI.Graphics();
        gr2.beginFill(0x000000);
        gr2.lineStyle(2, 0x000000, 1);

        gr2.moveTo(0, 0);
        gr2.lineTo(0, -bodyComp.radius);
        gr2.endFill();
        component.container.addChild(gr2);
    }

    initPlayer(component: PlayerView) {
        if (ViewIntSystem.checkInit(component)) {
            return;
        }

        let bodyComp: PlayerComponent = component.entity.components['PlayerComponent'];
        let gr: any = component.container.getChildAt(0);
        gr.lineStyle(2, 0x000000, 1);
        gr.beginFill(0xEEE5E5, 1);
        gr.drawRoundedRect(0, 0, bodyComp.width, bodyComp.height, 1);
        gr.endFill();

        component.container.pivot.x = component.container.width / 2;
        component.container.pivot.y = component.container.height / 2;
        ViewIntSystem.syncPosition(component, bodyComp);
    }

    initWall(component: WallView) {
        if (ViewIntSystem.checkInit(component)) {
            return;
        }

        let bodyComp: WallComponent = component.entity.components['WallComponent'];

        ViewIntSystem.syncPosition(component, bodyComp);

        let gr: any = component.container.getChildAt(0);
        gr.beginFill(0xEEE5E5, 1);
        gr.drawRoundedRect(0, 0, bodyComp.width, bodyComp.height, 1);
        gr.endFill();
    }

    initEnemy(component: EnemyView) {
        if (ViewIntSystem.checkInit(component)) {
            return;
        }

        let bodyComp: EnemyComponent = component.entity.components['EnemyComponent'];

        component.container.rotation = bodyComp.angle;

        let gr: any = component.container.getChildAt(0);
        gr.beginFill(0xEEE5E5, 1);
        gr.drawRoundedRect(0, 0, bodyComp.width, bodyComp.height, 1);
        gr.endFill();

        component.container.pivot.x = component.container.width / 2;
        component.container.pivot.y = component.container.height / 2;

        component.container.position.x = bodyComp.position.x;
        component.container.position.y = bodyComp.position.y;
    }

    static checkInit(component: any) {
        if (component.initialize) {
            return component.initialize;
        }

        component.initialize = true;
    }

    static syncPosition(component: any, bodyComp: any) {
        component.container.position.x = bodyComp.position.x - bodyComp.width / 2;
        component.container.position.y = bodyComp.position.y - bodyComp.height / 2;
    }

}
