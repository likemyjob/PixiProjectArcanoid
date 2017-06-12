import {View} from "../abstract/View";
import {UserInterfaceGr} from "./graphics/UserInterfaceGr";
export class UserInterfaceView extends View {
    name: string = 'UserInterfaceView';
    helper: UserInterfaceGr = null;
}
