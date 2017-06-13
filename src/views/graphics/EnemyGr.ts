import {ViewIntSystem} from "../../systems/initialize/ViewInitSystem";
import {PixiView} from "../PixiView";
import {PhysicsComponent} from "../../components/PhysicsComponent";
export class EnemyGr {
    static initEnemy(component: PixiView) {
        if (ViewIntSystem.checkInit(component)) {
            return;
        }

        let bodyComp: PhysicsComponent = component.entity.components['PhysicsComponent'];

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
}
