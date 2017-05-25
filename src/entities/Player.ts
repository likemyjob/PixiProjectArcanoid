import {Entity} from "../abstract/Entity";
import {PlayerComponent} from "../components/PlayerMovementComponent";
import {PlayerView} from "../views/PlayerView";
export class Player extends Entity {
    public components: any = {
        'PlayerComponent': new PlayerComponent(this),
        'PlayerView': new PlayerView(this)
    };
}
