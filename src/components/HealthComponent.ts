import {Component} from "../abstract/Component";
import {EntityInterface} from "../interfaces/EntityInterface";
export class HealthComponent extends Component {
    public name: string = 'HealthComponent';
    public entity: EntityInterface;
    public value: number = 100;
}
