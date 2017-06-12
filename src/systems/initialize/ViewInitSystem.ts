import {System} from "../../abstract/System";
import {BallView} from "../../views/BallView";
import {PlayerView} from "../../views/PlayerView";
import {WallView} from "../../views/WallView";
import {EnemyView} from "../../views/EnemyView";
import {BallGr} from "../../views/graphics/BallGr";
import {PlayerGr} from "../../views/graphics/PlayerGr";
import {WallGr} from "../../views/graphics/WallGr";
import {EnemyGr} from "../../views/graphics/EnemyGr";
import {UserInterfaceView} from "../../views/UserInterfaceView";
import {UserInterfaceGr} from "../../views/graphics/UserInterfaceGr";
export class ViewIntSystem extends System {
    assignComponents: any = {
        'BallView': ['initBall'],
        'PlayerView': ['initPlayer'],
        'WallView': ['initWall'],
        'EnemyView': ['initEnemy'],
        'UserInterfaceView': ['initUserInterface'],
    };

    initBall(component: BallView) {
        BallGr.initBall(component);
    }

    initPlayer(component: PlayerView) {
        PlayerGr.initPlayer(component);
    }

    initWall(component: WallView) {
        WallGr.initWall(component);
    }

    initEnemy(component: EnemyView) {
        EnemyGr.initEnemy(component);
    }

    initUserInterface(component: UserInterfaceView) {
        if (ViewIntSystem.checkInit(component)) {
            return;
        }

        component.helper = new UserInterfaceGr(component);

        // component.container.removeChildAt(0);
        // PanelGr.createPanel(component);
        // HpGr.createHpBar(component);
        // let textGr = new TextGr();
        //
        // let hp = textGr.createText(component, 'HP', 'hpStyle');
        // hp.position.set(10, 110);
        //
        // component.container.position.set(100, 100);

    }

    static checkInit(component: any) {
        if (component.initialize) {
            return component.initialize;
        }

        component.initialize = true;
    }

    static syncPosition(component: any, bodyComp: any) {
        component.container.position.x = bodyComp.position.x - bodyComp.width / 2;
        component.container.position.y = bodyComp.position.y - bodyComp.height / 2;
    }

}
