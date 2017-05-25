import {BodyComponent} from "./BodyComponent";
import * as box2d from "box2d.ts/Box2D/Box2D/Box2D";
export class BallComponent extends BodyComponent {
    public radius: number = 5;
    position: box2d.b2Vec2 = new box2d.b2Vec2(200, 100);
}