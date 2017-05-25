import {SystemInterface} from "../interfaces/SystemInterface";
import {EntityInterface} from "../interfaces/EntityInterface";
import {Render} from "../Render";
import {Container} from "typedi";
export abstract class System implements SystemInterface {

    render: Render;
    assignComponents: string[];
    executable: string[];

    constructor() {
        this.render = Container.get(Render);
        this.render.addSystem(this);
    }

    update(delta: number, entity: EntityInterface) {
        this.render.entities.forEach((entity: any) => {

            if (this.assignComponents.length === 0) {
                return;
            }
            // if (this.entity.components.indexOf(compName) === -1) {
            //     return;
            // }
            this.assignComponents.forEach((compName: any) => {
                let that: any = this;
                this.executable.forEach((func: any) => {
                    that[func](entity.components[compName]);
                });
            });
        });
    }
}
