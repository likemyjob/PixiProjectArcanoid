import {Entity} from "../abstract/Entity";
import {WallComponent} from "../components/WallComponent";
import {WallView} from "../views/WallView";
export class Wall extends Entity {
    name = 'default';
    public components: any = {
        'WallComponent': new WallComponent(this),
        'WallView': new WallView(this),
    };
}
