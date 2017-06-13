import {Container, Service} from "typedi";
import {Render} from "../Render";
import {EntityInterface} from "../interfaces/EntityInterface";
import {SystemInterface} from "../interfaces/SystemInterface";
Service();
export class ListenerEntity {

    render = Container.get(Render);

    methods: any = {};

    update() {
        let that = this;
        that.render.entities.forEach(function (entity: EntityInterface) {
            that.render.systems.forEach(function (system: SystemInterface) {
                system.update(entity);
            })
        })
    }
}
