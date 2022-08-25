import { Property } from "./property";
import { Resource } from "./resources";

export class Device{
    id: number;
    name: string;
    description: string;
    gateway:boolean;
    created_at: string;
    update_at: string;
    device_parent: number;
    environment: number;
    properties:Array<Property>;
    resources:Array<Resource>;

    constructor(){
        this.id = 0;
        this.name = '';
        this.description = '';
        this.gateway = false;
        this.created_at='';
        this.update_at = '';
        this.device_parent=0;
        this.properties = [];
        this.resources = [];
    }
}