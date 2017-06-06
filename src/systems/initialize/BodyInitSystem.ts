import {System} from "../../abstract/System";
import {BallComponent} from "../../components/BallComponent";
import {PlayerComponent} from "../../components/PlayerComponent";
import {WallComponent} from "../../components/WallComponent";
import {Render} from "../../Render";
import b2BodyDef = Box2D.Dynamics.b2BodyDef;
import b2Body = Box2D.Dynamics.b2Body;
import b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
import b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
import b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
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

        let bodyDef: b2BodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(component.position.x / Render.SIZE, component.position.y / Render.SIZE);
        bodyDef.linearDamping = component.linearDamping;
        bodyDef.angularDamping = component.angularDamping;

        component.body = this.render.world.CreateBody(bodyDef);
        let circle: b2CircleShape = new b2CircleShape();
        circle.SetRadius(component.radius / Render.SIZE);

        let fd: b2FixtureDef = new b2FixtureDef();
        fd.shape = circle;
        fd.density = component.density;
        fd.restitution = component.restitution;
        fd.friction = component.friction;

        component.body.CreateFixture(fd);
    }

    initPlayer(component: PlayerComponent) {
        if (component.initialize) {
            return;
        }

        component.initialize = true;

        let bodyDef: b2BodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_dynamicBody;
        bodyDef.position.Set(component.position.x / Render.SIZE, component.position.y / Render.SIZE);
        bodyDef.linearDamping = component.linearDamping;

        component.body = this.render.world.CreateBody(bodyDef);

        let box: b2PolygonShape = new b2PolygonShape();
        box.SetAsBox(component.width / 2 / Render.SIZE, component.height / 2 / Render.SIZE);

        let fd: b2FixtureDef = new b2FixtureDef();
        fd.shape = box;
        fd.density = component.density;
        fd.restitution = component.restitution;
        fd.friction = component.friction;

        component.body.CreateFixture(fd);
    }

    initWall(component: WallComponent) {
        if (component.initialize) {
            return;
        }

        component.initialize = true;

        let bodyDef: b2BodyDef = new b2BodyDef();
        bodyDef.type = b2Body.b2_staticBody;
        bodyDef.position.Set(component.position.x / Render.SIZE, component.position.y / Render.SIZE);

        component.body = this.render.world.CreateBody(bodyDef);

        let box: b2PolygonShape = new b2PolygonShape();
        box.SetAsBox(component.width / 2 / Render.SIZE, component.height / 2 / Render.SIZE);

        let fd: b2FixtureDef = new b2FixtureDef();
        fd.shape = box;
        fd.density = component.density;
        fd.restitution = component.restitution;

        component.body.CreateFixture(fd);
    }
}
