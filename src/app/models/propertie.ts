export class Propertie{
    id:number;
    name: string;
    value:string;
    description: string;
    device_parent:number;

    constructor(){
        this.id = 0;
        this.name = '';
        this.value = '';
        this.description = '';
        this.device_parent = 0;
    }
}