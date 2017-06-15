import b2ContactListener = Box2D.Dynamics.b2ContactListener;
import b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse;
import {Container} from "typedi";
import {Player} from "../entities/Player";
import {Ball} from "../entities/Ball";
import {EntityManager} from "./EntityManager";
import {DestroyComponent} from "../components/DestroyComponent";
import {Render} from "../Render";
import {Wall} from "../entities/Wall";
let box2d = require("box2dweb/box2d.js");
export class Contact implements b2ContactListener {
    BeginContact(contact: Box2D.Dynamics.Contacts.b2Contact) {
    }

    EndContact(contact: Box2D.Dynamics.Contacts.b2Contact) {


    }

    PostSolve(contact: Box2D.Dynamics.Contacts.b2Contact, impulse: b2ContactImpulse) {
        let a = contact.GetFixtureA().GetBody();
        let b = contact.GetFixtureB().GetBody();
        if (a != b) {

            if (Contact.findPlayer(a, b, impulse)) {
                return;
            }

            if (Contact.findEnemy(a, b)) {
                return;
            }

            if (Contact.findGround(a, b)) {
                return;
            }
        }
    }

    PreSolve(contact: Box2D.Dynamics.Contacts.b2Contact, oldManifold: Box2D.Collision.b2Manifold) {
    }

    private static findPlayer(a: Box2D.Dynamics.b2Body, b: Box2D.Dynamics.b2Body, i: any) {
        let player = Container.get(Player);
        let playerBody = player.components['PhysicsComponent'].body;
        let em = Container.get(EntityManager);
        let ball = em.findEntity(Ball);
        if (!ball) {
            return;
        }
        ball = ball.components['PhysicsComponent'].body;

        if (a == playerBody && b == ball) {
            let v = ball.GetLinearVelocity().Copy();
            v.Multiply(40 / v.Length());

            b.SetLinearVelocity(v);
            return true;
        }
    }

    private static findEnemy(a: Box2D.Dynamics.b2Body, b: Box2D.Dynamics.b2Body) {
        let em = Container.get(EntityManager);
        let entityA = em.findEntityByBody(a, 'EnemyComponent');
        let entityB = em.findEntityByBody(b, 'BallComponent');

        if (entityA && entityB) {
            entityA.components['DestroyComponent'] = new DestroyComponent(entityA);
            return true;
        }

        return false;
    }

    private static findGround(a: Box2D.Dynamics.b2Body, b: Box2D.Dynamics.b2Body) {
        let em = Container.get(EntityManager);
        let entityA = em.findEntityByBody(a, 'WallComponent');
        let entityB = em.findEntityByBody(b, 'BallComponent');

        if (!entityA && !entityB) {
            return false;
        }

        if (!(entityA instanceof Wall)) {
            return;
        }

        if (entityA.name == 'DownWall') {
            let player = Container.get(Player);
            if (player.components['HealthComponent'].health <= 0) {
                let render = Container.get(Render);
                render.stop = true;
            } else {
                player.components['HealthComponent'].health -= 10;
            }
        }

        return false;
    }
}
