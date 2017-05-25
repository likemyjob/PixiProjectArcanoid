import {System} from "../../abstract/System";
import {ViewInterface} from "../../interfaces/ViewtInterface";
import {BodyComponent} from "../../components/BodyComponent";
import {BallView} from "../../views/BallView";
export class ViewIntSystem extends System {
    assignComponents: string[] = [
        'BallView'
    ];
    executable: string[] = [
        'init'
    ];

    init(component: ViewInterface) {
        if (!(component instanceof BallView)) {
            return;
        }

        if (component.initialize) {
            return;
        }

        component.initialize = true;

        console.log('init Body View');

        let bodyComp: BodyComponent = component.entity.components['BodyComponent'];

        component.container.position.x = bodyComp.position.x;
        component.container.position.y = bodyComp.position.y;

    }
}
