import {Entity} from "../abstract/Entity";
import {ViewInterface} from "../interfaces/ViewtInterface";
import {BallView} from "../views/BallView";
import {BallMovementComponent} from "../components/BallMovementComponent";
export class Ball extends Entity {

    public view: ViewInterface = new BallView();

    public components: any = {
        // 'BallMovementComponent': new BallMovementComponent(this)
    };
}
