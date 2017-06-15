import {System} from "../abstract/System";
import {BallComponent} from "../components/BallComponent";
import {Render} from "../Render";
import b2Vec2 = Box2D.Common.Math.b2Vec2;
import {PixiView} from "../views/PixiView";
import {Player} from "../entities/Player";
import {Container} from "typedi";
let box2d = require("box2dweb/box2d.js");
export class RenderViewSystem extends System {
    assignComponents: any = {
        'PixiView': ['move'],
        'UIComponent':['displayHP']
    };

    setComponent() {
        this.component = this.entity.components['PixiView'];
    }

    move(component: PixiView) {
        if(this.entity.components['DynamicComponent']) {
            let bodyComp: BallComponent = this.entity.components['PhysicsComponent'];
            RenderViewSystem.syncPosition(component, bodyComp);
        }
    }

    displayHP() {
        let player = Container.get(Player);
        let hp = player.components['HealthComponent'].health;
        this.component.helper.setHp(hp);
    }

    static syncPosition(component: any, bodyComp: any) {
        component.container.rotation = bodyComp.body.GetAngle();
        let position: b2Vec2 = bodyComp.body.GetPosition().Copy();
        let angle: number = bodyComp.body.GetAngle();
        position.Multiply(Render.SIZE);
        bodyComp.position = position;
        component.container.position.x = Math.round(position.x);
        component.container.position.y = Math.round(position.y);
        component.container.rotation = angle;
    }
}
