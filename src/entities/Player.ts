import {Entity} from "../abstract/Entity";
import {PlayerView} from "../views/PlayerView";
import {PlayerComponent} from "../components/PlayerComponent";
import {Service} from "typedi";
@Service()
export class Player extends Entity {
    public components: any = {
        'PlayerComponent': new PlayerComponent(this),
        'PlayerView': new PlayerView(this),
    };
}
