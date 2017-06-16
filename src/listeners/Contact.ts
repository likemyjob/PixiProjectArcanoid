import b2ContactListener = Box2D.Dynamics.b2ContactListener;
import b2ContactImpulse = Box2D.Dynamics.b2ContactImpulse;
import {Container} from "typedi";
import {Player} from "../entities/Player";
import {Ball} from "../entities/Ball";
import {EntityManager} from "./EntityManager";
import {DestroyComponent} from "../components/DestroyComponent";
import {Wall} from "../entities/Wall";
let box2d = require("box2dweb/box2d.js");
export class Contact implements b2ContactListener {

    private contactList: string[] = [
        'Contact.player',
        'Contact.enemy',
        'Contact.ground'
    ];

    BeginContact(contact: Box2D.Dynamics.Contacts.b2Contact) {
    }

    EndContact(contact: Box2D.Dynamics.Contacts.b2Contact) {


    }

    PostSolve(contact: Box2D.Dynamics.Contacts.b2Contact, impulse: b2ContactImpulse) {
        let a = contact.GetFixtureA().GetBody();
        let b = contact.GetFixtureB().GetBody();
        if (a != b) {

            // let that: any = this;
            this.contactList.forEach((executeble: any) => {
                let arr = executeble.split(',');
                
                // if (arr[0][1](a, b)) return;
            });
            // if (Contact.player(a, b)) {
            //     return;
            // }
            //
            // if (Contact.enemy(a, b)) {
            //     return;
            // }
            //
            // if (Contact.ground(a, b)) {
            //     return;
            // }
        }
    }

    PreSolve(contact: Box2D.Dynamics.Contacts.b2Contact, oldManifold: Box2D.Collision.b2Manifold) {
    }

    private static player(a: Box2D.Dynamics.b2Body | any, b: Box2D.Dynamics.b2Body | any) {
        if (a.name != 'Player' || b.name != 'Ball') {
            return false;
        }
        console.log('player contact');

        let v = b.GetLinearVelocity().Copy();
        v.Multiply(40 / v.Length());

        b.SetLinearVelocity(v);
        return true;
    }

    private static enemy(a: Box2D.Dynamics.b2Body | any, b: Box2D.Dynamics.b2Body | any) {
        if (a.name != 'Enemy' || b.name != 'Ball') {
            return false;
        }

        let em = Container.get(EntityManager);
        let entityA = em.findEntityByBody(a, 'EnemyComponent');

        entityA.components['DestroyComponent'] = new DestroyComponent(entityA);
        return true;
    }

    private static ground(a: Box2D.Dynamics.b2Body | any, b: Box2D.Dynamics.b2Body | any) {
        if (a.name != 'Wall' || b.name != 'Ball') {
            return false;
        }

        let em = Container.get(EntityManager);
        let entityA = em.findEntityByBody(a, 'WallComponent');

        if (entityA.name == 'DownWall') {
            console.log('ground');
            // let player = Container.get(Player);
            // if (player.components['HealthComponent'].health <= 0) {
            //     let render = Container.get(Render);
            //     render.stop = true;
            // } else {
            //     player.components['HealthComponent'].health -= 10;
            // }
            return true;
        }
        return false;
    }
}
