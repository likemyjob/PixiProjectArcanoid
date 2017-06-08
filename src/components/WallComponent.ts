import {Component} from "../abstract/Component";
import b2Body = Box2D.Dynamics.b2Body;
import b2Vec2 = Box2D.Common.Math.b2Vec2;
let box2d = require("box2dweb/box2d.js");
export class WallComponent extends Component {
    initialize: boolean = false;
    body: b2Body;
    density: number = 1;
    restitution: number = 0;
    position: b2Vec2 = new box2d.Common.Math.b2Vec2(0, 0);
    width: number = 10;
    height: number = 100;
}
