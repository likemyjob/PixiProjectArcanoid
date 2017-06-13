import {SystemInterface} from "../interfaces/SystemInterface";
import {EntityInterface} from "../interfaces/EntityInterface";
import {Container} from "typedi";
import {EntityManager} from "../listeners/EntityManager";
import {Render} from "../Render";
export abstract class System implements SystemInterface {

    em: EntityManager;
    assignComponents: any[] = [];

    entity:EntityInterface;
    render:Render;

    constructor() {
        this.render = Container.get(Render);
        this.em = Container.get(EntityManager);
        this.em.addSystem(this);
    }

    update(entity: EntityInterface) {
        this.entity = entity;
        if (this.assignComponents.length === 0) {
            return;
        }
        let that: any = this;
        let compName: string;
        for (compName in that.assignComponents) {
            let executable: any = that.assignComponents[compName];
            let comp = this.entity.components[compName];
            if (comp) {
                executable.forEach(function (func: any) {
                    that[func](comp);
                });
            }
        }

    }
}
