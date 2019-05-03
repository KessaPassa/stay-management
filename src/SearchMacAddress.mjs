import {exec} from 'child_process';

let base_port = '10.20.78.0/24';
exec(`nmap -sP ${base_port}`, function (err, stdout, stderr) {
    if (err) {
        console.log('nmapエラー');
        console.log(err);
        console.log(stderr);
    }

    exec('arp -a', function (err, stdout, stderr) {
        if (err) {
            console.log('arpエラー');
            console.log(err);
            console.log(stderr);
        }

        let mac_address_array = [];
        let splited_array = stdout.split('\n');
        splited_array.forEach(function (item) {
            let regxp = item.match(/[0-f]+:[0-f]+:[0-f]+:[0-f]+:[0-f]+:[0-f]+/);
            if (regxp){
                mac_address_array.push(regxp[0])
            }
        });

        console.log(mac_address_array);
    })
});





