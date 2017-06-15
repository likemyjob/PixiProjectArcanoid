import {Entity} from "../abstract/Entity";
import {PixiView} from "../views/PixiView";
import {UIComponent} from "../components/UIComponent";
export class UI extends Entity {
    name = 'UI';
    public components: any = {
        'UIComponent': new UIComponent(this),
        'PixiView': new PixiView(this),
    }
}
