import b2ContactListener = Box2D.Dynamics.b2ContactListener;
import b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse;
import {Container} from "typedi";
import {Player} from "../entities/Player";
import {Render} from "../Render";
import {EntityInterface} from "../interfaces/EntityInterface";
import {Ball} from "../entities/Ball";
let box2d = require("box2dweb/box2d.js");
export class Contact implements b2ContactListener {
    BeginContact(contact: Box2D.Dynamics.Contacts.b2Contact) {
    }

    EndContact(contact: Box2D.Dynamics.Contacts.b2Contact) {


    }

    PostSolve(contact: Box2D.Dynamics.Contacts.b2Contact, impulse: b2ContactImpulse) {
        // let a = contact.GetFixtureA().GetBody();
        // let b = contact.GetFixtureB().GetBody();
        // if (a != b) {
        //
        //     if (Contact.findPlayer(a, b, impulse)) {
        //         return;
        //     }
        //
        //     let render = Container.get(Render);
        //
        //     render.entities.forEach((entity: EntityInterface) => {
        //         //find enemy
        //         Contact.findEnemy(entity, a);
        //         Contact.findGround(entity, a);
        //     });
        //
        //
        // }
    }

    PreSolve(contact: Box2D.Dynamics.Contacts.b2Contact, oldManifold: Box2D.Collision.b2Manifold) {
    }

    private static findPlayer(a: Box2D.Dynamics.b2Body, b: Box2D.Dynamics.b2Body, i: any) {
        let player = Container.get(Player);
        let playerBody = player.components['PlayerComponent'].body;
        let ball: any = null;
        let render = Container.get(Render);
        render.entities.forEach((e: any) => {
            if (e instanceof Ball) {
                ball = e;
                return;
            }
        });

        ball = ball.components['BallComponent'].body;

        if (a == playerBody && b == ball) {
           // console.log();
            let v = ball.GetLinearVelocity().Copy();
            v.Multiply(40 / v.Length());

            b.SetLinearVelocity(v);
            return true;
        }
    }

    private static findEnemy(entity: EntityInterface, body: Box2D.Dynamics.b2Body) {
        let comp = entity.components['EnemyComponent'];
        if (comp) {
            if (comp.body == body) {
                comp.shouldBeDestroy = true;
            }
        }
    }

    private static findGround(entity: EntityInterface, body: Box2D.Dynamics.b2Body) {
        if (entity.name == 'DownWall') {
            let comp = entity.components['WallComponent'];
            if (comp) {
                if (comp.body == body) {
                    console.log('DownWall');
                    let player = Container.get(Player);

                    if (player.components['HealthComponent'].health <= 0) {
                        let render = Container.get(Render);
                        render.stop = true;
                    } else {
                        player.components['HealthComponent'].health -= 10;
                    }
                }
            }
        }
    }
}
