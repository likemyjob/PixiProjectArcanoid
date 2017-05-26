import {System} from "../../abstract/System";
import {BallView} from "../../views/BallView";
import {PlayerView} from "../../views/PlayerView";
import {BallComponent} from "../../components/BallComponent";
import {PlayerComponent} from "../../components/PlayerComponent";
import {WallView} from "../../views/WallView";
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
    }

    initWall(component: WallView) {
        if (!(component instanceof WallView)) {
            return;
        }

        if (component.initialize) {
            return;
        }

        component.initialize = true;


        let bodyComp: PlayerComponent = component.entity.components['WallComponent'];
        ViewIntSystem.syncPosition(component, bodyComp);

        let gr: any = component.container.getChildAt(0);
        gr.lineStyle(2, 0x000000, 1);
        gr.beginFill(0xEEE5E5, 1);
        gr.drawRoundedRect(0, 0, bodyComp.width, bodyComp.height, 1);
        gr.endFill();
    }


    static syncPosition(component: any, bodyComp: any) {
        component.container.position.x = bodyComp.position.x;
        component.container.position.y = bodyComp.position.y;
    }

}
