import {System} from "../abstract/System";
import {PlayerComponent} from "../components/PlayerComponent";
import b2Vec2 = Box2D.Common.Math.b2Vec2;
export class PlayerMovementSystem extends System {

    private directionVector: b2Vec2 = new b2Vec2();
    private pressed: number[] = [];
    private keyCodes: any = {
        '37': 'left',
        '39': 'right',
    };
    private values: any = {
        '37': new b2Vec2(-1, 0),
        "39": new b2Vec2(1, 0),
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

    private move(component: PlayerComponent) {
        if ((this.directionVector.x == 0) && (this.directionVector.y == 0)) {
            return;
        }
        // let x = 15 * this.directionVector.x * Math.sqrt(this.directionVector.x * this.directionVector.x + this.directionVector.y * this.directionVector.y);
        // let y = 15 * this.directionVector.y * Math.sqrt(this.directionVector.x * this.directionVector.x + this.directionVector.y * this.directionVector.y);
        // component.body.SetPosition(component.body.GetPosition().SelfAdd(new box2d.b2Vec2(x, y)));

        // component.body.SetLinearVelocity(this.directionVector.Clone().SelfMul(150));
        // component.body.SetAngle(2);
        // component.body.ApplyLinearImpulse(new box2d.b2Vec2(10000,0),component.body.GetLocalCenter());
        let i = this.directionVector.Copy();
        i.Multiply(1);
        component.body.ApplyImpulse(i, component.body.GetWorldCenter());
    }

    assignComponents: any = {
        'PlayerComponent': ['move']
    };
}
