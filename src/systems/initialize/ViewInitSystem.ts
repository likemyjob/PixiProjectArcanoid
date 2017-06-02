import {System} from "../../abstract/System";
import {BallView} from "../../views/BallView";
import {PlayerView} from "../../views/PlayerView";
import {BallComponent} from "../../components/BallComponent";
import {PlayerComponent} from "../../components/PlayerComponent";
import {WallView} from "../../views/WallView";
import {WallComponent} from "../../components/WallComponent";
export class ViewIntSystem extends System {
    assignComponents: string[] = [
        'BallView',
        'PlayerView',
        'WallView'
    ];
    executable: string[] = [
        'initBall',
        'initPlayer',
        'initWall'
    ];

    initBall(component: BallView) {
        if (!(component instanceof BallView)) {
            return;
        }

        if (component.initialize) {
            return;
        }

        component.initialize = true;


        let bodyComp: BallComponent = component.entity.components['BallComponent'];

        // ViewIntSystem.syncPosition(component, bodyComp);

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
        if (!(component instanceof PlayerView)) {
            return;
        }

        if (component.initialize) {
            return;
        }

        component.initialize = true;

        let bodyComp: PlayerComponent = component.entity.components['PlayerComponent'];
        let gr: any = component.container.getChildAt(0);
        gr.lineStyle(2, 0x000000, 1);
        gr.beginFill(0xEEE5E5, 1);
        gr.drawRoundedRect(0, 0, bodyComp.width * 100, bodyComp.height * 100, 1);
        gr.endFill();

        component.container.pivot.x = component.container.width / 2;
        component.container.pivot.y = component.container.height / 2;
        // ViewIntSystem.syncPosition(component, bodyComp);
    }

    initWall(component: WallView) {
        if (!(component instanceof WallView)) {
            return;
        }

        if (component.initialize) {
            return;
        }

        component.initialize = true;

        let bodyComp: WallComponent = component.entity.components['WallComponent'];

        ViewIntSystem.syncPosition(component, bodyComp);

        let gr: any = component.container.getChildAt(0);
        // gr.lineStyle(2, 0x000000, 1);
        gr.beginFill(0xEEE5E5, 1);
        gr.drawRoundedRect(0, 0, bodyComp.width, bodyComp.height, 1);
        gr.endFill();

        // component.container.pivot.x = component.container.width / 2;
        // component.container.pivot.y = component.container.height / 2;


    }


    static syncPosition(component: any, bodyComp: any) {
        // let pos = bodyComp.position.SelfMul(100);

        component.container.position.x = bodyComp.position.x;
        component.container.position.y = bodyComp.position.y-100;
        console.log(bodyComp.position);
        console.log(component.container.position);
    }

}
