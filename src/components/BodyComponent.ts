import * as box2d from "box2d.ts/Box2D/Box2D/Box2D";
import {Component} from "../abstract/Component";
export class BodyComponent extends Component {
    initialize: boolean = false;
    body: box2d.b2Body;
    radius: number = 5;
    density: number = 1;
    restitution: number = 1;
    position: box2d.b2Vec2 = new box2d.b2Vec2(100, 100);
}
