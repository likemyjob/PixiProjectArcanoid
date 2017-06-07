import "es6-shim";
import "reflect-metadata";
import "pixi.js";
import {Container} from "typedi";
import {Render} from "./Render";

let app = Container.get(Render);
