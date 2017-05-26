import * as box2d from "box2d.ts/Box2D/Box2D/Box2D";
import {Component} from "../abstract/Component";
export class WallComponent extends Component {
    initialize: boolean = false;
    body: box2d.b2Body;
    density: number = 1;
    restitution: number = 0;
    position: box2d.b2Vec2 = new box2d.b2Vec2(0, 0);
    width: number = 10;
    height: number = 10;
}
