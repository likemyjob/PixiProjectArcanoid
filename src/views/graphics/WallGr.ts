import {ViewIntSystem} from "../../systems/initialize/ViewInitSystem";
import {PixiView} from "../PixiView";
import {PhysicsComponent} from "../../components/PhysicsComponent";
export class WallGr {
    static  initWall(component: PixiView) {
        let bodyComp: PhysicsComponent = component.entity.components['PhysicsComponent'];

        ViewIntSystem.syncPosition(component, bodyComp);

        let gr: any = component.container.getChildAt(0);
        gr.beginFill(0xEEE5E5, 1);
        gr.drawRoundedRect(0, 0, bodyComp.width, bodyComp.height, 1);
        gr.endFill();

        component.container.pivot.x = component.container.width / 2;
        component.container.pivot.y = component.container.height / 2;

        component.container.position.set(bodyComp.position.x, bodyComp.position.y);
    }
}
