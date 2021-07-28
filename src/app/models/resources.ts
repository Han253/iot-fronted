import { Property } from "./property";

export class Resource{
    id:number;
    tag: string;
    name: string;
    resource_type:string;
    description:string;
    device_parent: number;
    properties_list: Array<Property>;

    constructor(){
        this.id = 0;
        this.name = '';
        this.name = '';
        this.resource_type = 'SENSOR';
        this.description = '';
        this.device_parent = 0;
        this.properties_list = [];
    }
}