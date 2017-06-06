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
        let ball = new Ball();
        ball.components['BallComponent'].position.Set(e.clientX, e.clientY);
        ball.components['BallComponent'].radius = 10;
        ball.components['BallComponent'].density = 0.01;
        ball.components['BallComponent'].restitution = 1;
    }
}
