import {System} from "../../abstract/System";
import {Render} from "../../Render";
import {EnemyComponent} from "../../components/EnemyComponent";
import b2BodyDef = Box2D.Dynamics.b2BodyDef;
import b2CircleShape = Box2D.Collision.Shapes.b2CircleShape;
import b2FixtureDef = Box2D.Dynamics.b2FixtureDef;
import b2PolygonShape = Box2D.Collision.Shapes.b2PolygonShape;
export class BodyIntSystem extends System {
    assignComponents: any = {
        'BallComponent': ['initBall'],
        'PlayerComponent': ['initPlayer'],
        'WallComponent': ['initWall'],
        'EnemyComponent': ['initEnemy'],
        'BonusComponent': ['initBonus']
    };

    setComponent() {
        this.component = this.entity.components['PhysicsComponent'];
    }

    initBall() {
        if (this.component.initialize) {
            return;
        }
        this.component.initialize = true;
        let b2Body = this.render.box2d.Dynamics.b2Body;
        this.createBody(b2Body.b2_dynamicBody, 'circle');
    }

    initPlayer() {
        if (this.component.initialize) {
            return;
        }
        this.component.initialize = true;
        let b2Body = this.render.box2d.Dynamics.b2Body;
        this.createBody(b2Body.b2_dynamicBody, 'box');
    }

    initWall() {
        if (this.component.initialize) {
            return;
        }

        this.component.initialize = true;

        let b2Body = this.render.box2d.Dynamics.b2Body;
        this.createBody(b2Body.b2_staticBody, 'box');
    }

    initBonus() {
        if (this.component.initialize) {
            return;
        }
        this.component.initialize = true;
        let b2Body = this.render.box2d.Dynamics.b2Body;
        this.createBody(b2Body.b2_dynamicBody, 'box');
    }

    initEnemy(component: EnemyComponent) {
        if (component.initialize) {
            return;
        }
        component.initialize = true;

        let b2Body = this.render.box2d.Dynamics.b2Body;
        this.createBody(b2Body.b2_staticBody, 'box');
    }

    private createBodyBox(component: any, type: any) {
        let b2BodyDef = this.render.box2d.Dynamics.b2BodyDef,
            b2FixtureDef = this.render.box2d.Dynamics.b2FixtureDef,
            b2PolygonShape = this.render.box2d.Collision.Shapes.b2PolygonShape;

        let fixDef = new b2FixtureDef;
        fixDef.density = component.density;
        fixDef.restitution = component.restitution;

        let bodyDef = new b2BodyDef;
        bodyDef.type = type;

        fixDef.shape = new b2PolygonShape;
        fixDef.shape.SetAsBox(component.width / 2 / Render.SIZE, component.height / 2 / Render.SIZE);

        bodyDef.position.Set(component.position.x / Render.SIZE, component.position.y / Render.SIZE);
        bodyDef.angle = component.angle;

        component.body = this.render.world.CreateBody(bodyDef);
        component.body.CreateFixture(fixDef);
    }

    private createBody(type: any, form: string) {
        let b2BodyDef = this.render.box2d.Dynamics.b2BodyDef,
            b2FixtureDef = this.render.box2d.Dynamics.b2FixtureDef,
            b2CircleShape = this.render.box2d.Collision.Shapes.b2CircleShape,
            b2PolygonShape = this.render.box2d.Collision.Shapes.b2PolygonShape;

        let bodyDef: b2BodyDef = new b2BodyDef();
        bodyDef.type = type;
        bodyDef.position.Set(this.component.position.x / Render.SIZE, this.component.position.y / Render.SIZE);
        bodyDef.linearDamping = this.component.linearDamping;
        bodyDef.angularDamping = this.component.angularDamping;

        this.component.body = this.render.world.CreateBody(bodyDef);

        let shape: any;
        switch (form) {
            case 'circle':
                shape = new b2CircleShape(this.component.radius / Render.SIZE);
                break;
            default :
                shape = new b2PolygonShape;
                shape.SetAsBox(this.component.width / 2 / Render.SIZE, this.component.height / 2 / Render.SIZE);
                break;
        }


        let fd: b2FixtureDef = new b2FixtureDef();
        fd.shape = shape;
        fd.density = this.component.density;
        fd.restitution = this.component.restitution;
        fd.friction = this.component.friction;

        this.component.body.CreateFixture(fd);
    }
}
