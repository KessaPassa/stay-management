import {exec} from 'child_process';
import dateformat from 'dateformat';


function nmap() {
    return new Promise(function (resolve) {
        let base_port = '10.20.78.0/24';
        exec(`nmap -sP ${base_port}`, function (err, stdout, stderr) {
            if (err) {
                console.log('nmapエラー');
                console.log(err);
                console.log(stderr);
            }

            resolve();
        });
    });
}

function arp() {
    return new Promise(function (resolve) {
        exec('arp -a', function (err, stdout, stderr) {
            if (err) {
                console.log('arpエラー');
                console.log(err);
                console.log(stderr);
            }

            let stayingMacAdress = [];
            let splited_array = stdout.split('\n');
            splited_array.forEach(function (item) {
                let regxp = item.match(/[0-f]+:[0-f]+:[0-f]+:[0-f]+:[0-f]+:[0-f]+/);
                if (regxp) {
                    stayingMacAdress.push(regxp[0])
                }
            });

            resolve(stayingMacAdress);
        });
    });
}

function convertMacAddressToUser(users, stayingMacAdress) {
    return new Promise(function (resolve) {

        // 複数端末がWi-Fiに接続しているとuserが重複するので、重複を削除するためにSet()
        let stayingUsers = new Set();
        let matchedMacAddress = [];
        users.forEach(function (user) {
            user.macAddress.forEach(function (macAddress) {
                let index = stayingMacAdress.indexOf(macAddress);
                if (index !== -1) {
                    stayingUsers.add(user);
                    // 在室端末のMACアドレスのみ表示するために
                    matchedMacAddress.push(stayingMacAdress[index]);
                }
            });
        });

        // マッチしたMACアドレスがあるなら表示する
        if (matchedMacAddress) {
            // 現時刻とマッチしたMACアドレスを表示
            console.log(dateformat(new Date(), 'yyyy年mm月dd日 HH時MM分ss秒'));
            console.log(matchedMacAddress);
        }

        resolve(stayingUsers);
    });
}

import request from 'request';

function sendStayingUsers(users) {
    let ids = [], names = [];
    users.forEach(function (user) {
        ids.push(user.id);
        names.push(user.name);
    });

    request.get({
        url: 'https://slackbot-extensions-master.herokuapp.com/room/update',
        qs: {
            ids: ids,
            names: names
        }
    }, function (err, res, body) {
        if (err) {
            console.log('通信エラー');
            console.log(err);
        }
    });
}

export async function getStayingUsers(users) {
    await nmap();
    const stayingMacAdress = await arp();
    const stayingUsers = await convertMacAddressToUser(users, stayingMacAdress);
    sendStayingUsers(stayingUsers);
}





