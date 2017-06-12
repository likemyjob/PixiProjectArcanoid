import {Entity} from "../abstract/Entity";
import {UserInterfaceView} from "../views/UserInterfaceView";
import {Service} from "typedi";
export class UI extends Entity {
    public components: any = {
        'UserInterfaceView': new UserInterfaceView(this),
    }
}
