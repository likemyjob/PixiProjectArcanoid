import * as box2d from "box2d.ts/Box2D/Box2D/Box2D";
export class CircleFixtute{
    constructor(body: box2d.b2Body) {
        let circle: box2d.b2CircleShape = new box2d.b2CircleShape();
        let fd: box2d.b2FixtureDef = new box2d.b2FixtureDef();
        circle.m_radius = 5;
        fd.shape = circle;
        fd.density = 1;
        fd.restitution = 1;
        body.CreateFixture(fd);
    }
}
