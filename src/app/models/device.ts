import { Propertie } from "./propertie";
import { Resource } from "./resources";

export class Device{
    id: number;
    tag: string;
    name: string;
    description: string;
    ipv4_address: string;
    is_gateway:boolean;
    created_at: string;
    update_at: string;
    device_parent: number;
    properties_list:Array<Propertie>;
    resources_list:Array<Resource>;

    constructor(){
        this.id = 0;
        this.tag = '';
        this.name = '';
        this.description = '';
        this.ipv4_address = '';
        this.is_gateway = false;
        this.created_at='';
        this.update_at = '';
        this.device_parent=0;
        this.properties_list = [];
        this.resources_list = [];
    }
}