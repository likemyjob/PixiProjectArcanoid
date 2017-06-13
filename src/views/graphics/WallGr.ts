import {ViewIntSystem} from "../../systems/initialize/ViewInitSystem";
import {PixiView} from "../PixiView";
import {PhysicsComponent} from "../../components/PhysicsComponent";
export class WallGr {
    static  initWall(component: PixiView) {
        if (ViewIntSystem.checkInit(component)) {
            return;
        }

        let bodyComp: PhysicsComponent = component.entity.components['PhysicsComponent'];

        ViewIntSystem.syncPosition(component, bodyComp);

        let gr: any = component.container.getChildAt(0);
        gr.beginFill(0xEEE5E5, 1);
        gr.drawRoundedRect(0, 0, bodyComp.width, bodyComp.height, 1);
        gr.endFill();
    }
}
