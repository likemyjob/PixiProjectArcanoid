import {Entity} from "../abstract/Entity";
import {BallView} from "../views/BallView";
import {ComponentsMap} from "../interfaces/ComponentsMap";
import {ComponentInterface} from "../interfaces/ComponentInterface";
import {BallComponent} from "../components/BallComponent";
export class Ball extends Entity {
    public components: ComponentsMap<ComponentInterface> = {
        'BallComponent': new BallComponent(this),
        'BallView': new BallView(this)
    };
}
