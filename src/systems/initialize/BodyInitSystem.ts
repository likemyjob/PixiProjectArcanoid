import * as box2d from "box2d.ts/Box2D/Box2D/Box2D";
import {System} from "../../abstract/System";
import {BallComponent} from "../../components/BallComponent";
import {PlayerComponent} from "../../components/PlayerComponent";
export class BodyIntSystem extends System {
    assignComponents: string[] = [
        'BallComponent',
        'PlayerComponent'
    ];
    executable: string[] = [
        'initBall',
        'initPlayer'
    ];

    initBall(component: BallComponent) {
        if (!(component instanceof BallComponent)) {
            return;
        }
        if (component.initialize) {
            return;
        }

        component.initialize = true;

        let bodyDef: box2d.b2BodyDef = new box2d.b2BodyDef();
        bodyDef.type = box2d.b2BodyType.b2_dynamicBody;
        bodyDef.position.Set(component.position.x, component.position.y);
        component.body = this.render.world.CreateBody(bodyDef);
        let circle: box2d.b2CircleShape = new box2d.b2CircleShape();
        circle.m_radius = component.radius;

        let fd: box2d.b2FixtureDef = new box2d.b2FixtureDef();
        fd.shape = circle;
        fd.density = component.density;
        fd.restitution = component.restitution;

        component.body.CreateFixture(fd);
    }

    initPlayer(component: PlayerComponent) {
        if (!(component instanceof PlayerComponent)) {
            return;
        }
        if (component.initialize) {
            return;
        }

        component.initialize = true;

        let bodyDef: box2d.b2BodyDef = new box2d.b2BodyDef();
        bodyDef.type = box2d.b2BodyType.b2_staticBody;
        bodyDef.position.Set(component.position.x, component.position.y);

        component.body = this.render.world.CreateBody(bodyDef);

        let box: box2d.b2PolygonShape = new box2d.b2PolygonShape();
        box.SetAsBox(component.width, component.height);

        let fd: box2d.b2FixtureDef = new box2d.b2FixtureDef();
        fd.shape = box;
        fd.density = component.density;
        fd.restitution = component.restitution;

        component.body.CreateFixture(fd);
    }
}
