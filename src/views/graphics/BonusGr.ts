import {PixiView} from "../PixiView";
import {PhysicsComponent} from "../../components/PhysicsComponent";
export class BallGr {
    static initBall(component: PixiView) {
        let bodyComp: PhysicsComponent = component.entity.components['PhysicsComponent'];

        let gr: any = component.container.getChildAt(0);
        gr.lineStyle(1, 0x000080, 1);
        gr.beginFill(0xFFFFFF, 1);
        gr.drawCircle(0, 0, bodyComp.radius);
        gr.endFill();

        let gr2 = new PIXI.Graphics();
        gr2.beginFill(0x000000);
        gr2.lineStyle(2, 0x000000, 1);

        gr2.moveTo(0, 0);
        gr2.lineTo(0, -bodyComp.radius);
        gr2.endFill();
        component.container.addChild(gr2);

        // component.container.pivot.x = bodyComp.radius;
        // component.container.pivot.y = bodyComp.radius;

        component.container.position.set(bodyComp.position.x, bodyComp.position.y);
    }
}
