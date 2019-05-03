import {User} from './Type';
import usersJson from '../users.json';

let users = [];

export function setup() {
    users = [];
    console.log('user setting setup');
    let keys = Object.keys(usersJson);
    keys.forEach(function (key) {
        let user = usersJson[key];
        let id = user.id;
        let name = user.name;
        let macAddress = user.mac_address;
        users.push(new User(key, name, macAddress));
    });

    return users;
}

export function getUserById(id) {
    for (let i in users) {
        let user = users[i];
        if (user.id === id) {
            return user;
        }
    }
}

export function getUserByName(name) {
    for (let i in users) {
        let user = users[i];
        if (user.name === name) {
            return user;
        }
    }
}

export function getUserByMacAddress(macAddress) {
    for (let i in users) {
        let user = users[i];
        let isInclude = user.macAddress.includes(macAddress);
        if (isInclude) {
            return user;
        }
    }
}

// export async function getUser({id, name, macAddress} = {}) {
//     if (id)
//         return await getUserById(id);
//     else if (name)
//         return await getUserByName(name);
//     else if (macAddress)
//         return await getUserByMacAddress(macAddress);
//     else
//         console.log('Please enter either id or name or macAddress');
// }

