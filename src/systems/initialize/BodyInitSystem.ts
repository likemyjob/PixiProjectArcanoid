import * as box2d from "box2d.ts/Box2D/Box2D/Box2D";
import {System} from "../../abstract/System";
import {BodyComponent} from "../../components/BodyComponent";
export class BodyIntSystem extends System {
    assignComponents: string[] = [
        'BodyComponent'
    ];
    executable: string[] = [
        'init'
    ];

    init(component: BodyComponent) {
        if (!(component instanceof BodyComponent)) {
            return;
        }
        if (component.initialize) {
            return;
        }

        component.initialize = true;

        console.log('init Body');

        let bodyDef: box2d.b2BodyDef = new box2d.b2BodyDef();
        bodyDef.type = box2d.b2BodyType.b2_dynamicBody;
        bodyDef.position.Set(200, 100);
        component.body = this.render.world.CreateBody(bodyDef);

        let circle: box2d.b2CircleShape = new box2d.b2CircleShape();
        circle.m_radius = component.radius;

        let fd: box2d.b2FixtureDef = new box2d.b2FixtureDef();
        fd.shape = circle;
        fd.density = component.density;
        fd.restitution = component.restitution;

        component.body.CreateFixture(fd);
    }
}
