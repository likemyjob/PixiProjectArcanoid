import {Service} from "typedi";
import {ComponentInterface} from "./interfaces/ComponentInterface";
import {GameObjectInterface} from "./interfaces/GameObjectInterface";
import {Vector} from "./Vector";
@Service()
export class Control implements ComponentInterface {

    private entity: GameObjectInterface;

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

    private eventsListener() {
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
            this.handler(e.keyCode, true);

            if (this.pressed.indexOf(e.keyCode) == -1) {
                this.directionVector.addVector(this.values[e.keyCode]);
                this.pressed.push(e.keyCode)
            }
        }
    }

    private keyUp(e: KeyboardEvent) {
        if (e.keyCode in this.keyCodes) {
            this.handler(e.keyCode, false);
            let index = this.pressed.indexOf(e.keyCode);
            if (index >= 0) {
                this.directionVector.subVector(this.values[e.keyCode]);
                this.pressed.splice(index, 1);
            }
        }
    }

    public constructor() {
        this.eventsListener();
    }

    public init(entity: GameObjectInterface) {
        this.entity = entity;
    }

    public move() {
        if (!this.directionVector.isNull()) {
            let module = Math.sqrt(Math.pow(this.directionVector.x, 2) + Math.pow(this.directionVector.y, 2));
            this.entity.view.position.x += this.entity.speed * this.directionVector.x / module;
            this.entity.view.position.y += this.entity.speed * this.directionVector.y / module;
        }
    }

    public update(delta: number): void {
        this.move();
    }

}
