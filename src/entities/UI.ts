import {Entity} from "../abstract/Entity";
import {UserInterfaceView} from "../views/UserInterfaceView";
export class UI extends Entity {
    name = 'UI';
    public components: any = {
        'UserInterfaceView': new UserInterfaceView(this),
    }
}
