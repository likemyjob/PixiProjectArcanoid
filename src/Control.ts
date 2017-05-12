import {GameObjectInterface} from "./interfaces/GameObjectInterface";
import {Vector} from "./Vector";
import {Component} from "./abstract/Component";
export class Control extends Component {

    protected entity: GameObjectInterface;

    private directionVector: Vector = new Vector(0, 0);

    private pressed: number[] = [];

    private keyCodes: any = {
        '38': 'up',
        '40': 'down',
        '37': 'left',
        '39': 'right',
    };

    private keys: any = {
        'up': false,
        'down': false,
        'left': false,
        "right": false,
    };

    private values: any = {
        '38': new Vector(0, -1),
        '40': new Vector(0, 1),
        '37': new Vector(-1, 0),
        "39": new Vector(1, 0),
    };

    private handler(keyCode: any, check: boolean) {
        this.keys[this.keyCodes[keyCode]] = check;
    };

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
                this.handler(e.keyCode, true);

                this.directionVector.addVector(this.values[e.keyCode]);

                this.pressed.push(e.keyCode)
            }
        }
    }

    private keyUp(e: KeyboardEvent) {
        if (e.keyCode in this.keyCodes) {
            let index = this.pressed.indexOf(e.keyCode);
            if (index >= 0) {
                this.handler(e.keyCode, false);

                this.directionVector.subVector(this.values[e.keyCode]);

                this.pressed.splice(index, 1);
            }
        }
    }

    public move() {
        if (!this.directionVector.isNull() && !this.entity.movement) {
            let module = Math.sqrt(Math.pow(this.directionVector.x, 2) + Math.pow(this.directionVector.y, 2));
            this.entity.view.position.x += this.entity.speed * this.directionVector.x / module;
            this.entity.view.position.y += this.entity.speed * this.directionVector.y / module;
        }
    }

    public update(delta: number): void {
        this.move();
    }

}
