import * as box2d from "box2d.ts/Box2D/Box2D/Box2D";
import {Component} from "../abstract/Component";
export class PlayerComponent extends Component {
    initialize: boolean = false;
    width: number = 400;
    height: number = 10;
    position: box2d.b2Vec2 = new box2d.b2Vec2(200, 500);
    density: number = 1;
    restitution: number = 0;
    body: box2d.b2Body;
}
