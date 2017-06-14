import {SystemInterface} from "../interfaces/SystemInterface";
import {EntityInterface} from "../interfaces/EntityInterface";
import {Container} from "typedi";
import {EntityManager} from "../listeners/EntityManager";
import {Render} from "../Render";
import {ComponentInterface} from "../interfaces/ComponentInterface";
export abstract class System implements SystemInterface {

    em: EntityManager;
    assignComponents: any[] = [];

    entity: EntityInterface;
    component: ComponentInterface | any;
    render: Render;

    constructor() {
        this.render = Container.get(Render);
        this.em = Container.get(EntityManager);
        this.em.addSystem(this);
    }

    update(entity: EntityInterface) {
        this.entity = entity;
        this.setComponent();

        // console.log(this.entity);

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

    setComponent() {
    }
}
