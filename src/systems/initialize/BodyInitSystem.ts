import * as box2d from "box2d.ts/Box2D/Box2D/Box2D";
import {System} from "../../abstract/System";
import {BallComponent} from "../../components/BallComponent";
import {PlayerComponent} from "../../components/PlayerComponent";
import {WallComponent} from "../../components/WallComponent";
import {Render} from "../../Render";
export class BodyIntSystem extends System {
    assignComponents: any = {
        'BallComponent': ['initBall'],
        'PlayerComponent': ['initPlayer'],
        'WallComponent': ['initWall']
    };

    initBall(component: BallComponent) {
        if (component.initialize) {
            return;
        }

        component.initialize = true;

        let bodyDef: box2d.b2BodyDef = new box2d.b2BodyDef();
        bodyDef.type = box2d.b2BodyType.b2_dynamicBody;
        bodyDef.position.Set(component.position.x / Render.SIZE, component.position.y / Render.SIZE);
        bodyDef.linearDamping = component.linearDamping;
        bodyDef.angularDamping = component.angularDamping;

        component.body = this.render.world.CreateBody(bodyDef);
        let circle: box2d.b2CircleShape = new box2d.b2CircleShape();
        circle.m_radius = component.radius / Render.SIZE;

        let fd: box2d.b2FixtureDef = new box2d.b2FixtureDef();
        fd.shape = circle;
        fd.density = component.density;
        fd.restitution = component.restitution;
        fd.friction = component.friction;

        component.body.CreateFixture(fd, 1);
    }

    initPlayer(component: PlayerComponent) {
        if (component.initialize) {
            return;
        }

        component.initialize = true;

        let bodyDef: box2d.b2BodyDef = new box2d.b2BodyDef();
        bodyDef.type = box2d.b2BodyType.b2_dynamicBody;
        bodyDef.position.Set(component.position.x / Render.SIZE, component.position.y / Render.SIZE);
        bodyDef.linearDamping = component.linearDamping;

        component.body = this.render.world.CreateBody(bodyDef);

        let box: box2d.b2PolygonShape = new box2d.b2PolygonShape();
        box.SetAsBox(component.width / 2 / Render.SIZE, component.height / 2 / Render.SIZE);

        let fd: box2d.b2FixtureDef = new box2d.b2FixtureDef();
        fd.shape = box;
        fd.density = component.density;
        fd.restitution = component.restitution;
        fd.friction = component.friction;

        component.body.CreateFixture(fd, 1);
    }

    initWall(component: WallComponent) {
        if (component.initialize) {
            return;
        }

        component.initialize = true;

        let bodyDef: box2d.b2BodyDef = new box2d.b2BodyDef();
        bodyDef.type = box2d.b2BodyType.b2_staticBody;
        bodyDef.position.Set(component.position.x / Render.SIZE, component.position.y / Render.SIZE);

        component.body = this.render.world.CreateBody(bodyDef);

        let box: box2d.b2PolygonShape = new box2d.b2PolygonShape();
        box.SetAsBox(component.width / 2 / Render.SIZE, component.height / 2 / Render.SIZE);

        let fd: box2d.b2FixtureDef = new box2d.b2FixtureDef();
        fd.shape = box;
        fd.density = component.density;
        fd.restitution = component.restitution;

        component.body.CreateFixture(fd, 1);
    }
}
