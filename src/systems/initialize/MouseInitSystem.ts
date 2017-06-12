import {System} from "../../abstract/System";
import {Ball} from "../../entities/Ball";
export class MouseInitSystem extends System {

    public balls: Ball[] = [];

    constructor() {
        super();
        this.eventsListener();
    }

    protected eventsListener() {
        let that = this;
        document.addEventListener('click', function (e: MouseEvent) {
            that.initBall(e);
        }, false);
    }

    public initBall(e: MouseEvent) {
        if (this.render.stop) {
            this.render.restart();
        } else {
            let ball = new Ball();
            ball.components['BallComponent'].position.Set(e.clientX, e.clientY);
        }
    }
}
