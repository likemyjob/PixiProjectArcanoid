import {BodyComponent} from "./BodyComponent";
import * as box2d from "box2d.ts/Box2D/Box2D/Box2D";
export class PlayerComponent extends BodyComponent {
    width: number = 100;
    height: number = 10;
    position: box2d.b2Vec2 = new box2d.b2Vec2(200, 300);
}