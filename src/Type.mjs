const _id = Symbol();
const _name = Symbol();
const _macAddress = Symbol();

export class User{
    constructor(id, name, macAddress){
        // this.id = id;
        // this.name = name;
        this[_id] = id;
        this[_name] = name;
        this[_macAddress] = macAddress;
    }

    get id(){
        return this[_id];
    }

    get name(){
        return this[_name];
    }

    get macAddress(){
        return this[_macAddress];
    }
}