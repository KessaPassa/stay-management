// APIサーバ機能
import express from "express";
import bodyParser from 'body-parser';

const app = express();
app.set('port', 8021);
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// Run Server
app.listen(app.get('port'), function () {
    console.log('server launched');
});

// ルートページ
app.get('/', function (req, res) {
    res.header('Content-Type', 'text/plain;charset=utf-8');
    res.status(200);
    res.send('Bot Rebooted');
    console.log('root page accessed');
});


import schedule from 'node-schedule';
import * as room from './src/Room';
import * as usersSettings from './src/UsersSettings';

let users = usersSettings.setup();

// 時限式で実行
schedule.scheduleJob({
    minute: [...Array(12).keys()].map(i => i * 5)
}, function () {
    room.getStayingUsers(users);
});
room.getStayingUsers(users);