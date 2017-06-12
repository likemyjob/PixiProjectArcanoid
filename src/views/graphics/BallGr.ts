import {BallView} from "../BallView";
import {ViewIntSystem} from "../../systems/initialize/ViewInitSystem";
import {BallComponent} from "../../components/BallComponent";
export class BallGr {
    static initBall(component: BallView) {
        if (ViewIntSystem.checkInit(component)) {
            return;
        }

        let bodyComp: BallComponent = component.entity.components['BallComponent'];

        let gr: any = component.container.getChildAt(0);
        gr.lineStyle(1, 0x000080, 1);
        gr.beginFill(0x1E90FF, 1);
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
}
