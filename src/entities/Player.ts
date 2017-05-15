import {PlayerMovementComponent} from "../components/PlayerMovementComponent";
import {PlayerView} from "../views/PlayerView";
import {Entity} from "../abstract/Entity";
import {ViewInterface} from "../interfaces/ViewtInterface";
export class Player extends Entity {

    public view:ViewInterface = new PlayerView();

    public components: any = {
        'PlayerMovementComponent': new PlayerMovementComponent(this),
    };
}
