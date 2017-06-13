import {Component} from "../abstract/Component";
import b2Vec2 = Box2D.Common.Math.b2Vec2;
import b2Body = Box2D.Dynamics.b2Body;
let box2d = require("box2dweb/box2d.js");
export class PlayerComponent extends Component {
    initialize: boolean = false;
    width: number = 200;
    height: number = 20;
    position: b2Vec2 = new box2d.Common.Math.b2Vec2(200, 500);
    density: number = 5;
    restitution: number = 0;
    body: b2Body;
    friction: number = 0.5;
    linearDamping: number = 0.1;
    angle: number = 0;
}
