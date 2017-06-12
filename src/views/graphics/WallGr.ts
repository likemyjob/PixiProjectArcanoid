import {WallView} from "../WallView";
import {ViewIntSystem} from "../../systems/initialize/ViewInitSystem";
import {WallComponent} from "../../components/WallComponent";
export class WallGr {
    static  initWall(component: WallView) {
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
}
