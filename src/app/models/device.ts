export class Device{
    tag: string;
    name: string;
    is_gateway:boolean;
    created_at: string;

    constructor(){
        this.tag = '';
        this.name = '';
        this.is_gateway = false;
        this.created_at='';
    }
}