import "es6-shim";
import "reflect-metadata";

import {box2d} from "box2d";
import "pixi.js";

import {Container} from "typedi";
import {Render} from "./Render";

let app = Container.get(Render);
