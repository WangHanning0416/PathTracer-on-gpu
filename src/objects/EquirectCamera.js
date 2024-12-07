//拓展camera类————EquirectCamera
import { Camera } from 'three';

export class EquirectCamera extends Camera{
    constructor(){
        super();
        this.isEquiricCamera = true;
    }
}