import {System} from "../../abstract/System";
import {BallComponent} from "../../components/BallComponent";
import {PlayerComponent} from "../../components/PlayerComponent";
import {WallComponent} from "../../components/WallComponent";
import {Render} from "../../Render";
import b2BodyDef = Box2D.Dynamics.b2BodyDef;
import b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
import b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
import b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
import {EnemyComponent} from "../../components/EnemyComponent";
export class BodyIntSystem extends System {
    assignComponents: any = {
        'BallComponent': ['initBall'],
        'PlayerComponent': ['initPlayer'],
        'WallComponent': ['initWall'],
        'EnemyComponent': ['initEnemy']
    };

    initBall(component: BallComponent) {
        if (component.initialize) {
            return;
        }

        component.initialize = true;

        let bodyDef: b2BodyDef = new this.render.box2d.Dynamics.b2BodyDef();
        bodyDef.type = this.render.box2d.Dynamics.b2Body.b2_dynamicBody;
        bodyDef.position.Set(component.position.x / Render.SIZE, component.position.y / Render.SIZE);
        // bodyDef.linearDamping = component.linearDamping;
        // bodyDef.angularDamping = component.angularDamping;

        component.body = this.render.world.CreateBody(bodyDef);
        let circle: b2CircleShape = new this.render.box2d.Collision.Shapes.b2CircleShape(component.radius / Render.SIZE);
        // circle.SetRadius(component.radius / Render.SIZE);

        let fd: b2FixtureDef = new this.render.box2d.Dynamics.b2FixtureDef();
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

        let b2Body = this.render.box2d.Dynamics.b2Body,
            b2BodyDef = this.render.box2d.Dynamics.b2BodyDef,
            b2FixtureDef = this.render.box2d.Dynamics.b2FixtureDef,
            b2PolygonShape = this.render.box2d.Collision.Shapes.b2PolygonShape
        ;

        let fixDef = new b2FixtureDef;
        fixDef.density = component.density;
        fixDef.friction = component.friction;
        fixDef.restitution = component.restitution;

        let bodyDef = new b2BodyDef;
        bodyDef.type = b2Body.b2_dynamicBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(component.width / 2 / Render.SIZE, component.height / 2 / Render.SIZE);
        bodyDef.position.Set(component.position.x / Render.SIZE, component.position.y / Render.SIZE);
        component.body = this.render.world.CreateBody(bodyDef);
        component.body.CreateFixture(fixDef);
    }

    initWall(component: WallComponent) {
        if (component.initialize) {
            return;
        }

        component.initialize = true;

        let b2Body = this.render.box2d.Dynamics.b2Body,
            b2BodyDef = this.render.box2d.Dynamics.b2BodyDef,
            b2FixtureDef = this.render.box2d.Dynamics.b2FixtureDef,
            b2PolygonShape = this.render.box2d.Collision.Shapes.b2PolygonShape
        ;

        let fixDef = new b2FixtureDef;
        fixDef.density = component.density;
        fixDef.restitution = component.restitution;

        let bodyDef = new b2BodyDef;

        // create ground
        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(component.width / 2 / Render.SIZE, component.height / 2 / Render.SIZE);

        bodyDef.position.Set(component.position.x / Render.SIZE, component.position.y / Render.SIZE);

        component.body = this.render.world.CreateBody(bodyDef);
        component.body.CreateFixture(fixDef);
    }

    initEnemy(component: EnemyComponent) {
        if (component.initialize) {
            return;
        }
        component.initialize = true;

        let b2Body = this.render.box2d.Dynamics.b2Body,
            b2BodyDef = this.render.box2d.Dynamics.b2BodyDef,
            b2FixtureDef = this.render.box2d.Dynamics.b2FixtureDef,
            b2PolygonShape = this.render.box2d.Collision.Shapes.b2PolygonShape
        ;

        let fixDef = new b2FixtureDef;
        fixDef.density = component.density;
        fixDef.restitution = component.restitution;

        let bodyDef = new b2BodyDef;

        bodyDef.type = b2Body.b2_staticBody;
        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(component.width / 2 / Render.SIZE, component.height / 2 / Render.SIZE);

        bodyDef.position.Set(component.position.x / Render.SIZE, component.position.y / Render.SIZE);
        bodyDef.angle = component.angle;

        component.body = this.render.world.CreateBody(bodyDef);
        component.body.CreateFixture(fixDef);
    }
}
