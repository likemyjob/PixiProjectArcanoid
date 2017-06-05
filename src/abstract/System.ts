import {SystemInterface} from "../interfaces/SystemInterface";
import {EntityInterface} from "../interfaces/EntityInterface";
import {Render} from "../Render";
import {Container} from "typedi";
export abstract class System implements SystemInterface {

    render: Render;
    assignComponents: any[] = [];

    constructor() {
        this.render = Container.get(Render);
        this.render.addSystem(this);
    }

    update(delta: number, entity: EntityInterface) {
        this.render.entities.forEach((entity: any) => {
            if (this.assignComponents.length === 0) {
                return;
            }
            let that: any = this;
            let compName: string;
            for (compName in that.assignComponents) {
                let executable: any = that.assignComponents[compName];
                let comp = entity.components[compName];
                if (comp) {
                    executable.forEach(function (func: any) {
                        that[func](comp);
                    });
                }
            }
        });
    }
}
