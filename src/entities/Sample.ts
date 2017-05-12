import {PlayerMovementComponent} from "../components/PlayerMovementComponent";
import {PlayerView} from "../views/PlayerView";
import {Entity} from "../abstract/Entity";
export class Sample extends Entity {

    public views: any = [
        new PlayerView()
    ];

    public components: any = [
        new PlayerMovementComponent(this)
    ];
}
