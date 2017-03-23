import {Service} from "typedi";
import {GameObjectAbstract} from "./abstract/GameObjectAbstract";
@Service()
export class Sample extends GameObjectAbstract {

    private text: string = 'sample test';

    constructor() {
        super();
    }
}
