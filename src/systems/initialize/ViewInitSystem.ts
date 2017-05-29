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

        ViewIntSystem.syncPosition(component, bodyComp);

        let gr: any = component.container.getChildAt(0);
        gr.lineStyle(2, 0x000000, 1);
        gr.beginFill(0xEEE5E5, 1);
        gr.drawCircle(0, 0, bodyComp.radius * 2);
        gr.endFill();

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
        ViewIntSystem.syncPosition(component, bodyComp);

        let gr: any = component.container.getChildAt(0);
        gr.lineStyle(2, 0x000000, 1);
        gr.beginFill(0xEEE5E5, 1);
        gr.drawRoundedRect(0, 0, bodyComp.width, bodyComp.height, 1);
        gr.endFill();
        let gr2 = new PIXI.Graphics();
        gr2.beginFill(0x000000, 1);
        gr2.drawCircle(bodyComp.width / 2, bodyComp.height / 2, 25);
        gr2.endFill();
        component.container.addChild(gr2);
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


        let gr: any = component.container.getChildAt(0);
        // gr.lineStyle(2, 0x000000, 1);
        gr.beginFill(0xEEE5E5, 1);
        gr.drawRoundedRect(0, 0, bodyComp.width * 2, bodyComp.height * 2, 1);
        gr.endFill();

        ViewIntSystem.syncPosition(component, bodyComp);
    }


    static syncPosition(component: any, bodyComp: any) {
        component.container.position.x = bodyComp.position.x - bodyComp.width;
        component.container.position.y = bodyComp.position.y - bodyComp.height;
    }

}
