import b2ContactListener = Box2D.Dynamics.b2ContactListener;
import b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse;
import {Container} from "typedi";
import {Player} from "../entities/Player";
import {Render} from "../Render";
import {EntityInterface} from "../interfaces/EntityInterface";
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
            let player = Container.get(Player);
            let playerBody = player.components['PlayerComponent'].body;
            if (a == playerBody) {
                let v = b.GetLinearVelocity().Copy();
                v.Multiply(40 / v.Length());

                b.SetLinearVelocity(v);
                return;
            }

            let render = Container.get(Render);

            console.log(render.entities.length);
            render.entities.forEach(function (entity: EntityInterface, index: number) {
                let comp = entity.components['EnemyComponent'];
                if (comp) {
                    if (comp.body == a) {
                        comp.shouldBeDestroy = true;
                    }
                }
            });


        }
    }

    PreSolve(contact: Box2D.Dynamics.Contacts.b2Contact, oldManifold: Box2D.Collision.b2Manifold) {
    }
}
