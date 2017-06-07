import {Component} from "../abstract/Component";
import b2Body = Box2D.Dynamics.b2Body;
import b2Vec2 = Box2D.Common.Math.b2Vec2;
let box2d = require("box2dweb/box2d.js");
export class BallComponent extends Component {
    public radius: number = 0.5;
    body: b2Body;
    position: b2Vec2 = new box2d.Common.Math.b2Vec2(200, 100);
    initialize: boolean = false;
    density: number = 1;
    restitution: number = 0.5;
    friction = 0.05;
    linearDamping = 0;
    angularDamping = 0;
}
