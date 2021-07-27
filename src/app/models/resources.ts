export class Resource{
    id:number;
    tag: string;
    name: string;
    resource_type:string;
    description:string;
    device_parent: number;

    constructor(){
        this.id = 0;
        this.name = '';
        this.name = '';
        this.resource_type = 'SENSOR';
        this.description = '';
        this.device_parent = 0;
    }
}