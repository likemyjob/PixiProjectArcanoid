import {UserInterfaceView} from "../UserInterfaceView";
export class PanelGr {
    static createPanel(component: UserInterfaceView) {
        let gr = new PIXI.Graphics();
        gr.beginFill(0xA9A9A9, 1);
        gr.drawRoundedRect(0, 0, 200, 140, 0.1);
        gr.endFill();
        component.container.addChild(gr);
    }
}
