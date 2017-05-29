import * as box2d from "box2d.ts/Box2D/Box2D/Box2D";
import {Component} from "../abstract/Component";
export class BallComponent extends Component {
    public radius: number = 5;
    body: box2d.b2Body;
    position: box2d.b2Vec2 = new box2d.b2Vec2(200, 100);
    initialize: boolean = false;
    density: number = 100;
    restitution: number = 150;
}
