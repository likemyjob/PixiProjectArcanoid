import {System} from "../abstract/System";
import {PlayerComponent} from "../components/PlayerComponent";
import b2Vec2 = Box2D.Common.Math.b2Vec2;
let box2d = require("box2dweb/box2d.js");
export class PlayerMovementSystem extends System {

    private directionVector: b2Vec2 = new box2d.Common.Math.b2Vec2();
    private pressed: number[] = [];
    private keyCodes: any = {
        '37': 'left',
        '39': 'right',
    };
    private values: any = {
        '37': new box2d.Common.Math.b2Vec2(-1, 0),
        "39": new box2d.Common.Math.b2Vec2(1, 0),
    };

    constructor() {
        super();
        this.eventsListener();
    }

    protected eventsListener() {
        let that = this;
        document.addEventListener('keydown', function (e: KeyboardEvent) {
            that.keyDown(e);
        }, false);
        document.addEventListener('keyup', function (e: KeyboardEvent) {
            that.keyUp(e);
        }, false);
    }

    private keyDown(e: KeyboardEvent) {
        if (e.keyCode in this.keyCodes) {
            if (this.pressed.indexOf(e.keyCode) == -1) {
                this.directionVector.Add(this.values[e.keyCode]);
                this.pressed.push(e.keyCode)
            }
        }
    }

    private keyUp(e: KeyboardEvent) {
        if (e.keyCode in this.keyCodes) {
            let index = this.pressed.indexOf(e.keyCode);
            if (index >= 0) {
                this.directionVector.Subtract(this.values[e.keyCode]);
                this.pressed.splice(index, 1);
            }
        }
    }

    private move() {
        if ((this.directionVector.x == 0) && (this.directionVector.y == 0)) {
            this.component.body.GetLinearVelocity().Multiply(0);
            return;
        }

        let i = this.directionVector.Copy();
        i.Multiply(50);
        this.component.body.ApplyImpulse(i, this.component.body.GetWorldCenter());
        // component.body.SetAngle(Math.PI / 50 * this.directionVector.x);
    }

    setComponent() {
        this.component = this.entity.components['PhysicsComponent'];
    }

    assignComponents: any = {
        'PlayerComponent': ['move']
    };
}
