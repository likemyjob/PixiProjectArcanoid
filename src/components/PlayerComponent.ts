import {Component} from "../abstract/Component";
import b2Vec2 = Box2D.Common.Math.b2Vec2;
import b2Body = Box2D.Dynamics.b2Body;
export class PlayerComponent extends Component {
    initialize: boolean = false;
    width: number = 100;
    height: number = 10;
    position: b2Vec2 = new b2Vec2(200, 500);
    density: number = 1;
    restitution: number = 0;
    body: b2Body;
    friction:number = 0.001;
    linearDamping:number = 0;
}
