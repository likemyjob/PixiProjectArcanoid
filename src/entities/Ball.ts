import {Entity} from "../abstract/Entity";
import {BallView} from "../views/BallView";
import {BodyComponent} from "../components/BodyComponent";
import {ComponentsMap} from "../interfaces/ComponentsMap";
import {ComponentInterface} from "../interfaces/ComponentInterface";
export class Ball extends Entity {
    public components: ComponentsMap<ComponentInterface> = {
        'BodyComponent': new BodyComponent(this),
        'BallView': new BallView(this)
    };
}
